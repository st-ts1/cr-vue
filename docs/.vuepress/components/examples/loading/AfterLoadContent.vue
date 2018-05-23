<template>
  <ul  class="after-load-content" v-if="list.length">
    <li v-for="item in list" :key="item.id">
      {{ item.name }} {{ item.price }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style scoped>
.after-load-content {
  margin: 0 0 0 24px;
}
</style>
