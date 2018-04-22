<template lang="pug">
  el-form(label-width="100px" v-if="item")
    el-form-item(v-for="(row, index) of cfg" :label="row" :key="index")
      p {{item[index]}}
</template>
<script>
import cfg from './config'

export default {
  data() {
    return {
      cfg
    }
  },
  props: ['item']
}
</script>
