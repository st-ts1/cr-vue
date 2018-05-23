<template>
  <div class="TextAnime1">
    <span v-for="(t, index) in text" :key="index" v-text="t" class="item delay-anime"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '基礎から学ぶ Vue.js'
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes text-in {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
.item {
  display: inline-block;
  min-width: 0.3em;
  font-size: 2rem;
  animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
@for $i from 0 through 12 {
  .delay-anime:nth-child(#{$i + 1}) {
    animation-delay: $i * 100ms + 200ms;
  }
}
</style>
