<script>

  export default {
    page: {
      title: 'Page timeout',
      meta: [
        {name: 'description', content: 'The page timed out while _loading.'},
      ],
    }
  }
</script>

<template>
  <div>
    <h1 :class="$style.title">
      The page timed out while loading. Are you sure you're still connected to the Internet?
    </h1>
  </div>
</template>

<style lang="stylus" module>
  .title
    text-align: center

</style>
