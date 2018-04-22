<template lang="pug">
  .page-project
    .control-pane
      el-button(@click.native="getList") 刷新
      el-button(:disabled="true") 创建新任务
      el-button(:loading="downloadLoading" @click.native="handleDownload") 导出
    .content
      el-table.tableList(:data="list")
        el-table-column(label="序号" type="index" align="center")
        el-table-column(label="编号" prop="code")
          template(slot-scope="scope")
            p.link(@click="showDetail(scope.row)" v-text="scope.row.code") 
        el-table-column(label="功能模块" prop="name")
          template(slot-scope="scope")
            p.link(@click="showDetail(scope.row)" v-text="scope.row.name")         
        el-table-column(label="技术经理" prop="pgm")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.pgm")
            p(v-else v-text="scope.row.pgm")       
        el-table-column(label="开发成员" prop="devMembers")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.devMembers")
            p(v-else v-text="scope.row.devMembers")       
        el-table-column(label="启动时间" prop="startDate")
          template(slot-scope="scope")
            el-date-picker(v-if="scope.row.edit" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="scope.row.startDate")
            p(v-else v-text="scope.row.startDate")
        el-table-column(label="测试负责人" prop="tester")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.tester")
            p(v-else v-text="scope.row.tester")      
        el-table-column(label="测试成员" prop="tMembers")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.tMembers")
            p(v-else v-text="scope.row.tMembers")      
        el-table-column(label="测试时间" prop="testDate")
          template(slot-scope="scope")
            el-date-picker(v-if="scope.row.edit" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="scope.row.testDate")
            p(v-else v-text="scope.row.testDate")      
        el-table-column(label="产品经理" prop="pdm")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.pdm")
            p(v-else v-text="scope.row.pdm")      
        el-table-column(label="验收时间" prop="endDate")
          template(slot-scope="scope")
            el-date-picker(v-if="scope.row.edit" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="scope.row.endDate")
            p(v-else v-text="scope.row.endDate")      
        el-table-column(label="备注" prop="bz")
          template(slot-scope="scope")
            el-input(v-if="scope.row.edit" v-model="scope.row.bz")
            p(v-else v-text="scope.row.bz")
        el-table-column(label="编辑")
          template(slot-scope="scope")
            el-button(v-if="scope.row.edit" type="success" @click="submitRow(scope.row)" size="small") 完成
            el-button(v-else @click='scope.row.edit=!scope.row.edit' size="small") 编辑
      el-dialog(:title="active.name" :visible.sync="vis.detail")
        detail(:item="active")
</template>
<script>
import { getProjectList, updateProject } from '@/api/project'
import { parseTime } from '@/utils'
import detail from './detail'

export default {
  name: 'projectTable',
  data() {
    return {
      list: Array(30).fill({}),
      downloadLoading: false,
      vis: {
        detail: false
      },
      active: {
        name: ''
      }
    }
  },
  methods: {
    getList() {
      getProjectList().then(({ data }) => {
        this.list = data.data.list.map(item => {
          this.$set(item, 'edit', false)
          return item
        })
      })
    },
    submitRow(row) {
      row.edit = false
      updateProject(row)
    },
    showDetail(row) {
      this.active = row
      this.vis.detail = true
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '编号', '功能模块', '技术经理', '开发成员', '启动时间', '测试负责人', '测试成员', '测试时间', '产品经理', '验收时间', '备注']
        const filterVal = ['index', 'code', 'name', 'pgm', 'devMembers', 'startDate', 'tester', 'tMembers', 'testDate', 'pdm', 'endDate', 'bz']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '第一期功能清单及分工表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, index) => filterVal.map(j => {
        v.index = index + 1
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  components: {
    detail: detail
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  .control-pane {
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 10px 20px;
    background-color: lightblue;
  }
  .tableList {
    /deep/ .el-input__inner {
      border: 0;
      border-bottom: solid 1px #eee;
    }
  }
  .link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
