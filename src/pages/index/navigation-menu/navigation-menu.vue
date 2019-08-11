<template>
  <div class="navigation-menu">
    <nav class="nav-left">
      <div class="logo">
        <img src="./pic-logo@2x.png" class="logo-img">
      </div>
      <div class="first">
        <div v-for="(item, index) in menuData" :key="index" :class="{'first-item-active': menuIndex === index}" class="first-item hand" @click="changMenu(index)">
          <img :src="item.icon" class="first-img">
          <p class="first-title">{{item.title}}</p>
        </div>
      </div>
    </nav>
    <nav class="nav-right">
      <div class="sec-title">{{menuData[menuIndex].title}}</div>
      <div v-for="(item, index) in navList" :key="index">
        <div class="second-item">
          <p class="second-title">{{item.text}}</p>
          <div v-for="(child, i) in item.children" :key="i" class="second-link hand" @click="setChildActive(child)">
            <router-link v-if="child.meta" tag="span" :to="child.path" :class="{'router-link-active': ''}" class="second-link-content">{{child.meta.title}}</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'NAVIGATION_MENU'

  export default {
    name: COMPONENT_NAME,
    filters: {
      // 子路有的激活状态过滤
      childrenActive(value) {
        if (value.isLight) {
          return 'second-link-active'
        }
        return ''
      },
      // 本路由的激活状态过滤
      isActive(value) {
        if (value.isLight) {
          return 'nav-item-active'
        }
        return ''
      }
    },
    data() {
      const menuData = this.createMenuData(this.$router.options.routes) || []
      return {
        menuData,
        menuType: 'goods',
        menuIndex: 0,
        navList: []
      }
    },
    watch: {
      $route(newVal, oldVal) {
        if (newVal.fullPath === oldVal.fullPath) {
          return
        }
        let url = newVal.fullPath
        let type = (url.slice(1, -1)).split('/')[0]
        this._infoFirst(type)
      },
      menuIndex(news) {
        this.navList = JSON.parse(JSON.stringify(this.menuData[news].children))
        this.$router.push(this.navList[0].children[0].path)
      }
    },
    created() {
      let url = this.$route.fullPath
      let type = (url.slice(1, -1)).split('/')[0]
      this._infoFirst(type)
    },
    methods: {
      changMenu(index) {
        if (index === this.menuIndex) return
        this.menuIndex = index
      },
      _infoFirst(type) {
        this.menuIndex = this.menuData.findIndex((item) => item.type === type)
        this.navList = JSON.parse(JSON.stringify(this.menuData[this.menuIndex].children))
      },
      // 格式化路由数据
      createMenuData(routes) {
        let r = routes.find((r) => r.name === 'index')
        let routerArr = [...r.children]
        let menu = []
        routerArr.forEach((item) => {
          if (item.meta && item.meta.type && item.meta.type === 'first_menu') {
            let child = item.children.map((sec) => {
              let secItem = JSON.parse(JSON.stringify(sec))
              if (secItem.text) {
                let children = []
                secItem.children.forEach((third) => {
                  if (third.meta && third.meta.type === 'sec-menu') {
                    children.push(third)
                  }
                })
                secItem.children = JSON.parse(JSON.stringify(children))
              }
              return secItem
            })
            let obj = Object.assign({}, item.meta, {children: child || [], type: item.name})
            menu.push(obj)
          }
        })
        return menu
      },
      setChildActive() {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .navigation-menu
    width: 200px
    height: 100%
    display: flex
    float: left
    clear-float()
    user-select: none

  .nav-left
    width: 90px
    background: #182840
    text-align: center
    box-shadow: 3px 0 4px 0 rgba(0, 8, 39, 0.15)
    .logo
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      .logo-img
        width: 26px
        display: block
    .first-item
      height: 80px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      transition: all 0.2s
      .first-img
        width: 20px
        height: 20px
        margin-bottom: 8px
      .first-title
        font-size: $font-size-12
        color: $color-white
    .first-item-active
      position: relative
      background: $color-main
      &:after
        content: ''
        col-center()
        border: 6px soolid $color-white

  .nav-right
    flex: 1
    width: 0
    background: $color-white
    border-right-1px($color-line)
    &::-webkit-scrollbar
      width: 6px
      height: 8px
      opacity: 0
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .05)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .1)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .05)
      border-radius: 10px
    &:hover
      &::-webkit-scrollbar
        transition: all 0.2s
        opacity: 1
        width: 6px
        height: 8px

  .sec-title
    text-align: center
    height: 50px
    line-height: 50px
    font-size: $font-size-16
    color: $color-text-main
    font-family: $font-family-regular
    border-bottom-1px($color-line)

  .second-item
    text-indent: 20px
    .second-title
      transition: all 0.2s
      margin: 20px 0 17px
      color: #888888
      font-size: $font-size-14
      line-height: 1

    .second-link
      transition: all 0.2s
      height: 24px
      line-height: 24px
      color: $color-text-main
      font-size: $font-size-14
      margin-bottom: 12px
      &:hover
        color: $color-main

    .second-link-content
      margin-left: -10px
      color: #4E5983
      padding: 5px 10px
      border-radius: 22px
    .router-link-active
      background: rgba(76, 132, 255, 0.1)
      color: $color-main
</style>
