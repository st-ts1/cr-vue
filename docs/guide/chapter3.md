---
sidebarDepth: 2
title: CHAPTER 3
---

# CH3 イベントとフォーム入力の受け取り

## S13 イベントハンドリング

<page-info page="96～104"></page-info>

### メソッドイベントハンドラ

<page-info page="96"></page-info>

```html
<button v-on:click="handleClick">クリック</button>
```

```js
new Vue({
  el: '#app',
  methods: {
    handleClick: function () {
      alert('クリックしたよ')
    }
  }
})
```

### フォーム入力の取得

<page-info page="98"></page-info>

```html
<input v-bind:value="message" v-on:change="handleInput">
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js',
  },
  methods: {
    handleInput: function (event) {
      // 代入前に何か処理を行う…
      this.message = event.target.value
    }
  }
})
```

### イベント修飾子

<page-info page="99"></page-info>

```html
<div v-on:click.right="handler">example</div>
<!-- 右ボタンを押した時のコンテキストメニューを表示させない -->
<div v-on:click.right.prevent="handler">example</div>
```

```js
new Vue({
  el: '#app',
  methods: {
    handler: function (comment) {
      console.log(comment)
    }
  }
})
```

### .stop

```html
<div v-on:click="handler('div1')">
  div1
  <a href="#top" v-on:click.stop="handler('div2')">div2</a>
</div>
```

### .prevent

```html
<div v-on:click="handler('div1')">
  div1
  <a href="#top" v-on:click.prevent="handler('div2')">div2</a>
</div>
```

### .capture

```html
<div v-on:click.capture="handler('div1')">
  div1
  <div v-on:click="handler('div2')">
    div2
    <div v-on:click="handler('div3')">div3</div>
  </div>
</div>
```

### .native

```html
<!-- コンポーネントをクリックするとハンドラが呼び出される -->
<my-component v-on:click.native="handler"></my-component>
<!-- コンポーネントをクリックしてもハンドラは呼び出されない -->
<my-component v-on:click="handler"></my-component>
```

## S14 フォーム入力バインディング

<page-info page="105～113"></page-info>

### 複数行テキスト

<page-info page="108"></page-info>

```html
<textarea v-model="message"></textarea>
<pre>{{ message }}</pre>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello!'
  }
})
```

### チェックボックス

<page-info page="108"></page-info>

#### 単一要素

```html
<label>
  <input type="checkbox" v-model="val"> {{ val }}
</label>
```

```js
new Vue({
  el: '#app',
  data: {
    val: true
  }
})
```

#### 複数要素

```html
<label><input type="checkbox" v-model="val" value="A"> A</label>
<label><input type="checkbox" v-model="val" value="B"> B</label>
<label><input type="checkbox" v-model="val" value="C"> C</label>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: []
  }
})
```

### ラジオボタン

<page-info page="110"></page-info>

```html
<label><input type="radio" value="a" v-model="val"> A</label>
<label><input type="radio" value="b" v-model="val"> B</label>
<label><input type="radio" value="c" v-model="val"> C</label>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: ''
  }
})
```

### セレクトボックス

<page-info page="110"></page-info>

#### 単一要素

```html
<select v-model="val">
  <option disabled="disabled">選択してください</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
```

```js
new Vue({
  el: '#app',
  data: {
    val: ''
  }
})
```

#### 複数要素

```html
<select v-model="val" multiple>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: []
  }
})
```

### 画像ファイル

<page-info page="111"></page-info>

```html
<input type="file" v-on:change="handleChange">
<div v-if="preview"><img v-bind:src="preview"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    preview: ''
  },
  methods: {
    handleChange: function (event) {
      var file = event.target.files[0]
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.preview = window.URL.createObjectURL(file)
      }
    }
  }
})
```

## S15 マウント要素外のイベントと操作

<page-info page="114～116"></page-info>

### スクロールイベントの取得

<page-info page="114"></page-info>

```js
new Vue({
  el: '#app',
  data: {
    scrollY: 0,
    timer: null
  },
  created: function () {
    // ハンドラを登録
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy: function () {
    // ハンドラを解除（コンポーネントやSPAの場合忘れずに！）
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 違和感のない程度に200ms間隔でscrollデータを更新する例
    handleScroll: function () {
      if (this.timer === null) {
        this.timer = setTimeout(function () {
          this.scrollY = window.scrollY
          clearTimeout(this.timer)
          this.timer = null
        }.bind(this), 200)
      }
    }
  }
})
```

### スムーススクロールの実装

<page-info page="115"></page-info>


```html
<script src="https://cdn.jsdelivr.net/npm/smooth-scroll@12.1.5"></script>
<div id="app">
  <div class="content">...</div>
  <div v-on:click="scrollTop">
    ページ上部へ移動
  </div>
</div>
```

```js
var scroll = new SmoothScroll()
new Vue({
  el: '#app',
  methods: {
    scrollTop: function () {
      scroll.animateScroll(0)
    }
  }
})
```

## COLUMN Vue.js以外からのイベントの受け取り

<page-info page="117"></page-info>

```html
<div id="app">
  <input id="message" v-on:input="handleInput">
  <button data-update="jQuery!">jQueryからの更新</button>
</div>
```

```js
$(document).on('click', '[data-update]', function () {
  $('#message').val($(this).attr('data-update'))
  // 入力値を更新したらイベントを発生させる
  $('#message')[0].dispatchEvent(new Event('input'))
})
new Vue({
  el: '#app',
  methods: {
    handleInput: function (event) {
      console.log(event.target.value)
    }
  }
})
```
