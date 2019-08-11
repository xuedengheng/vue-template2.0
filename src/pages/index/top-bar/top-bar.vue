<template>
  <div class="top-bar">
    <div class="userInfo-content">
      <section class="title-wrapper">
        <span
          v-for="(item, index) in currentTitles"
          :key="index"
          :class="{'active': index === currentTitles.length -1}"
          class="title-wrapper-item hand"
          @click="goRouter(item, index)"
        > {{item}}
          <span v-if="index !== currentTitles.length -1" class="title-line"> / </span>
        </span>
      </section>
      <section class="userInfo-wrapper" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
        <!--<p class="name">你好: {{currentUser && currentUser.manager_info.username}}</p>-->
        <div class="log-out"></div>
        <!--<transition name="fade">-->
        <!--<div v-show="showTooltip" class="tooltip-con">-->
        <!--<div class="show-hide-box">-->
        <!--<div class="show-all-item hand">-->
        <!--<div class="show-hide-item" @click="_modifyPassword">-->
        <!--修改密码-->
        <!--</div>-->
        <!--<div class="show-hide-item" @click="_confirmLogOut">-->
        <!--退出登录-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</transition>-->
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {globalComputed} from '@state/helpers'

  const COMPONENT_NAME = 'TOP_BAR'
  const DEFAULT_AVATAR = `https://zhidian-img.jkweixin.com/2018%2F11%2F23%2F1542945169074-logo.jpg`
  const ADD_TEXT = '新建'
  const EDIT_TEXT = '编辑'
  const SUCCESS_TEXT = '完善资料'
  export default {
    name: COMPONENT_NAME,
    components: {},
    data() {
      return {
        showTooltip: false,
        showLogout: false,
        defaultAvatar: DEFAULT_AVATAR,
        currentUser: {}
      }
    },
    computed: {
      ...globalComputed,
    },
    methods: {
      _modifyPassword() {
        // this.$router.push(`/modify-password`)
      },
      _confirmLogOut() {
        this.$refs.confirm.show('确定退出当前系统吗？')
      },
      _logOut() {
        this.logOut()
        // this.$router.replace({name: 'login', query: {redirectFrom: this.$route.fullPath}})
        this.$router.replace({name: 'login'})
      },
      goRouter(value, index) {
        if (index === this.currentTitles.length - 1) return
        // 面包屑跳转
        let url = this.$route.fullPath
        let type = (url.slice(1, -1)).split('/')
        let r = this.$router.options.routes.find((r) => r.name === 'index')
        let routerArr = [...r.children]
        let item = routerArr.find((item) => item.name === type[0])
        let itemSec = item.children.find((item) => item.name === type[1])
        let newItemSec = JSON.parse(JSON.stringify(itemSec))
        let current = newItemSec.children.find((item) => {
          if (item.meta && +item.meta.variableIndex) {
            if (this.$route.query.complete || this.$route.params.complete) {
              item.meta.crumbs[item.meta.crumbs.length - 1] = SUCCESS_TEXT
            } else {
              item.meta.crumbs[item.meta.crumbs.length - 1] = (this.$route.query.id || this.$route.params.id ? EDIT_TEXT : ADD_TEXT) + item.meta.crumbs[item.meta.crumbs.length - 1]
            }
          }
          if (item.meta.crumbs[item.meta.crumbs.length - 1] === value) {
            return item
          }
        })
        console.log(current)
        this.$router.push(current.path)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  $common-height = 40px
  $width-triangle = 4px
  $menu-width = 200px

  .top-bar
    height: 50px
    min-height: 50px
    background: $color-white
    .userInfo-content
      layout(row)
      align-items: center
      height: $common-height
      padding: 0 20px
      justify-content: space-between
    .userInfo-wrapper
      display: flex
      align-items: center
      position: relative
      height: 40px
      .name
        margin-left: 10px
        font-size: $font-size-14
        color: $color-text-main
      .log-out
        cursor: pointer
        width: 14px
        height: 15px
        margin-left: 8px
        icon-image('./icon-tc')
        &:hover
          animation: rotate .75s linear infinite
    .title-wrapper
      user-select: none
      color: $color-text-sub
      line-height: 12px
      .active
        color: $color-text-main
    .title-wrapper-item
      font-size: $font-size-12
      line-height: 1
      .title-line
        font-size: 14px
        display: inline-block
        margin: 0 8px
        line-height: 1
        color: #E6EAED

  .tooltip-con
    position: absolute
    width: 106px
    height: 50px
    top: 0
    right: 0
    z-index: 999

  .show-hide-box
    position: absolute
    width: 106px
    top: 50px
    color: $color-text-main
    font-family: $font-family-regular
    font-size: $font-size-14
    background: $color-white
    box-shadow: 0 0 8px 0 #EBEBEB
    border-radius: 4px
    .show-all-item
      position: relative
      &:after
        content: ''
        position: absolute
        z-index: 99
        top: -6px
        right: 16px
        width: 0
        height: 0
        border-left: 5px solid transparent
        border-right: 5px solid transparent
        border-bottom: 6px solid $color-white
      &:before
        content: ''
        position: absolute
        z-index: 99
        top: -8px
        right: 15px
        width: 0
        height: 0
        border-left: 6px solid transparent
        border-right: 6px solid transparent
        border-bottom: 8px solid #EBEBEB
      .show-hide-item
        height: 50px
        line-height: 50px
        color: $color-text-main
        font-family: $font-family-regular
        font-size: $font-size-14
        padding-left: 16px
        display: block
        position: relative
        border-bottom-1px($color-line)
        &:hover
          color: $color-main

  @keyframes rotate
    0%
      transform: translateX(0)
    25%
      transform: translateX(3px)
    50%
      transform: translateX(-3px)
    75%
      ransform: translateX(3px)
    100%
      transform: translateX(0)
</style>
