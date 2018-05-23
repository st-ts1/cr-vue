<template>
<div>
  <button v-on:click="isActive=!isActive">isActiveを切り替える</button>
  <p v-bind:class="{ child: isChild, 'is-active': isActive }" class="item">
    動的なクラス
  </p>
  <p v-bind:style="{ color: textColor, backgroundColor: bgColor }" class="item">
    動的なスタイル
  </p>
  <p><small>※ 分かりやすいように <code>.is-active</code> は背景色を変えています</small></p>
</div>
</template>

<script>
export default {
  data() {
    return {
      isChild: true,
      isActive: true,
      textColor: 'red',
      bgColor: 'lightgray'
    }
  },
  methods: {}
}
</script>

<style scoped>
.item {
  padding: 4px 8px;
  transition: background-color 0.4s;
}
.is-active {
  background: #ffeaea;
}
</style>
