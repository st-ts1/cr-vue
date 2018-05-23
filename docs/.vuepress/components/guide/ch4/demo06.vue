<template>
  <div>
    <input v-model.number="budget" size="4"> 円以下に絞り込む
    <input v-model.number="limit" size="4"> 件を表示
    <button v-on:click="order=!order">切り替え</button>
    <p>{{ matched.length }} 件中 {{ limited.length }} 件を表示中</p>
    <ul>
      <!-- v-forでは最終結果、算出プロパティのlimitedを使用する -->
      <li v-for="item in limited" v-bind:key="item.id">
        {{ item.name }} {{ item.price }}円
      </li>
    </ul>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
export default {
  data() {
    return {
      order: false,
      // フォームの入力と紐付けるデータ
      budget: 300,
      // 表示件数
      limit: 2,
      // 元になるリスト
      list: [
        { id: 1, name: 'りんご', price: 100 },
        { id: 2, name: 'ばなな', price: 200 },
        { id: 3, name: 'いちご', price: 400 },
        { id: 4, name: 'おれんじ', price: 300 },
        { id: 5, name: 'めろん', price: 500 }
      ]
    }
  },
  computed: {
    // budget以下のリストを返す算出プロパティ
    matched: function() {
      return this.list.filter(function(el) {
        return el.price <= this.budget
      }, this)
    },
    // sortedを新しく追加
    sorted: function() {
      return orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
    },
    // limitedで使用するリストをsortedに変更
    limited: function() {
      return this.sorted.slice(0, this.limit)
    }
  }
}
</script>

<style scoped>

</style>
