<template>
  <transition name="fade">
    <div class="basic-layout">
      basic-layout1222
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'
  const PAGE_NAME = 'BASIC_LAYOUT'
  const TITLE = 'home'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {

      }
    },
    created() {
      // let data = {hj: '123g'}
      // API.Global.getToken({
      //   data,
      //   doctor(res) {
      //     console.log(res)
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .basic-layout
    width: 100%
</style>
