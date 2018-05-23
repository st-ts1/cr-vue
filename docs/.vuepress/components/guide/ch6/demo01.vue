<template>
  <div>
    <p><button v-on:click="show=!show">切り替え</button></p>
    <transition>
      <div v-show="show">トランジションさせたい要素</div>
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
/* 1秒かけて透明度を遷移 */
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* 見えなくなるときの透明度 */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
