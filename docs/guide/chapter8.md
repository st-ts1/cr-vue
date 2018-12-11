---
sidebarDepth: 2
title: CHAPTER 8
---

# CH8 Vuex でアプリケーションの状態を管理

CodeSandbox の雛形はこちらです。

[https://codesandbox.io/s/pw89zq7kjm](https://codesandbox.io/s/pw89zq7kjm)

最低限必要なモジュールとファイルのみを追加したものになっています。
Forkして、いろいろ付け足してみてください😺

※ 下のバーからコンソールも使用できます

::: tip

パス中の「`@`」は「`src/`」のエイリアスです。
もし登録されていない場合は、相対パスとして置き換えてください。

<code-caption>例</code-caption>
```js
import store from '@/store.js'
import store from './store.js' // main.js からならこうなる
```

:::

## S42 シンプルなストア構造

<page-info page="255"/>

<code-caption>src/store.js</code-caption>
```js
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // カウントアップするミューテーションを登録
    increment(state) {
      state.count++
    }
  }
})
export default store
```

`src/main.js` などから `src/store.js` を読み込んでコンソールログを確認してみましょう。

<code-caption>src/main.js</code-caption>
```js
import store from '@/store.js'

console.log(store.state.count) // -> 0
// incrementをコミットする
store.commit('increment')
// もう一度アクセスしてみるとカウントが増えている
console.log(store.state.count) // -> 1
```

## S43 コアコンセプト

<page-info page="258～263"/>

### ステート（state）

```js
const store = new Vuex.Store({
  state: {
    message: 'メッセージ'
  }
})
```

<code-caption>呼び出し方</code-caption>
```js
store.state.message
```

### ゲッター（getter）

<page-info page="259"/>

<code-caption>src/store.js</code-caption>

```js
const store = new Vuex.Store({
  state: {
    count: 0,
    list: [
      { id: 1, name: 'りんご', price: 100 },
      { id: 2, name: 'ばなな', price: 200 },
      { id: 3, name: 'いちご', price: 300 }
    ]
  },
  getters: {
    // 単純にステートを返す
    count(state, getters, rootState, rootGetter) {
      return state.count
    },
    // リストの各要素の price プロパティの中から最大数値を返す
    max(state) {
      return state.list.reduce((a, b) => {
        return a > b.price ? a : b.price
      }, 0)
    },
    // 引数付きゲッター
    // listからidが一致する要素を返す
    item(state) {
      // 引数を使用するためアロー関数を返している
      return id => state.list.find(el => el.id === id)
    },
    // 別のゲッターを使うこともできる
    name(state, getters) {
      return id => getters.item(id).name
    }
  }
})
```

<code-caption>呼び出し方</code-caption>
```js
store.getters.count
store.getters.max
```

<code-caption>呼び出し方（引数付き）</code-caption>
```js
store.getters.item(1)
store.getters.name(1)
```

<code-caption>src/App.vue</code-caption>

```vue
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
export default {
  computed: {
    // 引数なしゲッター
    count() { return this.$store.getters.count },   // 1
    max()   { return this.$store.getters.max },     // 2
    // 引数付きゲッター
    itemA() { return this.$store.getters.item(1) }, // 1 👍 いいね
    itemB() { return this.$store.getters.item },    // 2 👎 よくないね
    nameA() { return this.$store.getters.name(1) }, // 3 👍 いいね
    nameB() { return this.$store.getters.name },    // 4 👎 よくないね
  }
}
</script>
```

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/guide/ch8/s43)

<demo-block demo="guide-ch8-s43-src-App"/>

::: tip

引数付きゲッターの itemB / nameB の書き方は便利ですが、結果はキャッシュされません。
算出プロパティを通さない場合も同じです。
何度も使用していたり、コンポーネントの<mark>仮想 DOM に変化があるたびに呼び出されてしまう</mark>ため、コストの高い算出処理をしている場合には注意しましょう！

:::

### ミューテーション（mutations）

```js
const store = new Vuex.Store({
  // ...
  mutations: {
    mutationType(state, payload) {
      state.count = payload
    }
  }
})
```

<code-caption>呼び出し方</code-caption>
```js
store.commit('mutationType', payload)
```

### アクション（actions）

```js
const store = new Vuex.Store({
  // ...
  actions: {
    actionType({ commit }, payload) {
      // アクション内からコミットする
      commit('mutationType')
    }
  }
})
```

<code-caption>呼び出し方</code-caption>
```js
store.dispatch('actionType', payload)
```

## S44 コンポーネントでストアを使用しよう

<page-info page="264～269"/>

### メッセージの状態を管理するストア

<page-info page="264"/>

<code-caption>src/store.js</code-caption>
{include:guide/ch8/s44/src/store.js}

### メッセージを使用する

<page-info page="265"/>

<code-caption>src/App.vue</code-caption>

```vue
<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <EditForm/>
  </div>
</template>
<script>
// 子コンポーネントを読み込む
import EditForm from './components/EditForm'
export default {
  name: 'app',
  components: {
    EditForm
  },
  computed: {
    // ローカルの message とストアの message を同期
    message() {
      return this.$store.getters.message
    }
  }
}
</script>
```

### メッセージを更新する

<page-info page="266"/>

「ステートやゲッターに `v-model` を使用する」もまとめています。

<code-caption>src/components/EditForm.vue</code-caption>

```vue
<template>
  <div class="edit-form">
    <h3>バインドとイベントを使った場合</h3>
    <input type="text" :value="message" @input="doUpdate">
    <h3>v-model を使った場合</h3>
    <input v-model="message2">
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  computed: {
    message() {
      return this.$store.getters.message
    },
    message2: {
      get() { return this.$store.getters.message },
      set(value) { this.$store.dispatch('doUpdate', value) }
    }
  },
  methods: {
    doUpdate(event) {
      // input の値を持ってディスパッチ
      this.$store.dispatch('doUpdate', event.target.value)
    }
  }
}
</script>
```

<demo-block demo="guide-ch8-s44-src-App"/>

## S45 モジュールで大きくなったストアを分割

<page-info page="270～277"/>

### モジュールの使い方

<page-info page="270"/>

```js
const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})
```

### 同一のミューテーションタイプ

<page-info page="271"/>

```js
const moduleA = {
  state: {
    count: 1
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}
const moduleB = {
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 200
    }
  }
}
```

```js
console.log(store.state.moduleA.count) // -> 1
console.log(store.state.moduleB.count) // -> 2
store.commit('update')
console.log(store.state.moduleA.count) // -> 101
console.log(store.state.moduleB.count) // -> 202
```

### ネームスペース

<page-info page="272"/>

※ 書籍ではミューテーション `update` で引数の `state` を受け取りわすれていました🙇‍

```js
const moduleA = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 200
    }
  }
}
```

```js
store.commit('moduleA/update') // -> moduleA の update をコミット
store.commit('moduleB/update') // -> moduleB の update をコミット
```

### ネームスペース付きモジュールからのアクセス

<page-info page="274"/>

```js
const moduleA = {
  namespaced: true,
  getters: {
    test(state, getters, rootState, rootGetters) {
      // 自分自身の item ゲッターを使用 getters['moduleA/item']
      getters.item
      // ルートの user ゲッターを使用
      rootGetters.user

      return [getters.item, rootGetters.user]
    },
    item() { return 'getter: moduleA/item' },
  },
  actions: {
    test({ dispatch, commit, getters, rootGetters }) {
      // 自分自身の update をディスパッチ
      dispatch('update')
      // ルートの update をディスパッチ
      dispatch('update', null, { root: true })
      // ルートの update をコミット
      commit('update', null, { root: true })
      // ルートに登録されたモジュール moduleB の update をコミット
      commit('moduleB/update', null, { root: true })
    },
    update() { console.log('action: moduleA/update') },
  }
}
const moduleB = {
  namespaced: true,
  mutations: {
    update() { console.log('mutation: moduleB/update') }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  },
  getters: {
    user() { return 'getter: user' }
  },
  mutations: {
    update() { console.log('mutation: update') }
  },
  actions: {
    update() { console.log('action: update') }
  }
})

// 何が呼び出されるか、コンソールログを確認してみよう
store.dispatch('moduleA/test')
console.log(store.getters['moduleA/test'])
```

### モジュールの再利用

<page-info page="277"/>

<code-caption>共通のモジュール</code-caption>
```js
const myModule = {
  namespaced: true,
  state() {
    return {
      entries: []
    }
  },
  mutations: {
    set(state, payload) {
      state.entries = payload
    }
  },
  actions: {
    load({ commit }, file) {
      axios.get(file).then(response => {
        commit('set', response.data)
      })
    }
  }
}
```

<code-caption>同じモジュール定義を使う</code-caption>
```js
const store = new Vuex.Store({
  modules: {
    moduleA: myModule,
    moduleB: myModule
  }
})
// 別のデータを読み込んだりする
store.dispatch('moduleA/load', '/path/a.json')
store.dispatch('moduleB/load', '/path/b.json')
```

主旨はことなるけど管理方法が同じデータ。

<code-caption>材料データ</code-caption>
```json
[
  { "id": 1, "name": "りんご" },
  { "id": 2, "name": "ばなな" }
]
```

<code-caption>調理道具データ</code-caption>
```json
[
  { "id": 1, "name": "まないた" },
  { "id": 2, "name": "フライパン" }
]
```

ストアの再利用は、主に管理画面などを作成するときに便利です！

## S46 その他の機能やオプション

<page-info page="278～280"/>

### ストアの状態を監視する

<page-info page="278"/>

<code-caption>状態の監視</code-caption>
```js
const store = new Vuex.store({ ... })
const unwatch = store.watch(
  (state, getters) => {
    return state.count // 監視したいデータを返す
  },
  (newVal, oldVal) => {
    // 処理
  }
)
```

<code-caption>コミットやディスパッチの監視</code-caption>
```js
// コミットにフック
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
// ディスパッチにフック
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```

### Vuexでホットリロードを使用する

<page-info page="279"/>

```js
if (module.hot) {
  module.hot.accept(['@/store/myModule.js'], () => {
    // 更新されたモジュールを読み込む
    const myModule = require('@/store/myModule.js').default
    // 新しい定義をセット
    store.hotUpdate({
      modules: {
        myModule: myModule
      }
    })
  })
}
```
