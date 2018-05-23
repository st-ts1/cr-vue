<template>
<div>
  <button v-on:click="show=!show">切り替え</button>
  <transition>
    <p v-if="show">Hello Vue.js!</p>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* opacity:0から1へのフェードイン＆フェードアウト */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
