---
sidebarDepth: 2
title: CHAPTER 8
---

# CH8 Vuex でアプリケーションの状態を管理

※ このチャプターの 259、260、261、262 ページで使用している `Vuex.Store()` コンストラクタの閉じ括弧（コードの最後の文字）が不足しておりました。

::: warning ストアの参照方法について

このサイトを構築している VuePress で複数のストアを扱っている都合上、このページのコードでは、単一ファイルコンポーネントごとに `store.js` を読み込んでいます。

<code-caption>App.vue 都合上このように読み込んでいる</code-caption>
```js
import store from './store'
export default {
  created() {
    console.log(store.state) // store で参照
  }
}
```

一般的には、グローバルに登録して使用します。（256ページ参照）

<code-caption>App.vue グローバルに登録していれば import 文不要でこう書ける</code-caption>
```js
export default {
  created() {
    console.log(this.$store.state) // this.$store で参照
  }
}
```

:::

::: tip

パス中の「`@`」は「`src/`」のエイリアスです。
もし登録されていない場合は、相対パスとして置き換えてください。

<code-caption>例</code-caption>
```js
import store from '@/store.js'
import store from './store.js' // main.js からならこうなる
```

:::

## シンプルなストア構造

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

## コアコンセプト

<page-info page="258～263"/>

### ゲッター（getter）

<page-info page="259"/>

<code-caption>src/store.js</code-caption>

<code-caption>src/App.vue</code-caption>

::: tip

引数付きゲッターの itemB / nameB の書き方は便利ですが、結果はキャッシュされません。
算出プロパティを通さない場合も同じです。
何度も使用していたり、コンポーネントの<mark>仮想 DOM に変化があるたびに呼び出されてしまう</mark>ため、コストの高い算出処理をしている場合には注意しましょう！

:::

<demo-block>
  <p>example-S43</p>
</demo-block>

## コンポーネントでストアを使用しよう

<page-info page="264～269"/>

### メッセージの状態を管理するストア

<page-info page="264"/>

<code-caption>src/store.js</code-caption>

### メッセージを使用する

<page-info page="265"/>

<code-caption>src/App.vue</code-caption>

### メッセージを更新する

<page-info page="266"/>

「ステートやゲッターに `v-model` を使用する」もまとめています。

<code-caption>src/components/EditForm.vue</code-caption>

<demo-block>
  <p>example-S44</p>
</demo-block>

## モジュールで大きくなったストアを分割する

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

### ネームスペース付きモジュールから外部へのアクセス

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

## その他の機能やオプション

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
