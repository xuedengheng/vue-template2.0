<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
  import appConfig from '@src/app.config'

  export default {
    page: {
      titleTemplate(title) {
        title = typeof title === 'function' ? title(this.$store) : title
        return title ? `${title} | ${appConfig.title}` : appConfig.title
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
