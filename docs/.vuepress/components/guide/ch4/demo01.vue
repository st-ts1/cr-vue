<template>
  <p>{{ width }} の半分は {{ halfWidth }}</p>
</template>

<script>
export default {
  data() {
    return {
      width: 800
    }
  },
  computed: {
    // 算出プロパティhalfWidthを定義
    halfWidth: function() {
      return this.width / 2
    }
  }
}
</script>

<style scoped>

</style>
