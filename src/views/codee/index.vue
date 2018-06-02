<template lang="pug">
  .page-codee
    el-table(:data="list")
      el-table-column(prop="certname" label="许可证号")
        template(slot-scope="scope")
          a(:href="`http://ris.szpl.gov.cn/bol/certdetail.aspx?id=${scope.row.oid}`" target="_blank") {{scope.row.certname}}
      el-table-column(prop="name" label="项目名称")
        template(slot-scope="scope")
          a(:href="`http://ris.szpl.gov.cn/bol/projectdetail.aspx?id=${scope.row.oid}`" target="_blank") {{scope.row.name}}      
      el-table-column(prop="kfqy" label="开发企业")
      el-table-column(prop="szqy" label="所在区域" width="80")
      el-table-column(prop="pzsj" label="批准时间" width="120")
      el-table-column(prop="tdyt" label="土地用途" width="180")
      el-table-column(prop="updateTime" label="信息更新时间" width="200")
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button(size="small" @click="updateProject(scope.row)") 手动更新
</template>
<script>
import { getProjectList, updateProject } from '@/api/fw'
export default {
  name: 'search',
  data() {
    return {
      list: [],
      total: 0,
      page: 1
    }
  },
  methods: {
    getList() {
      getProjectList().then(({ data }) => {
        if (data && data.code === '0') {
          this.list = data.data.list
          this.total = data.data.total
          this.page = data.data.page
        }
      })
    },
    updateProject(row) {
      updateProject(row.oid).then(res => {
        if(res.data.code === '0') {
          this.getList()
        }
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .page-codee {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .fr {
    padding: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .box {
    width: 3.3333%;
    height: 3vh;
    box-shadow: 0 0 1px #333;
    line-height: 3vh;
    text-align: center;
    margin-bottom: 10px;
    &.active {
      background-color: rosybrown;
    }
  }
</style>
