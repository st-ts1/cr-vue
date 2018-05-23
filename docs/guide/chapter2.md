---
sidebarDepth: 2
title: CHAPTER 2
---

# CH2 データの登録と更新

## テキストと属性のデータバインディング

<page-info page="54～66"></page-info>

### オブジェクトや配列要素の表示

<page-info page="55"></page-info>

```html
<!-- 1 オブジェクトのプロパティを表示 -->
<p>{{ message.value }}</p>
<!-- 2 文字列の長さを表示 -->
<p>{{ message.value.length }}</p>
<!-- 3 リストのインデックス2を表示 -->
<p>{{ list[2] }}</p>
<!-- 4 プロパティを組み合わせて使用 -->
<p>{{ list[num] }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    // オブジェクトデータ
    message: {
      value: 'Hello Vue.js!'
    },
    // 配列データ 3 と 4 で使用
    list: ['りんご', 'ばなな', 'いちご'],
    // 別のデータを使用してlistから取り出す要素を動的に 4 で使用
    num: 1
  }
})
```

### クリックでカウンターを増やそう

<page-info page="59"></page-info>

```html
<div id="app">
  <!-- countプロパティを表示する -->
  <p>{{ count }}回クリックしたよ！ </p>
  <!-- このボタンをクリックするとincrementメソッドが呼び出される -->
  <button v-on:click="increment">カウントを増やす</button>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    // ボタンをクリックしたときのハンドラ
    increment: function () {
      this.count += 1 // 処理は再代入するだけでOK！
    }
  }
})
```

<demo-block demo="guide-ch2-demo01"/>

### クラスとスタイルのデータバインディング

<page-info page="62"></page-info>

```html
<button v-on:click="isActive=!isActive">isActiveを切り替える</button>
<p v-bind:class="{ child: isChild, 'is-active': isActive }" class="item">
  動的なクラス
</p>
<p v-bind:style="{ color: textColor, backgroundColor: bgColor }" class="item">
  動的なスタイル
</p>
```

```js
new Vue({
  el: '#app',
  data: {
    isChild: true,
    isActive: true,
    textColor: 'red',
    bgColor: 'lightgray'
  }
})
```

```css
.item {
  padding: 4px 8px;
  transition: background-color 0.4s;
}
.is-active {
  background: #ffeaea;
}
```

<demo-block demo="guide-ch2-demo02"/>

### SVGのデータバインディング

<page-info page="65"></page-info>

```html
<div id="app">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="75" v-bind:r="radius" fill="lightpink" />
  </svg>
  <input type="range" min="0" max="100" v-model="radius">
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    radius: 50
  }
})
```

<demo-block demo="guide-ch2-demo03"/>

::: tip
もしも、受け取った `radius` の値を**数値データ型として**数式に使用する場合は `.number` 修飾子を使用しましょう。

```html
<input type="range" min="0" max="100" v-model.number="radius">
```

:::


## リストデータの表示と更新

<page-info page="70～84"></page-info>


### 要素を繰り返し描画する

「繰り返し描画しながら、さまざまな条件を適用する」の部分も一緒にまとめています。

<page-info page="70～74"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="item in list"
      v-bind:key="item.id"
      v-bind:class="{ tuyoi: item.hp > 300 }">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp > 300">つよい！</span>
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  }
})
```

<demo-block demo="guide-ch2-demo04"/>

::: tip

テンプレート中の `item.hp > 300` というような条件に一致するかを調べる式は、メソッドや算出プロパティにすると分かりやすくなり、保守もしやすくなります。

ちなみに、ディレクティブの式の部分は、その要素を包含しているコンポーネントの仮想 DOM に変化があったとき、毎回呼び出されます。（`v-on` はコールバック関数なので除く）
書籍で説明しているカスタムディレクティブの動作と同じで、<mark>直接関係のないデータに変化があったときにも</mark>呼び出されます。

<code-caption>毎回 isTuyoi() を呼ぶ</code-caption>
```
<li v-for="item in list" v-if="isTuyoi(item.hp)" ...>
```

<code-caption>毎回 1+1 をする</code-caption>
```
{{ 1+1 }}
```

多くの状態に依存しているコンポーネントでは、無駄な処理が発生しやすくなるため注意しましょう！
なるべく算出プロパティや `v-once` を活用したり、一定の単位でコンポーネントに分割するのがオススメです。

:::

### リストに要素を追加しよう

<page-info page="75"></page-info>

```html
<div id="app">
  <!-- このフォームの入力値を新しいモンスターの名前に使う -->
  名前
  <input v-model="name">
  <button v-on:click="doAdd">モンスターを追加</button>
  <ul>
    <li v-for="item in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    name: 'キマイラ',
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  },
  methods: {
    // 追加ボタンをクリックしたときのハンドラ
    doAdd: function () {
      // リスト内で1番大きいIDを取得
      var max = this.list.reduce(function (a, b) {
        return a.id > b.id ? a.id : b.id
      }, 0)
      // 新しいモンスターをリストに追加
      this.list.push({
        id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
        name: this.name, // 現在のフォームの入力値
        hp: 500
      })
    }
  }
})
```

<demo-block demo="guide-ch2-demo05"/>

### リスト要素を削除しよう

<page-info page="77"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <!-- 削除ボタンをv-for内に作成 -->
      <button v-on:click="doRemove(index)">モンスターを削除</button>
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  },
  methods: {
    // 要素を削除ボタンをクリックしたときのハンドラ
    doRemove: function (index) {
      // 受け取ったインデックスの位置から1個要素を削除
      this.list.splice(index, 1)
    }
  }
})
```

<demo-block demo="guide-ch2-demo06"/>

### リスト要素プロパティを更新しよう

<page-info page="81"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id" v-if="item.hp">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp < 50">瀕死！</span>
      <!-- ボタンはv-for内に作成 -->
      <button v-on:click="doAttack(index)">攻撃する</button>
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  },
  methods: {
    // 攻撃ボタンをクリックしたときのハンドラ
    doAttack: function (index) {
      this.list[index].hp -= 10 // HPを減らす
    }
  }
})
```

<demo-block demo="guide-ch2-demo07"/>

### 外部からデータを取得する

<page-info page="83"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    // あらかじめ空リストを用意しておく
    list: []
  },
  created: function () {
    axios.get('list.json').then(function (response) {
      // 取得完了したらlistリストに代入
      this.list = response.data
    }.bind(this)).catch(function (e) {
      console.error(e)
    })
  }
})
```

## DOMを直接参照する$elと$refs

<page-info page="85"></page-info>

### $elや$refsは一時的な変更！

<page-info page="86"></page-info>

```html
<div id="app">
  <button v-on:click="handleClick">カウントアップ</button>
  <button v-on:click="show=!show">表示/非表示</button>
  <span ref="count" v-if="show">0</span>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  },
  methods: {
    handleClick() {
      var count = this.$refs.count
      if (count) {
        count.innerText = parseInt(count.innerText, 10) + 1
      }
    }
  }
})
```

## テンプレート制御ディレクティブ

<page-info page="88"></page-info>

### v-cloak

<page-info page="91"></page-info>

```html
<div id="app" v-cloak>
  {{ message }}
</div>
```

```css
@keyframes cloak-in {
  0% {
    opacity: 0;
  }
}
#app {
  animation: cloak-in 1s;
}
#app[v-cloak] {
  opacity: 0;
}
```
