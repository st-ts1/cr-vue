<template>
  <ul>
    <li v-for="item in list"
      v-bind:key="item.id"
      v-bind:class="{ tuyoi: item.hp > 300 }">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp > 300">つよい！</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: 'スライム', hp: 100 },
        { id: 2, name: 'ゴブリン', hp: 200 },
        { id: 3, name: 'ドラゴン', hp: 500 }
      ]
    }
  }
}
</script>

<style scoped>
.tuyoi {
  color: #eb516b;
}
</style>
