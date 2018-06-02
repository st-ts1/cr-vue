---
sidebarDepth: 2
title: Vue.js＋Firebaseで認証付きチャット
---

# 認証付きの簡易チャットを作る！

このチュートリアルでは、SNS 認証と Firebase を使って、認証付きの簡単なチャットアプリケーションを作成する手順を紹介します。
Vue.js 以外に次のサービスを利用します。

- **Firebase** ユーザー管理と、リアルタイムデータベースを利用します
- **Twitter** アプリケーション認証を利用します

Google アカウントおよび Twitter アカウントは、すでに取得していることを前提とします。
また、Twitter アプリケーションを作成するためには、使用する Twitter アカウントで電話番号を登録している必要があります。

## Firebase とは？

Google が運営するソーシャルログインや、リアルタイムデータベースの機能を提供するサービスです。
認証やデータ管理のためのバックエンドシステムを用意する必要がなくなり、フロントエンドの開発に専念することができます。

一定の容量・転送量までは無料で利用できます。
様々な機能が提供されていますが、ここでは「Authentication」と「Database」のみを使用します。
リアルタイムデータベースは、クライアント側から API へ問い合わせをしなくても、データに更新があれば自動的に受信できる仕組みですです。

## Firebase プロジェクトのセットアップ

まずは、Firebase のプロジェクトと、Twitter の認証用アプリケーションをセットアップします。

- [Firebase トップページ](https://firebase.google.com/?hl=ja)

### プロジェクトの追加

- [Firebase コンソール](https://console.firebase.google.com/?hl=ja)

<code-caption>キャプチャ1.1</code-caption>
<p align="center"><img src="/images/firebase/firebase1.png"></p>

コンソールから、プロジェクトを追加します。
プロジェクト名には好きな名前を付けてください。

### 利用する認証方法を選択

<code-caption>キャプチャ1.2</code-caption>
<p align="center"><img src="/images/firebase/firebase2.png"></p>

プロジェクトのトップページの左メニューから「Authentication」を開き、「ログイン方法」タブを選択してプロバイダの一覧から「Twitter」を選択します。

### Twitter 認証の設定

<code-caption>キャプチャ1.3</code-caption>
<p align="center"><img src="/images/firebase/firebase3.png"></p>

右上にある「有効にする」をオンにします。
<span class="num">1</span> と <span class="num">2</span> の入力フォームには、のちほど作成する Twitter アプリの「[API キーの確認](#api-キーの確認)」（キャプチャ1.6）の画面に表示されるキーを入力します。

また、<span class="num">3</span> に表示されている URL も、のちほど作成する Twitter アプリの設定で使用するため、画面はこのままにしておくとよいでしょう。

## Twitter アプリのセットアップ

次に、Twitter で認証用アプリケーションを作成します。
次の URL をブラウザの別のタブで開き、画面中央の「Create New App」をクリックします。

- [Twitter Application Management](https://apps.twitter.com/)

### Twitter アプリの作成

アプリケーションの作成ページで「アプリケーション名」「説明」「Website」を設定して、<span class="num">4</span> の「CallbackURL」には「[Twitter 認証の設定](#twitter-認証の設定)」「キャプチャ1.3」<span class="num">3</span> の URL を貼り付けます。

<code-caption>キャプチャ1.4</code-caption>
<p align="center"><img src="/images/firebase/firebase4.png"></p>

「Website」は実際にアプリケーションを使用したり解説するページの URL を入力しますが、まだ用意していない場合は暫定で自分のサイトのトップページなどを入力しておき、後から変更することもできます。

### 権限の設定

作成後の画面の「Permissions」タブを選択し、Accessを「Read only」に変更します。
セキュリティ上、不要な権限は持たせないようにしましょう。
「Update Setting」ボタンで設定を更新します。

<code-caption>キャプチャ1.5</code-caption>
<p align="center"><img src="/images/firebase/firebase5.png"></p>

### API キーの確認

同じ画面の「Keys and Access Tokens」タブを選択し、<span class="num">5</span> 「Consumer Key (API Key)」と <span class="num">6</span> 「Consumer Secret (API Secret)」に表示されているキーを「[Twitter 認証の設定](#twitter-認証の設定)（キャプチャ1.3）」の Firebase の認証設定に貼り付けます。

<code-caption>キャプチャ1.6</code-caption>
<p align="center"><img src="/images/firebase/firebase6.png"></p>

設定を保存して Twitter アプリのセットアップは完了です。

## Firebase のルールの定義

Firebase のデータベースのアクセスルールを定義します。

<code-caption>キャプチャ1.7</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules01.png"></p>

「ロックモード」と「テストモード」を選択できますが、ここでは「ロックモード」を選択します。
進むと次のような画面が表示されます。

<code-caption>キャプチャ1.8</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules02.png"></p>

エディタの部分にルールを追加していきます。
次のルールは

- デフォルトは誰も読み書きできない
- ただし、`message` プロパティへの読み込みは認証しているユーザーなら OK
- ただし、`message` プロパティへの書き込みは認証しているユーザーなら OK

というルールです。


```json
{
  "rules": {
    // デフォルトの読み書きはすべて拒否
    ".read": false,
    ".write": false,
    "message": {
      ".read": "auth != null", // 読み込みは認証が必要
      ".write": "auth != null" // 書き込みは認証が必要
    }
  }
}
```

`message` プロパティの `.read` を `"auth != null"` ではなく `true` にすれば、見るだけなら認証していなくても OK というルールになります。どちらでも問題ありません。（キャプチャは読み込みを誰でも OK にしたもの）

<code-caption>キャプチャ1.9</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules03.png"></p>


簡単なアプリケーションなので、ルームなどは作らず `message` というプロパティのみを定義して、ユーザーの名前とプロフィール画像の URL もこれに含めることにしました。

## Vue.js で Firebase を利用する

Vue.js で Firebase を利用したアプリケーションを作成します。

### Firebase の初期化

`firebase` モジュールをインストールして `main.js` で読み込みます。

```bash
npm install firebase
```

<code-caption>src/main.js</code-caption>

```js
import firebase from 'firebase'
```

Firebase の「Authentication」ページの右上にある「ウェブ設定」をクリックすると、次のようなコードが表示されます。

<code-caption>キャプチャ1.10</code-caption>
<p align="center"><img src="/images/firebase/firebase-websetting.png"></p>

スクリプト部分だけを、`main.js` に貼り付けます。

<code-caption>src/main.js</code-caption>
```js
import firebase from 'firebase'
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIza....",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP.firebaseio.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "123456789"
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```


「apiKey」など直接ソースコードに含まれることになりますが、クライアントサイドアプリケーションではこのような使い方が前提とされています。
その代わり、「**キャプチャ1.2**」の「ログイン方法」タブの下にある「承認済みドメイン」で、ホワイトリストを設定しておきましょう。

### 認証処理

Firebase を使った認証処理の実装はとても簡単です。
まず、firebase モジュールの簡単な使い方を説明します。

#### ログインの仕方

初回ログイン時のみ、Twitter アプリケーション連携の確認画面が表示されます。
次の例は、認証画面をポップアップウィンドウで表示します。

<code-caption>Twitter 認証でログインの仕方</code-caption>
```js
const provider = new firebase.auth.TwitterAuthProvider()
firebase.auth().signInWithPopup(provider)
```

#### ログアウトの仕方

<code-caption>ログアウトの仕方</code-caption>
```js
firebase.auth().signOut()
```

Firebase のログイン状態の確認方法は、その都度呼び出すのではなく、ログイン状態が変わるとあらかじめ登録しておいたコールバック関数が自動的に呼び出されます。
`created` フックなどで一度オブザーバーを登録しておけば、リアルタイムに状態を更新します。

#### ログイン状態の確認の仕方

<code-caption>ログイン状態の確認の仕方</code-caption>
```js
// オブザーバーの登録
firebase.auth().onAuthStateChanged(user => {
  // ログイン状態ならuserが取得できる
  this.user = user ? user : {}
})
```

この API を使ってコンポーネントを作成します。

### チャットコンポーネントの定義

入力した「メッセージ」と、ユーザー情報の「名前」および「プロフィール画像」を、Firebase の `message` オブジェクトへ追加しましょう。

このサンプルは、改行のみを `<br>` タグに変化してくれる [vue-nl2br](https://github.com/inouetakuya/vue-nl2br) というコンポーネントも利用しています。（おいちゃんさん作）

```bash
npm install vue-nl2br
```

<code-caption>src/App.vue</code-caption>
```html
<template>
  <div id="app">
    <header class="header">
      <h1>Chat</h1>
      <!-- ログイン時にはフォームとログアウトボタンを表示 -->
      <div v-if="user.uid" key="login">
        [{{ user.displayName }}]
        <button type="button" @click="doLogout">ログアウト</button>
      </div>
      <!-- 未ログイン時にはログインボタンを表示 -->
      <div v-else key="logout">
        <button type="button" @click="doLogin">ログイン</button>
      </div>
    </header>

    <!--　Firebase から取得したリストを描画（トランジション付き）　-->
    <transition-group name="chat" tag="div" class="list content">
      <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
        <div class="item-image"><img :src="image" width="40" height="40"></div>
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message"/>
          </div>
        </div>
      </section>
    </transition-group>
  
    <!-- 入力フォーム -->
    <form action="" @submit.prevent="doSend" class="form">
      <textarea
        v-model="input"
        :disabled="!user.uid"
        @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" :disabled="!user.uid" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
// firebase モジュール
import firebase from 'firebase'
// 改行を <br> タグに変換するモジュール
import Nl2br from 'vue-nl2br'
export default {
  components: { Nl2br },
  data() {
    return {
      user: {},  // ユーザー情報
      chat: [],  // 取得したメッセージを入れる配列
      input: ''  // 入力したメッセージ
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      const ref_message = firebase.database().ref('message')
      if (user) {
        this.chat = []
        // message に変更があったときのハンドラを登録
        ref_message.limitToLast(10).on('child_added', this.childAdded)
      } else {
        // message に変更があったときのハンドラを解除
        ref_message.limitToLast(10).off('child_added', this.childAdded)
      }
    })
  },
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const message = snap.val()
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
      this.scrollBottom()
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.input = '' // フォームを空にする
        })
      }
    }
  }
}
</script>
```

長いため CSS は別ファイルにしました。[app.css](https://github.com/mio3io/cr-vue/blob/master/codes/firebase/app.css)

<code-caption>チャット画面のイメージ</code-caption>
<p align="center"><img src="/images/firebase/firebase-image.png"></p>

Firebase と Vue.js を使えば、これだけのコードでリアルタイムに更新されるチャットのプロトタイプが作成できました。

## コメント

まったくコンポーネントを分けていないので、正直なところ VueCLI を使っている意味があまりないのですが、実際にはメッセージアイテムや入力フォーム、メニューなどを細かく分けたり、Vuex を利用していくといいでしょう(๑'ᴗ'๑)

Firebase を利用するうえで一番大変なのはルールの定義なのですが（個人的感想）、入室パスワードを設定できるルームを作れるように拡張してみても面白いと思います。

より詳しくは、[Firebase のドキュメント](https://firebase.google.com/docs/?hl=ja)をご覧ください。
