<template>
<div>
  <p><small>※ 好きな文字を入力してみよう</small></p>
  <input v-model="message">
  <p>{{ message }}</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: '初期メッセージ'
    }
  }
}
</script>
