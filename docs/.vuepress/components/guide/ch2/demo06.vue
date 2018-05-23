<template>
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <!-- 削除ボタンをv-for内に作成 -->
      <button v-on:click="doRemove(index)">モンスターを削除</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: 'スライム', hp: 100 },
        { id: 2, name: 'ゴブリン', hp: 200 },
        { id: 3, name: 'ドラゴン', hp: 500 }
      ]
    }
  },
  methods: {
    // 要素を削除ボタンをクリックしたときのハンドラ
    doRemove: function (index) {
      // 受け取ったインデックスの位置から1個要素を削除
      this.list.splice(index, 1)
    }
  }
}
</script>
