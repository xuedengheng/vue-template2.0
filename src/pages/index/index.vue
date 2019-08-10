<template>
  <div class="index">
    <navigation-menu></navigation-menu>
    <div class="main-container">
      <top-bar></top-bar>
      <div class="container">
        <div class="container-show">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'
  import NavigationMenu from './navigation-menu/navigation-menu'
  import TopBar from './top-bar/top-bar'

  const PAGE_NAME = 'INDEX'
  const TITLE = '首页'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      NavigationMenu,
      TopBar
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .index
    width: 100vw
    height: 100vh
    box-sizing: border-box
    background: $color-background
    overflow: hidden

  .main-container
    display: flex
    flex-direction: column
    height: 100vh
    box-sizing: border-box
    .container
      flex: 1
      box-sizing: border-box
      margin: 20px
      overflow: auto
      &::-webkit-scrollbar
        width: 5px
        height: 8px
        transition: all 0.2s
      &::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, .06)
        border-radius: 10px
      &::-webkit-scrollbar-thumb:hover
        background-color: rgba(0, 0, 0, .15)
      &::-webkit-scrollbar-track
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
        border-radius: 10px
      &:hover
        &::-webkit-scrollbar
          transition: all 0.2s
          width: 5px
          height: 5px
      .container-show
        overflow-x: hidden
        min-width: 1000px
        min-height: 100%
        box-sizing: border-box
        display: flex
        &::-webkit-scrollbar
          width: 5px
          height: 8px
          transition: all 0.2s
        &::-webkit-scrollbar-thumb
          background-color: rgba(0, 0, 0, .06)
          border-radius: 10px
        &::-webkit-scrollbar-thumb:hover
          background-color: rgba(0, 0, 0, .15)
        &::-webkit-scrollbar-track
          box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
          border-radius: 10px
        &:hover
          &::-webkit-scrollbar
            transition: all 0.2s
            width: 5px
            height: 8px
    .crumbs
      height: 50px
      min-height: 50px
      background: $color-white
</style>
