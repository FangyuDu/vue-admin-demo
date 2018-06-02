<template lang="pug">
  .page-info.page-padding
    el-form.form(label-width="200px")
      el-form-item(label="最后更新时间:")
        span 2018-06-02 12:00:00
      el-form-item(label="当前状态:")
        span 正在获取数据
      el-form-item(label="项目总数:")
        span 30
      el-form-item(label="每页数量:")
        span 3145
      el-form-item(label="总页数:")
        span 30
      el-form-item(label="__EVENTVALIDATION")
        p.m-text 2oHDs3GJcvwKdmVIWxVtMAEBySEDnPM5sDsyxVPloJur5KeOFPX+GXmURFDr4fB3tyfvIU/cdNfJJ2/aOXrTowrjsXeivYD5suWrf7nqlYzFdUNSBkMRmSnIOZqdft/R2DjpDBqLfGulxTnf23SbfjI0LaNatR5H+CND8z1DcRF7hCxy
      el-form-item(label="__VIEWSTATE")
      el-form-item(label="__VIEWSTATEGENERATOR")
</template>
<script>
export default {
  name: 'codeeInfo',
  data() {
    return {
      info: {
        updateTime: '',
        state: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-padding {
    padding: 40px;
  }
  .m-text {
    word-break: break-all;
  }
  .form {
    width: 900px;
  }
</style>
