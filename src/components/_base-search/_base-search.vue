<template>
  <div class="base-search-box">
    <div class="base-search">
      <div class="box-tip">搜索</div>
      <input v-model="searchText" :style="{'width': width + 'px'}" type="text" class="search-input"
             :placeholder="placeHolder" @keydown="_enter"
      >
      <div class="search-icon-box hand" @click="_search">
        搜索
        <!--<span class="search-icon hand"></span>-->
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_SEARCH'

  export default {
    name: COMPONENT_NAME,
    props: {
      placeHolder: {
        // 默认文字
        type: String,
        default: '客户昵称/客户手机号'
      },
      infoText: {
        // 输入框值
        type: String,
        default: ''
      },
      width: {
        // 输入框宽度
        type: Number,
        default: 224
      },
      boxStyle: {
        // 组件自定义样式
        type: String,
        default: ''
      },
      boxTip: {
        // 组件自定义样式
        type: String,
        default: '搜索'
      }
    },
    data() {
      return {
        searchText: this.infoText
      }
    },
    methods: {
      infoTextMethods(keyword = '') {
        this.searchText = keyword
      },
      _search() {
        this.$emit('search', this.searchText)
      },
      _enter(e) {
        if (e.keyCode === 13) {
          this.$emit('search', this.searchText)
        }
      },
      _setText(text) {
        this.searchText = text || ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-search-box
    display: inline-block

  .base-search
    display: flex
    height: 32px
    align-items: center
    overflow: hidden
    .box-tip
      font-size: $font-size-12
      color: $color-text-main
      margin-right: 10px

  .search-input
    flex: 1
    color: $color-text-main
    font-family: $font-family-regular
    font-size: $font-size-12
    height: 100%
    width: 100%
    box-sizing: border-box
    border: 0.5px solid #F3F2F7
    border-radius: 4px
    padding-left: 10px
    transition: all 0.2s
    background: #F4F8F9
    &:hover
      border: 0.5px solid #ACACAC
    &::placeholder
      font-family: $font-family-regular
      color: $color-text-sub
    &:focus
      background: $color-white
      border: 0.5px solid $color-main !important

  .search-icon-box
    width: 60px
    margin-left: 10px
    overflow: hidden
    height: 32px
    border-radius: 4px
    background: $color-main
    text-align: center
    line-height: 32px
    font-size: $font-size-12
    color: $color-white
    transition: 0.3s all
    &:hover
      opacity: 0.8
</style>
