<template>
  <div class="example">
    <MyCanvas :radius="radius"/>
    <p><input type="range" min="0" max="100" v-model.number="radius"></p>
  </div>
</template>

<script>
// キャンバス用コンポーネントの読み込み
import MyCanvas from './MyCanvas.vue'
export default {
  components: {
    MyCanvas
  },
  data() {
    return {
      radius: 50
    }
  }
}
</script>
