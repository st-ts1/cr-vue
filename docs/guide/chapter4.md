---
sidebarDepth: 2
title: CHAPTER 4
---

# CH4 データの監視と加工

## S16 算出プロパティで処理を含むデータを作成

<page-info page="120～"/>

### 算出プロパティの使い方

<page-info page="120"/>

```html
<p>{{ width }} の半分は {{ halfWidth }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800
  },
  computed: {
    // 算出プロパティhalfWidthを定義
    halfWidth: function() {
      return this.width / 2
    }
  }
})
```

<demo-block demo="guide-ch4-demo01"/>

### 算出プロパティを組み合わせて使用しよう

<page-info page="121"/>

```html
<p>X: {{ halfPoint.x }}</p>
<p>Y: {{ halfPoint.y }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800,
    height: 600
  },
  computed: {
    halfWidth: function() {
      return this.width / 2
    },
    halfHeight: function() {
      return this.height / 2
    },
    // 「width × height」の中心座標をオブジェクトで返す
    halfPoint: function() {
      return {
        x: this.halfWidth,
        y: this.halfHeight
      }
    }
  }
})
```

### ゲッターとセッター

<page-info page="122"/>

```html
<input v-model.number="width"> {{ width }}
<input v-model.number="halfWidth"> {{ halfWidth }}
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800
  },
  computed: {
    halfWidth: {
      get: function() {
        return this.width / 2
      },
      // halfWidth の2倍の数値を width に代入する
      set: function(val) {
        this.width = val * 2
      }
    }
  }
})
```

<demo-block demo="guide-ch4-demo03"/>

### 算出プロパティのキャッシュ機能

<page-info page="123"/>

```html
<p>算出プロパティ</p>
<ol>
  <li>{{ computedData }}</li>
  <li>{{ computedData }}</li>
</ol>
<p>メソッド</p>
<ol>
  <li>{{ methodsData() }}</li>
  <li>{{ methodsData() }}</li>
</ol>
```

```js
new Vue({
  el: '#app',
  computed: {
    computedData: function() { return Math.random() }
  },
  methods: {
    methodsData: function() { return Math.random() }
  }
})
```

<demo-block demo="guide-ch4-demo04"/>

### リストの絞り込みに利用しよう

<page-info page="124"/>

```html
<div id="app">
  <input v-model.number="budget"> 円以下に絞り込む
  <input v-model.number="limit"> 件を表示
  <p>{{ matched.length }} 件中 {{ limited.length }} 件を表示中</p>
  <ul>
    <!-- v-forでは最終結果、算出プロパティのlimitedを使用する -->
    <li v-for="item in limited" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}円
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    // フォームの入力と紐付けるデータ
    budget: 300,
    // 表示件数
    limit: 2,
    // もとになるリスト
    list: [
      { id: 1, name: 'りんご', price: 100 },
      { id: 2, name: 'ばなな', price: 200 },
      { id: 3, name: 'いちご', price: 400 },
      { id: 4, name: 'おれんじ', price: 300 },
      { id: 5, name: 'めろん', price: 500 }
    ]
  },
  computed: {
    // budget以下のリストを返す算出プロパティ
    matched: function () {
      return this.list.filter(function (el) {
        return el.price <= this.budget
      }, this)
    },
    // matchedで返ったデータをlimit件返す算出プロパティ
    limited: function () {
      return this.matched.slice(0, this.limit)
    }
  }
})
```

<demo-block demo="guide-ch4-demo05"/>

### ソート機能を追加しよう

<page-info page="126"/>

```html
<div id="app">
  <input v-model.number="budget"> 円以下に絞り込む
  <input v-model.number="limit"> 件を表示
  <button v-on:click="order=!order">切り替え</button>
  <p>{{ matched.length }} 件中 {{ limited.length }} 件を表示中</p>
  <ul>
    <!-- v-forでは最終結果、算出プロパティのlimitedを使用する -->
    <li v-for="item in limited" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}円
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
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
      return _.orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
    },
    // limitedで使用するリストをsortedに変更
    limited: function() {
      return this.sorted.slice(0, this.limit)
    }
  }
})
```

<demo-block demo="guide-ch4-demo06"/>

## S17 ウォッチャでデータを監視して処理を自動化

<page-info page="128～"/>

### ウォッチャの使い方

<page-info page="128"/>

オプションを使用しない場合

```js
new Vue({
  // ...
  watch: {
    監視するデータ: function (新しい値, 古い値) {
      // valueが変化したときに行いたい処理
    },
    'item.value': function (newVal, oldVal) {
      // オブジェクトのプロパティも監視できる
    }
  }
})
```

オプションを使用する場合

```js
new Vue({
  // ...
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        // listが変化したときに行いたい処理
      },
      deep: true,
      immediate: true
    }
  }
})
```

インスタンスメソッドで登録する場合

```js
this.$watch('value', function(newVal, oldVal) {
  // ...
})
```

オプション付きのインスタンスメソッドで登録する場合

```js
this.$watch('value', function (newVal, oldVal) {
  // ...
}, {
  immediate: true,
  deep: true
})
```

### 一度だけ動作するウォッチャ

<page-info page="130"/>

```js
new Vue({
  el: '#app',
  data: {
    edited: false,
    list: [
      { id: 1, name: 'りんご', price: 100 },
      { id: 2, name: 'ばなな', price: 200 },
    ]
  },
  created: function() {
    var unwatch = this.$watch('list', function () {
      // listが編集されたことを記録する
      this.edited = true
      // 監視を解除
      unwatch()
    }, {
      deep: true
    })
  }
})
```

### 実行頻度の制御

<page-info page="130"/>

```html
<input type="text" v-model="value">
```

```js
new Vue({
  el: '#app',
  data: {
    value: '編集してみてね'
  },
  watch: {
    value: _.debounce(function (newVal) {
        // ここへコストの高い処理を書く
        console.log(newVal)
      },
      // valueの変化が終わるのを待つ時間をミリ秒で指定
      500)
  }
})
```

### フォームを監視してAPIからデータを取得しよう

<page-info page="133"/>

```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.17.1/dist/axios.min.js"></script>
<div id="app">
  <select v-model="current">
    <option v-for="topic in topics" v-bind:value="topic.value">
      {{ topic.name }}
    </option>
  </select>
  <div v-for="item in list">{{ item.full_name }}</div>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [],
    current: '',
    topics: [
      { value: 'vue', name: 'Vue.js' },
      { value: 'jQuery', name: 'jQuery' }
    ]
  },
  watch: {
    current: function (val) {
      // GitHubのAPIからトピックのリポジトリを検索
      axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'topic:' + val
        }
      }).then(function (response) {
        this.list = response.data.items
      }.bind(this))
    }
  },
})
```

## S18 フィルタでテキストの変換処理を行う

<page-info page="134～136"/>

### フィルタの使い方

<page-info page="134"/>

```js
new Vue({
  el: '#app',
  data: {
    price: 19800
  },
  filters: {
    localeNum: function (val) {
      return val.toLocaleString()
    }
  }
})
```

### 複数のフィルタをつなげて使用する

<page-info page="136"/>

```js
new Vue({
  el: '#app',
  filters: {
    // 小数点以下を第2位に丸めるフィルタ
    round: function (val) {
      return Math.round(val * 100) / 100
    },
    // 度からラジアンに変換するフィルタ
    radian: function (val) {
      return val * Math.PI / 180
    }
  }
})
```

```html
180 度は {{ 180 | radian | round }} ラジアンだよ
```

## S19 カスタムディレクティブ

<page-info page="137～"/>

### カスタムディレクティブの使い方

<page-info page="137"/>

```js
new Vue({
  el: '#app',
  directives: {
    focus: {
      // 紐付いている要素がDOMに挿入されるとき
      inserted: function (el) {
        el.focus() // 要素にフォーカスを当てる
      }
    }
  }
})
```

```html
<input type="text" v-focus>
```

### 使用可能なフック

<page-info page="139"/>

```js
Vue.directive('example', {
  bind: function (el, binding) {
    console.log('v-example bind')
  },
  inserted: function (el, binding) {
    console.log('v-example inserted')
  },
  update: function (el, binding) {
    console.log('v-example update')
  },
  componentUpdated: function (el, binding) {
    console.log('v-example componentUpdated')
  },
  unbind: function (el, binding) {
    console.log('v-example unbind')
  }
})
```

## S20 nextTickで更新後のDOMにアクセスする

<page-info page="143～144"/>

### 更新後のDOMの高さを取得しよう

<page-info page="144"/>

```html
<button v-on:click="list.push(list.length+1)">追加</button>
<ul ref="list">
  <li v-for="item in list">{{ item }}</li>
</ul>
```

```js
new Vue({
  el: '#app',
  data: {
    list: []
  },
  watch: {
    list: function () {
      // 更新後のul要素の高さを取得できない…
      console.log('通常:', this.$refs.list.offsetHeight)
      // nextTickを使えばできる！
      this.$nextTick(function () {
        console.log('nextTick:', this.$refs.list.offsetHeight)
      })
    }
  }
})
```
