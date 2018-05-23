<template>
<div>
  <p><button v-on:click="handleClick">Click</button></p>
  <p><small>※ ボタンを押すとアラートが出現します</small></p>
</div>
</template>

<script>
export default {
  methods: {
    handleClick: function (event) {
      alert(event.target) // [object HTMLButtonElement]
    }
  }
}
</script>
