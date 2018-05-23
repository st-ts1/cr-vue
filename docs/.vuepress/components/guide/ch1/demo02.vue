<template>
  <ol>
    <li v-for="item in list">{{ item }}</li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      list: ['りんご', 'ばなな', 'いちご']
    }
  }
}
</script>

<style>

</style>
