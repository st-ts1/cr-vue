---
sidebarDepth: 2
title: CHAPTER 1
---

# CH1 Vue.js とフレームワークの基礎知識

## インストール

<page-info page="36"></page-info>

CHAPTER6 まではスクリプトタグで読み込むだけの、**スタンドアロン版** の Vue.js を使用します。
Lodash（ユーティリティ用ライブラリ） と axios（HTTP 通信用ライブラリ） も使用することがあるため、あらかじめ読み込んでおいても問題ありません。

- [Lodash ドキュメント](https://lodash.com/)
- [axios ドキュメント GitHub](https://github.com/axios/axios)

<code-caption>vue.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

<code-caption>lodash.min.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"></script>
```

<code-caption>axios.min.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.17.1/dist/axios.min.js"></script>
```


### 学習用ファイルのひな形

<page-info page="36"></page-info>

<code-caption>index.html</code-caption>
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>Vue.js App</title>
  <link href="main.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <!-- この#appの内側にテンプレートを書き込んでいく -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

<code-caption>main.js</code-caption>
```js
var app = new Vue({
  el: '#app'
})
```

<code-caption>main.css</code-caption>
```css
/* StyleSheet */
```

### オンラインエディタを活用しよう

- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [CodeSandbox](https://codesandbox.io/)

## Vue.js の基本機能

<page-info page="38～42"></page-info>

### テキストのバインディング

<page-info page="38"></page-info>

```html
<p>{{ message }}</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
```

<demo-block demo="guide-ch1-demo01"/>

### 繰り返しの描画

<page-info page="39"></page-info>

```html
<ol>
  <li v-for="item in list">{{ item }}</li>
</ol>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    list: ['りんご', 'ばなな', 'いちご']
  }
})
```

<demo-block demo="guide-ch1-demo02"/>

### イベントの利用

<page-info page="40"></page-info>

```html
<button v-on:click="handleClick">Click</button>
```

```js
var app = new Vue({
  el: '#app',
  methods: {
    handleClick: function (event) {
      alert(event.target) // [object HTMLButtonElement]
    }
  }
})
```

<demo-block demo="guide-ch1-demo03"/>

### フォーム入力との同期

<page-info page="40"></page-info>

```html
<input v-model="message">
<p>{{ message }}</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: '初期メッセージ'
  }
})
```

<demo-block demo="guide-ch1-demo04"/>

### 条件分岐

<page-info page="41"></page-info>

```html
<button v-on:click="show=!show">切り替え</button>
<p v-if="show">Hello Vue.js!</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

<demo-block demo="guide-ch1-demo05"/>

### トランジション＆アニメーション

<page-info page="42"></page-info>

```html
<button v-on:click="show=!show">切り替え</button>
<transition>
  <p v-if="show">Hello Vue.js!</p>
</transition>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* opacity:0から1へのフェードイン＆フェードアウト */
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch1-demo06"/>
