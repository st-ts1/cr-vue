<template>
  <div>
    <p><button v-on:click="toggle=!toggle">切り替え</button></p>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <!-- SVGのパーツにトランジションを適用 -->
      <transition>
        <my-circle v-bind:fill="fill" v-bind:key="fill"></my-circle>
      </transition>
    </svg>
  </div>
</template>

<script>
const MyCircle = {
  render(h) {
    return h('circle', {
      attrs: {
        cx: 80,
        cy: 75,
        r: 50,
        fill: this.fill
      }
    })
  },
  props: {
    fill: String
  }
}
export default {
  components: { MyCircle },
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    fill: function () {
      return this.toggle ? 'lightpink' : 'skyblue'
    }
  }
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
