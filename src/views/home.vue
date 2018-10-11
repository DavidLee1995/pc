<template>
  <div>
    <h1>这是首页</h1>
  </div>
</template>

<script>
import {userList} from '@/api'
export default {
  data () {
    return {
      objs: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted () {
    console.log(123)
    userList(this.objs)
  }
}
</script>

<style>

</style>
