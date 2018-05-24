# ToDoリストを作りながら学習しよう！

このチュートリアルでは、書籍の CHAPTER 1～4 で解説しているいろいろな機能を使って、ToDo リストを作成します。
チュートリアルの流れから、Vue.js の基本機能が何を行ってくれるのか？を知ることができるようになっています。

## 完成形

次のような ToDo リストを作成します。

- ToDo の追加・削除
- 作業中・完了の作業状態の切りかえ
- 作業状態ごとの表示の絞り込み

<code-caption>画面のイメージ</code-caption>
![todo-image](/images/todo/todo-image.png)

ローカルストレージを使っているため、保存したデータを他の端末から見ることはできません。

## ファイルを準備しよう

使用するファイルは「index.html」「main.js」「main.css」の3つのファイルと、CDN からスタンドアロン版の Vue.js ファイルを読み込みます。

- [index.html](#完全な-html)
- [main.js](/demo/tutorial-todo/main.js)
- [main.css](/demo/tutorial-todo/main.css)

CSS の説明はしていないため、コピペして使用してください。

ページレイアウトは次のとおりです。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue.js App</title>
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <div id="app">
    <!-- 絞り込みラジオボタン -->
    <!-- ToDo テーブル -->
    <!-- 新規登録フォーム -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

## STEP1 インスタンスの作成

まずは、アプリケーションを紐付ける要素 `#app` を作成します。

<code-caption>index.html</code-caption>
```html
<body>
  <div id="app">
    <!-- ここにテンプレートを書いていく -->
  </div>
</body>
```

コンストラクタ関数 `Vue` を使ってルートインスタンスを作成します。
アプリケーションで使用したいデータは `data` オプションへ登録していきます。

<code-caption>main.js</code-caption>
```js
const app = new Vue({
  el: '#app',
  data: {
    // 使用するデータ
  },
  methods: {
    // 使用するメソッド
  }
})
```

`data` オプションへ登録したデータはすべてリアクティブデータに変換されます。

## STEP2 ローカルストレージ API の使用

データはサーバーではなく「ローカルストレージ」へ保存することにします。
ストレージ周りの実装は Vue.js 公式サンプル「[TodoMVC の例](https://jp.vuejs.org/v2/examples/todomvc.html)」のコードを使用させていただきます。

```js
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
```

この公式のコードの内容については詳しく説明しませんが、これは `Storage API` を使ったデータの取得・保存の処理だけを抜き出したものです。
小さなライブラリだと思ってください。
なぜ、こういった処理の抜き出しをするかは、書籍 SHAPTER7 のコラム（219ページ）で説明しています。
特に手を加える必要はないため、このコードは `main.js` ファイルの一番上の方に加えておきましょう。

実際にストレージに保存されるデータのフォーマットは、次のような JSON です。

```json
[
  { "id": 1, "comment": "新しいToDo1", "state": 0 },
  { "id": 2, "comment": "新しいToDo2", "state": 0 }
]
```

## STEP3 データの構想

さあ、ここから実際に作るコードです！

どんなデータが必要になりそうかを、ざっくりと考えておきましょう。

- ToDo のリストデータ
  - 要素の固有ID
  - コメント
  - 今の状態
- 作業中・完了・すべて などオプションラベルで使用する名称リスト
- 現在絞り込みしている作業状態

アプリケーションに付けたい機能から考えると、こんなところでしょうか。

## STEP4 リスト用テーブル

まずは、ToDo リストデータを表示するテーブルの枠組みを作成します。

```html
<div id="app">
  <table>
    <!-- テーブルヘッダー -->
    <thead>
      <tr>
        <th class="id">ID</th>
        <th class="comment">コメント</th>
        <th class="state">状態</th>
        <th class="button">-</th>
      </tr>
    </thead>
    <tbody>
      <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
    </tbody>
  </table>
</div>
```

## STEP5 リストレンダリング

ToDo リストデータ用の空の配列を `data` オプションへ登録します。

これは、データが何もない時でも配列として認識されるようにするためと、もともと `data` オプション直下のデータは後から追加ができないため初期値で宣言しておく必要があるためです。

```js
var app = new Vue({
  el: '#app',
  data: {
    todos: []
  }
})
```

テーブルタグの [1] で配列要素の数だけ繰り返し表示させるには、対象となるタグ（ ここでは `<tr>` タグ ）に `v-for` ディレクティブを使用します。

```html
<!-- ここに <tr> で ToDo の要素を1行づつ繰り返し表示 -->
<tr v-for="item in todos" v-bind:key="item.id">
  <!-- 要素の情報 -->
</tr>
```

ディレクティブの値は JavaScript の式になっており次のように書きます。

```
v-for="各要素の一時的な名前 in 繰り返したい配列やオブジェクト"
```

`v-for` を記述したタグとその内側で `todos` データの各要素のプロパティが使用できるようになります。
`<tr>` タグの内側に「ID」「コメント」「状態変更ボタン」「削除ボタン」のカラムを追加していきましょう。

```html
<tbody>
  <!-- ここに <tr> で ToDo の要素を1行づつ繰り返し表示 -->
  <tr v-for="item in todos" v-bind:key="item.id">
    <th>{{ item.id }}</th>
    <td>{{ item.comment }}</td>
    <td class="state">
      <!-- 状態変更ボタンのモック -->
      <button>{{ item.state }}</button>
    </td>
    <td class="button">
      <!-- 削除ボタンのモック -->
      <button>削除</button>
    </td>
  </tr>
</tbody>
```

このボタンはまだなにも機能しないモックのため、機能はこれから実装していきます。

<page-info page="70">リストデータの表示と更新</page-info>

## STEP6 フォーム入力値の取得

新しい ToDo をリストへ追加するための入力フォームを作成します。

`ref` 属性を使って参照するための名前をタグに付けておくと、その DOM に直接アクセスできます。

```html
<input type="text" ref="comment">
```

`ref` 属性で名前を付けたタグは、メソッド内から次のように使用できます。

```js
this.$refs.名前
```

テンプレートでは変数名（プロパティ名）だけでデータを使用できましたが、メソッド内でデータやメソッドを使用するときは `this` を付ける必要があります。

たとえば、`comment` の場合なら次のように使用します。

```js
this.$refs.comment.value
```

実際は、次の STEP7 で使用します。

`v-model` ディレクティブを使えばデータとフォーム入力を同期することもできますが、今回は、入力したデータを画面に表示させないのと常にデータとして持っている必要がないため、この `$refs` を使って入力値を取得することにします。

```html
  <!-- ToDoリストテーブル -->
  </tbody>
</table>

<h2>新しい作業の追加</h2>
<form class="add-form" v-on:submit.prevent="doAdd">
  <!-- コメント入力フォーム -->
  コメント <input type="text" ref="comment">
  <!-- 追加ボタンのモック -->
  <button type="submit">追加</button>
</form>
```

テーブルの下あたりに追加しておきます。

```html
v-on:submit.prevent="doAdd"
```

この `v-on` ディレクティブによって、ボタンをクリックしたり入力フォームでエンターを押してフォームのサブミットが行われると、それをハンドリングして `doAdd` メソッドが呼び出されるようになります。

<page-info page="85">$refs</page-info>
<page-info page="105">v-model</page-info>
<page-info page="96">イベントハンドリング v-on</page-info>

## STEP7 リストへの追加

つづいて `doAdd` メソッドを定義しましょう。

このメソッドは、フォームの入力値を取得して新しい ToDo の追加処理をします。
ルートコンストラクタの `methods` オプションに、メソッドを登録します。

```js
new Vue({
  // ...
  methods: {
    // ToDo 追加の処理
    doAdd: function(event, value) {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      // フォーム要素を空にする
      comment.value = ''
    }
  }
})
```

ちょっと長くなりましたが、`$refs` を使っている以外は普段使っている JavaScript の構文と同じです。
コメントと一緒に1行づつ読んでみてください。

通常の配列メソッド `push` を使うだけで、リストデータへ追加できます。

## STEP8 ストレージへの保存の自動化

さて、JavaScript 内ではデータは追加されましたが、これではまだローカルストレージに保存されていません。
ブラウザをリロードしたら消えてしまいます。

`doAdd` メソッドの最後に `todoStorage.save` メソッドを使って保存してもよいのですが、追加・削除・作業状態の変更すべて同じ処理をしなければいけません。

`todos` データの内容が変わると、自動的にストレージへ保存してくれたら素敵ですね。
これは `watch` オプションの「ウォッチャ」機能を使うことで可能です。
ウォッチャはデータの変化に反応して、あらかじめ登録しておいた処理を自動的に行います。

```js
watch: {
  監視するデータ: function(newVal, oldVal) {
    // 変化した時に行いたい処理      
  }
}
```

```js
new Vue({
  // ...
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  }
})
```

これで、`todos` データに何か変化があれば、自動的にストレージへ保存されるようになりました。

<page-info page="128">ウォッチャ watch</page-info>


## STEP9 保存されたリストを取得しよう

ストレージへの保存ができたので、次はストレージからの取得です。
このアプリケーションの「インスタンス作成時」に、ローカルストレージに保存されているデータを「**自動的**」に取得して、Vue.js のデータとして読み込みましょう。
**特定のタイミングに何か処理をはさみたい**ときは「**ライフサイクルフック**」のメソッドを使用します。

タイミングがいくつか用意されていますが、今回の「インスタンス作成時」には `created` メソッドを使うとよいでしょう。

```js
new Vue({
  // ...
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  }
})
```

データの取得には、先に作っておいた `todoStorage` オブジェクトの `fetch` メソッドを使用します。

ライフサイクルメソッドの定義は「`methods` の中ではない」ことに注意してください。

ローカルストレージは Ajax と違い同期的に結果を取得できるため、返り値を代入すればいいだけなので簡単です！

<page-info page="45">ライフサイクルフック</page-info>

## STEP10 状態の変更と削除の処理

つづいて「状態の変更」と「削除」機能を実装しましょう。
`methods` オプションにそれぞれのメソッドを作成します。

### doChangeState メソッド（状態変更）

`item.state` の値を反転します。

### doRemove メソッド（削除）

インデックスを取得して配列メソッドの `splice` を使って削除します。

どちらも引数として、要素の参照を渡しています。

```js
new Vue({
  // ...
  methods: {
    // ...
    // 状態変更の処理
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    // 削除の処理
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})
```

まだモックの状態だった、状態変更ボタンのイベントをハンドルします。

```html
<button v-on:click="doChangeState(item)">
  {{ item.state }}
</button>
```

つづいて削除ボタンもハンドルします。
「削除」は注意するべき操作のため、キー修飾子 `.ctrl` を使って「**コントロールキーを押しながらクリック**」しなければ呼び出されないようにします。

```html
<button v-on:click.ctrl="doRemove(item)">
  削除
</button>
```

## STEP11 選択用フォームの作成

特定の作業状態のリストのみを表示させる「絞り込み機能」を追加しましょう。

スローガンテキストの下にラジオボタンをリストで表示します。
ToDo リストと同じように動的に作成するため、選択肢の `options` リストを作成しました。

```js
data: {
  // ...
  options: [
    { value: -1, label: 'すべて' },
    { value: 0,  label: '作業中' },
    { value: 1,  label: '完了' }
  ],
  // 選択している options の value を記憶するためのデータ
  // 初期値を「-1」つまり「すべて」にする
  current: -1
}
```

`options` リストを `<label>` タグで繰り返し描画して、内側の `<input>` タグの `value` 属性には、データ側の `label.value` データをバインドします。

```html
<label v-for="label in options">
  <input type="radio"
    v-model="current"
    v-bind:value="label.value">{{ label.label }}
</label>
```

`v-model` ディレクティブを使って、ラジオボタンの選択値と `current` データを同期させます。
ラジオボタンが変更されると、その要素の `label.value` が `current` プロパティへ代入される仕組みです。

<page-info page="105">フォーム入力バインディング v-model</page-info>

## STEP12 リストの絞り込み機能

`current` データの選択値によって、表示させる ToDo リストの内容を振り分けるため「算出プロパティ」という機能を使用します。
算出プロパティはデータから別の新しいデータを作成する関数型のデータです。

定義方法は、`computed` オプションに、加工したデータを返すメソッドを登録します。
算出プロパティは、元になったデータに変更があるまで、結果を**キャッシュする**という性質を持っています。

```js
new Vue({
  // ...
  computed: {
    computedTodos: function() {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    }
  }
})
```

定義方法が違うだけで、使い方はデータと一緒です。
一覧表示テーブルの `v-for` ディレクティブで使用している `todos` の部分を `computedTodos` に置き換えましょう。

<code-caption>変更前</code-caption>
```html
<tr v-for="item in todos" v-bind:key="item.id">
```

<code-caption>変更後</code-caption>
```html
<tr v-for="item in computedTodos" v-bind:key="item.id">
```

たとえば「◯件見つかりました」という結果の要素数を表示したいとき、単純にその配列の `computedTodos.length` を見れば欲しい数字が得られます。

```
{{ computedTodos.length }} 件を表示中
```

キャッシュ機能があるおかげで、メソッドと違い何度使用しても処理は 1 度しか行われません。

<page-info page="120">算出プロパティ computed</page-info>

## STEP13 文字列の変換処理

最後の仕上げとして「状態変更ボタン」のラベルが数字になっているのを修正しましょう。

状態変更ボタンで使っている状態の `item.state` データは、文字列そのものではなく「キー」になる数字を保存しています。
一般的にもカテゴリーなどのデータでは、こういった数字や短い英数字のキーの状態で保存されます。
しかし、このままでは、作業中なら「0」完了なら「1」と表示され、まったく意味がわかりません。

絞り込みのセレクトボックス用の `options` データをもとに、`value` から `label` へ変換するための `labels` 算出プロパティを作成します。

```js
computed: {
  labels() {
    return this.options.reduce(function(a, b) {
      return Object.assign(a, { [b.value]: b.label })
    }, {})
    // キーから見つけやすいように、次のように加工したデータを作成
    // {0: '作業中', 1: '完了', -1: 'すべて'}
  }
}
```

Mustache で `labels` オブジェクトを通すように変更します。

```html
<button v-on:click="doChangeState(item)">
  {{ labels[item.state] }}
</button>
```

これで人が理解できる文字で表示されるようになりました。
このような文字の処理は、フィルタ機能を使っても同じように変換できます。

<page-info page="134">フィルタ</page-info>

## 完全な HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Vue.js App</title>
  <link rel="stylesheet" href="./main.css">
</head>
<body>

  <div id="app">
    <h1>チュートリアルToDoリスト</h1>

    <!-- ★STEP11 -->
    <label v-for="label in options" >
      <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </label>
      
    <!-- ★STEP12 -->
    （{{ computedTodos.length }} 件を表示）

    <!-- ★STEP4 リスト用テーブル -->
    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <!-- ★STEP5 ToDo の要素をループ -->
        <tr
          v-for="item in computedTodos"
          v-bind:key="item.id"
          v-bind:class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- ★STEP10 状態変更ボタン -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <!-- ★STEP10 削除ボタン -->
            <button v-on:click.ctrl="doRemove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※削除ボタンはコントロールキーを押しながらクリックして下さい</p>

    <!-- ★STEP6 -->
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <!-- コメント入力フォーム -->
      コメント <input type="text" ref="comment">
      <!-- 追加ボタンのモック -->
      <button type="submit">追加</button>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="./main.js"></script>
</body>
</html>
``` 
