<template>
<comp-child>
  <header slot="header">
    Hello Vue.js!
  </header>
  Vue.jsはJavaScriptのフレームワークです。
</comp-child>
</template>

<script>
import CompChild from './demo06-comp-child.vue'
export default {
  components: { CompChild }
}
</script>
