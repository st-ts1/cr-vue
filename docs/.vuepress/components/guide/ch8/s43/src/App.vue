<template>
  <div class="app">
    <h3>引数なし</h3>
    <ol>
      <li>{{ count }}</li>
      <li>{{ max }}</li>
    </ol>
    <h3>引数付き</h3>
    <ol>
      <li>{{ itemA }}</li>
      <li>{{ itemB(1) }}</li>
      <li>{{ nameA }}</li>
      <li>{{ nameB(1) }}</li>
    </ol>
  </div>
</template>

<script>
import store from './store.js'
export default {
  computed: {
    // 引数なしゲッター
    count() { return store.getters.count },   // 1
    max()   { return store.getters.max },     // 2
    // 引数付きゲッター
    itemA() { return store.getters.item(1) }, // 1 👍 いいね
    itemB() { return store.getters.item },    // 2 👎 よくないね
    nameA() { return store.getters.name(1) }, // 3 👍 いいね
    nameB() { return store.getters.name },    // 4 👎 よくないね
  }
}
</script>
