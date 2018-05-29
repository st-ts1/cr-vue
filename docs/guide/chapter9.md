---
sidebarDepth: 2
title: CHAPTER 9
---

# CH9 VueRouter で SPA を構築

CodeSandbox の雛形はこちらです。

[https://codesandbox.io/s/2xqzz531zp](https://codesandbox.io/s/2xqzz531zp)

最低限必要なモジュールとファイルのみを追加したものになっています。
Forkして、いろいろ付け足してみてください😺

※ 下のバーからコンソールも使用できます

## S48 シンプルなSPA構造

<page-info page="284～"/>

### ページコンポーネントを定義

<code-caption>src/views/Home.vue</code-caption>
```vue
<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>商品情報</h1>
  </div>
</template>
```

### ルートを定義

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// ルート用のコンポーネントを読み込む
import Home from '@/views/Home'
import Product from '@/views/Product'
// Vuexと同様で最初にプラグインとして登録
Vue.use(VueRouter)
// VueRouterインスタンスを生成する
const router = new VueRouter({
  // URLのパスと紐づくコンポーネントをマッピング
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product',
      component: Product
    }
  ]
})
// 生成したVueRouterインスタンスをエクスポート
export default router
```

### ルーターをアプリケーションに登録

<code-caption>src/main.js</code-caption>
```js
import router from './router.js'
new Vue({
  el: '#app',
  router, // アプリケーションに登録
  render: h => h(App)
})
```

### マッチしたルータービューを表示

<code-caption>src/App.vue</code-caption>
```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/product">商品情報</router-link>
    </nav>
    <!-- ここにパスと一致したコンポーネントが埋め込まれる -->
    <router-view />
  </div>
</template>
```

### URL にハッシュを付けない

<code-caption>.htaccess</code-caption>
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
# サブディレクトリがある場合
# RewriteBase /my-app/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```

サブディレクトリがある場合は、VueRouter コンストラクタのオプションの `base` も設定します。

<code-caption>src/router.js</code-caption>
```js
const router = new VueRouter({
  base: '/my-app/'
})
```

## S51 動的ルートからコンテンツを作成しよう

<page-info page="295～301"/>

### ページコンポーネントを定義

<page-info page="295"/>

<code-caption>src/views/ProductList.vue</code-caption>
```vue
<template>
  <div class="product-list">
    <h1>商品一覧</h1>
  </div>
</template>
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>商品情報</h1>
  </div>
</template>
```

### パターンマッチのルーティング

<page-info page="296"/>

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ProductList from '@/views/ProductList'
import Product from '@/views/Product'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product', // IDが付いていないときはリストを表示
      component: ProductList
    },
    {
      path: '/product/:id', // 「:id」がパラメータ 何が入ってもOK
      component: Product
    }
  ]
})
export default router
```

「Product.vue」コンポーネントでパラメータを確認してみよう！

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>商品情報</h1>
    <p>このページは ID.{{ $route.params.id }} の詳細を表示する</p>
  </div>
</template>
```

### パラメータをpropsとしてコンポーネントに渡す

<page-info page="297"/>

<code-caption>src/router.js</code-caption>
```js
const router = new VueRouter({
  routes: [
    // ...
    {
      path: '/product/:id',
      component: Product,
      // 関数の場合第1引数として現在のルートオブジェクトが使用できる
      props: route => ({
        id: Number(route.params.id)
      })
    }
  ]
})
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>商品情報</h1>
    <p>このページは ID.{{ id }} の詳細を表示する</p>
  </div>
</template>
<script>
  export default {
    props: {
      id: Number
    }
  }
</script>
```

### コンテンツを表示する

<page-info page="299"/>

<code-caption>src/api/products.js</code-caption>
```js
// 商品リストの配列
const database = [
  { id: 1, name: '商品A', price: 100, content: '商品A詳細' },
  { id: 2, name: '商品B', price: 200, content: '商品B詳細' },
  { id: 3, name: '商品C', price: 300, content: '商品C詳細' }
]
// インポート先で使用できる関数をオブジェクトとしてまとめたもの
export default {
  fetch(id) {
    return database
  },
  find(id) {
    return database.find(el => el.id === id)
  },
  asyncFind(id, callback) {
    setTimeout(() => {
      callback(database.find(el => el.id === id))
    }, 1000)
  }
}
```

#### 商品リスト一覧の表示

<code-caption>src/views/ProductList.vue</code-caption>
```vue
<template>
  <div class="product-list">
    <h1>商品一覧</h1>
    <ul>
      <li v-for="{ id, name } in list" :key="id">
        <router-link :to="`/product/${ id }`">{{ name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import products from '@/api/products.js'
  export default {
    computed: {
      list: () => products.fetch()
    }
  }
</script>
```

#### 商品情報の表示

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product" v-if="item" key="product">
    <h1>商品情報</h1>
    <dl class="product-table">
      <dt>商品名</dt>
      <dd>{{ item.name }}</dd>
      <dt>価格</dt>
      <dd>{{ item.price }}円</dd>
      <dt>商品説明</dt>
      <dd>{{ item.content }}</dd>
    </dl>
  </div>
  <div v-else key="loading">商品情報を読み込んでいます...</div>
</template>

<script>
  import products from '@/api/products.js'
  export default {
    props: {
      id: Number
    },
    data() {
      return {
        item: null
      }
    },
    watch: {
      id: {
        handler() {
          products.asyncFind(this.id, item => {
            this.item = item
          })
        },
        immediate: true
      }
    }
  }
</script>
```

## S52 ネストされた複雑なページを作成

<page-info page="302～306"/>

書籍で「商品情報」と「商品詳細」という表記ゆれがあるため、少し修正しています。

### ネストされたルートの定義

<page-info page="302"/>

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import ProductList from '@/views/ProductList' // 商品一覧
import Product from '@/views/Product' // 商品情報（親ルート）
// Productの子ルートたち
import ProductHome from '@/views/Product/Home'
import ProductReview from '@/views/Product/Review'
import ProductReviewDetail from '@/views/Product/ReviewDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    // 商品一覧ページ
    {
      path: '/product',
      component: ProductList,
    },
    // 商品情報ページ
    {
      path: '/product/:id',
      component: Product,
      props: route => ({
        id: Number(route.params.id)
      }),
      children: [
        // 商品詳細（デフォルトルート）
        {
          name: 'product-home',
          path: '',
          component: ProductHome
        },
        // 商品のレビュー一覧
        {
          name: 'product-review',
          path: 'review',
          component: ProductReview
        },
        // 商品のレビュー詳細
        {
          name: 'review-detail',
          path: 'review/:rid', // 親ルートとかぶらないパラメータを指定
          component: ProductReviewDetail,
          props: route => ({
            rid: Number(route.params.rid)
          })
        }
      ]
    }
  ]
})
export default router
```

### データの共有には Vuex を使用する

<page-info page="304"/>

<code-caption>src/store/product.js</code-caption>
```js
import products from '@/api/products.js'
// 商品詳細用のVuexモジュール
export default {
  namespaced: true,
  state: {
    detail: {}
  },
  getters: {
    detail: state => state.detail
  },
  mutations: {
    set(state, { detail }) {
      state.detail = detail
    },
    clear(state) {
      state.detail = {}
    }
  },
  actions: {
    load({ commit }, id) {
      products.asyncFind(id, detail => {
        commit('set', { detail })
      })
    },
    destroy({ commit }) {
      commit('clear')
    }
  }
}
```

### 親ルート用コンポーネントの定義

<page-info page="305"/>

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>{{ detail.name }}</h1>
    <nav class="nav">
      <router-link :to="{ name: 'product-home' }">商品詳細</router-link>
      <router-link :to="{ name: 'product-review' }">レビュー</router-link>
    </nav>
    <!-- ここに子ルートを埋め込む -->
    <router-view />
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: {
      id: Number
    },
    computed: mapGetters('product', ['detail']),
    watch: {
      id: {
        handler() {
          this.$store.dispatch('product/load', this.id)
        },
        immediate: true
      }
    },
    beforeDestroy() {
      // 親ルートを移動するとき商品詳細データを破棄
      this.$store.dispatch('product/destroy')
    }
  }
</script>
```

### 子ルート用コンポーネントを定義

<code-caption>src/views/Product/Home.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>商品情報</h1>
  </div>
</template>
```

<code-caption>src/views/Product/Review.vue</code-caption>
```vue
<template>
  <div class="review-list">
    <h1>レビュー一覧</h1>
    <!-- 実装方法は商品一覧とだいたい同じ -->
  </div>
</template>
```

<code-caption>src/views/Product/ReviewDetail.vue</code-caption>
```vue
<template>
  <div class="review-detail">
    <h1>レビュー情報</h1>
    <!-- 実装方法は商品情報とだいたい同じ -->
  </div>
</template>
```

## S54 ページの遷移にエフェクトを適用する

### 簡単なトランジション

<page-info page="312"/>

<code-caption>ルータービューをトランジションタグで囲む</code-caption>
```vue
<transition name="view">
  <router-view />
</transition>
```

```css
.view-enter-active, .view-leave-active {
  transition: opacity 0.5s;
}
.view-leave-active {
  position: absolute;
}
.view-enter, .view-leave-to {
  opacity: 0;
}
```

### 非同期読み込みを含むトランジション

<page-info page="312"/>

#### ルータービュー用の Vuex モジュール

<code-caption>src/store/view.js</code-caption>
```js
export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    start(state) {
      state.loading = true
    },
    end(state) {
      state.loading = false
    }
  }
}
```

ローディングのオーバーレイを表示したいタイミングで `view/start` を、非表示にしたいタイミングで `view/end` をコミットする。（ミューテーションタイプの命名が微妙だったかも）

#### グローバルのナビゲーションガード

<code-caption>src/router.js</code-caption>
```js
// ルーターナビゲーションの前にフック
router.beforeEach((to, from, next) => {
  store.commit('view/start')
  next()
})
// ルーターナビゲーションの後にフック
router.afterEach(() => {
  store.commit('view/end')
})
```

#### オーバーレイ用のコンポーネントを作詞

<code-caption>src/components/LoadingOverlay.vue</code-caption>
```vue
<template>
  <transition name="loading">
    <div class="loading" v-if="loading">Loading</div>
  </transition>
</template>

<script>
  export default {
    computed: {
      loading() {
        return this.$store.state.view.loading
      }
    }
  }
</script>

<style>
.loading {
  /* position:fixed; とかでいい感じのスタイル */
}
.loading-enter-active {
  transition: all 0.25s;
}
.loading-leave-active {
  transition: all 0.5s ease 0.5s; /* ルータービューが終わった後に */
}
</style>
```

#### オーバーレイ用コンポーネントを使用する

```vue
<transition name="view">
  <router-view />
</transition>
<!-- オーバーレイ用のコンポーネント -->
<LoadingOverlay />
```

#### コンポーネントのナビゲーションガード

ナビゲーションが解決するまで時間のかかるコンポーネントの例。

```js
export default {
  // ...
  beforeRouteEnter(to, from, next) {
    setTimeout(next, 1000)
    // 遷移をガードする場合は view/end のコミットもする
  }
}
```

## S55 その他の機能やオプション

<page-info page="316～318"/>

### 遷移前のデータの読み込み

<page-info page="316"/>

```vue
<script>
import products from '@/api/products.js'
export default {
  data() {
    return {
      item: {}
    }
  },
  // enter は this を使用できないため実装が異なる
  beforeRouteEnter(to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      next(vm => {
        vm.item = item
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      this.item = item
      next()
    })
  }
}
</script>
```

### コンポーネントの非同期読み込み

<code-caption>src/router.js</code-caption>
```js
// 非同期コンポーネント
const About = () => import('@/views/About')
const router = new VueRouter({
  routes: [{
    path: '/about',
    component: About
    // 次のように書くこともできる
    // component: () => import('@/views/About')
  }]
})
```

<code-caption>src/App.vue</code-caption>

```vue
<script>
export default {
  components: {
    MyComponent: () => import('@/components/MyComponent')
  }
}
</script>
```

### ルートのアクセス制限

<page-info page="317"/>

より実践的な例は、チュートリアルの「[認証付きの簡易チャットを作ろう](/tutorials/firebase.html)」や、[こちらのリポジトリ](https://github.com/mio3io/vue-test/tree/master/src/router)のコードをご覧ください。

```js
const router = new VueRouter({
  routes: [
    // アクセス制限したいルート
    {
    path: '/user',
    component: User,
    meta: {
      requiresAuth: true
    }
  }]
})

router.beforeEach((to, from, next) => {
  // 上位ルートを含めて認証が必要なルートがあるかを確認
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 認証状態を確認
    if (!auth.loggedIn()) {
      // 認証していなければログインページにリダイレクト
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // 認証の確認が必要ないルートならnext()で遷移
  }
})
```

### スクロールの振る舞いを操作する

<page-info page="318"/>

```js
const router = new VueRouter({
  routes: [
    // ...
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
```
