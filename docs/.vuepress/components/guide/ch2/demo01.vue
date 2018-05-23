<template>
<div>
  <!-- countプロパティを表示する -->
  <p>{{ count }}回クリックしたよ！ </p>
  <!-- このボタンをクリックするとincrementメソッドが呼び出される -->
  <button v-on:click="increment">カウントを増やす</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    // ボタンをクリックしたときのハンドラ
    increment: function () {
      this.count += 1 // 処理は再代入するだけでOK！
    }
  }
}
</script>
