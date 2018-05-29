<template>
  <ul>
    <comp-child v-for="item in list"
      v-bind:key="item.id"
      v-bind:name="item.name"
      v-bind:hp="item.hp"></comp-child>
  </ul>
</template>

<script>
import CompChild from './demo02-comp-child.vue'
export default {
  components: { CompChild },
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
