---
sidebarDepth: 2
title: CHAPTER 7
---

# CH7 より大規模なアプリケーション開発

## S35 単一ファイルコンポーネントとは

<page-info page="221～225"/>

<code-caption>Exampleコンポーネント</code-caption>
```vue
<template>
  <div class="example">
    <span class="title">{{ text }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Example',
    data() {
      return {
        text: 'example'
      }
    }
  }
</script>

<!-- scoped CSS -->
<style scoped>
  .title {
    color: #ffbb00;
  }
</style>
```

## S37 Node.js の導入

- [Node.js 日本公式サイト](https://nodejs.org/ja/)
- [npm Documentation](https://docs.npmjs.com/)
- [Babel 公式サイト](https://babeljs.io/)

## S38 Vue CLI の導入

<page-info page="231～237"/>

### Vue CLI のインストール

<code-caption>Vue CLI をグローバルにインストール</code-caption>
```bash
npm install -g vue-cli
```

### 新しいプロジェクトの作成

<code-caption>プロジェクトの作成</code-caption>
```bash
vue init webpack my-app
```

最後に自動でインストールが開始されない場合は、次のコマンドで `my-app` ディレクトリに移動してモジュールをインストールしてください。

```bash
cd my-app
npm install
```

### フォルダとファイルの構成

<page-info page="234"/>

次のように、ルートコンストラクタのテンプレートを描画関数に変更してそれ以外はすべて「.vue」ファイルを使用することで、ランタイム限定ビルド（ややコンパクトサイズ）の Vue.js を利用できます。
テンプレートオプションを使用していると、コンパイルが必要になるためランタイム限定ビルドは利用できません。

<code-caption>main.js 変更前</code-caption>
```js
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

<code-caption>main.js 変更後</code-caption>
```js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## [おまけ] Vue CLI バージョン3

ここからは、Vue CLI3の説明です。

::: warning

バージョン3のドキュメントは、リポジトリの「docs」フォルダに英語版がありますが、日本語はまだ整備されていません。
また、ベータ版のため仕様に変更が入ることもあります。不安がある場合はバージョン2を使用してください。

:::

### Vue CLI3 のインストール

`npm install -g vue-cli` の代わりに、次のコマンドで現在開発中のバージョン3の Vue CLI をインストールできます。

<code-caption>Vue CLI3 をグローバルにインストール</code-caption>
```bash
npm install -g @vue/cli
# or yarn がいい場合は…
yarn global add @vue/cli
```

### プロジェクトの作成方法

プロジェクトの作成は `vue init webpack my-app` の代わりに、次のコマンドを使用します。

<code-caption>プロジェクトの作成</code-caption>
```bash
# プロジェクトの作成
vue create my-app
```

Vue CLI3 では、質問内容がだいぶ異なります。
また、テンプレートを指定するのではなく、質問に答えて必要なパッケージを選択します。
学習では、一番最初のプリセットで「simple」を選択するか、「Manually select features」を選択して「Babel」「CSS Pre-processors」のみを選択するのがオススメです。
上下の矢印キーで項目移動、スペースキーでチェックが付けられます。

Vuex と Vue Router については、インストール手順から説明しているため、この時点ではインストールしなくても問題ありません。
最初の質問でプリセットを選択した場合は、すぐにモジュールのインストールが開始されます。

Vue CLI3 ではビルドツール用のファイルは、ほぼすべて隠蔽されるため、フォルダがスッキリとします。
ビルド設定のカスタマイズは、プロジェクトルートに `vue.config.js` というファイル作成してそこに追加していきます。

### ディレクトリ構造

「src」ディレクトリの中身はバージョン2と同じです。「public」フォルダには、インデックスの HTML のテンプレートとなる「index.html」ファイルと、ローダーを介さずそのまま公開する静的ファイルが入ります。（つまり、バージョン2の「static」フォルダと同じ）

<code-caption>デフォルト</code-caption>
```
.git/ 3では最初から作成される！✨
public/ そのまま公開したいファイル
src/
 ├ assets/
 ├ components/
 ├ App.vue
 └ main.js
```

<code-caption>Vuex と VueRouterを使う場合はこんなかんじ</code-caption>
```
.git/ 
public/
src/
 ├ assets/
 ├ components/
 ├ store/ Vuex モジュール
 ├ views/ ページ用コンポーネント
 ├ App.vue
 ├ main.js
 ├ router.js
 └ store.js
```

開発サーバーの起動のコマンドも変わり、次のようになります。

```bash
npm run serve
# or
yarn serve
```

## S39 Vue.jsプラグイン

<page-info page="238～241"/>

### プラグインを自作してみよう

<page-info page="238"/>

<code-caption>スクロール数値を共有するプラグイン</code-caption>
```js
var windowPlugin = {
  install: function(Vue) {
    // プラグインデータ用にVueインスタンスを利用する
    var store = new Vue({
      data: {
        scrollY: 0
      }
    })
    // ウィンドウのスクロールイベントをハンドル
    var timer = null
    window.addEventListener('scroll', function() {
      if (timer === null) {
        timer = setTimeout(function() {
          // 200ms間隔でscrollYプロパティに代入
          store.scrollY = window.scrollY
          clearTimeout(timer)
          timer = null
        }, 200)
      }
    })
    // インスタンスプロパティに登録
    Vue.prototype.$window = store.$data
  }
}
```

<code-caption>プラグインを登録</code-caption>
```js
Vue.use(windowPlugin)
```

<code-caption>すべての Vue インスタンスで使用可能</code-caption>
```js
Vue.component('my-component', {
  template: '<div>{{ scrollY }}</div>',
  computed: {
    scrollY: function() {
      return this.$window.scrollY
    }
  }
})
```

## S40 ES2015 で書いてみよう

<page-info page="242～250"/>

### 変数宣言の書き方

<code-caption>再代入</code-caption>
```js
let x = 0
console.log(x++) // -> 1
const x = 0
console.log(x++) // -> Identifier 'x' has already been declared
```

<code-caption>スコープ</code-caption>
```js
{
  let x = 1
}
console.log(x) // -> x is not defined
```

<code-caption>配列を空にする</code-caption>
```js
const array = [1, 2]
array.push(3)
console.log(array) // -> (3) [1, 2, 3]
array.length = 0
console.log(array) // -> []
```

- [MDN web docs - const](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const)

### 関数とメソッドの書き方

#### function の省略

<code-caption>Vue の this を使いたい場合はこれ！</code-caption>
```js
new Vue({
  methods: {
    handleClick() { ... }
  }
})
```

- [MDN web docs - メソッド定義](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions_and_function_scope/Method_definitions)

#### アロー関数

<code-caption>STEP1</code-caption>
```js
const newArray = array.map(el => {
  return el * 2
})
```

<code-caption>STEP2 return を省略</code-caption>
```js
const newArray = array.map(el => el * 2)
```

<code-caption>STEP3 複数の引数</code-caption>
```js
const newArray = array.map((el, index) => el * 2)
```

<code-caption>STEP4 オブジェクトの return</code-caption>
```js
const newArray = array.map(el => ({ value: el * 2 }))
```

- [MDN web docs - アロー関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/arrow_functions)

### テンプレートリテラル

```js
const name = 'たま'
const template = `
  <div class="template">
    <strong>${ name }</strong>
  </div>`
console.log(template)
```

- [MDN web docs - テンプレート文字列](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings)

### プロパティのショートハンド

```js
const a = 'foo'
const b = 'bar'
const newObject = { a, b }
```

- [MDN web docs - オブジェクト初期化子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer)

### 分割代入

```js
// 配列要素1,2をそれぞれ変数a,bに代入
const [a, b] = [1, 2]
console.log(a) // -> 1
// nameプロパティだけ代入
const { name } = { id: 1, name: 'りんご' }
console.log(name) // -> りんご
```

```js
function myFunction({ id, name }) {
  console.log(name) // -> りんご
}
myFunction({ id: 1, name: 'りんご' })
```

- [MDN web docs - 分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### スプレッド演算子

```js
const array = [1, 2, 3]
// バラバラの3つの引数として渡す
myFunction(...array)
// arrayを展開して4を加えた新しい一次配列を作成
const newArray = [...array, 4] // -> (4) [1, 2, 3, 4]
```

- [MDN web docs - スプレッド演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_operator)

### 配列メソッド

#### find

```js
const array = [
  { id: 1, name: 'りんご' },
  { id: 2, name: 'ばなな' }
]
const result = array.find(el => el.id === 2)
console.log(result) // -> { id: 2, name: 'ばなな' }
```

- [MDN web docs - Array.prototype.find()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

#### findIndex

```js
const array = [
  { id: 1, name: 'りんご' },
  { id: 2, name: 'ばなな' }
]
const result = array.findIndex(el => el.id === 2)
console.log(result) // -> 1
```

- [MDN web docs - Array.prototype.findIndex()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

### Promise

<code-caption>成功を知る</code-caption>
```js
function myFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功したことを通知
      resolve('success!')
    }, 1000)
  })
}
// 1秒後にmyFunctionが終わった知らせを受けてthenの処理が行われる
myFunction().then(value => {
  console.log(value) // -> success!
})
```

<code-caption>失敗を知る</code-caption>
```js
function myFunction(num) {
  return new Promise((resolve, reject) => {
    if (num < 10) {
      resolve('success!')
    } else {
      reject('error!')
    }
  })
}
myFunction(100).catch(value => {
  console.log(value) // -> error!
})
```

<code-caption>どっちでもいい</code-caption>
```js
myFunction().then().catch().finally(() => {
  // 成功でも失敗でも行われる
})
```

- [MDN web docs - Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)
