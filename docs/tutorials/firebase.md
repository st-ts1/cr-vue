---
sidebarDepth: 2
title: Vue.js＋Firebaseで認証付きチャット
---

# 認証付きの簡易チャットを作る！

このチュートリアルでは、SNS 認証と Firebase を使って、認証付きの簡単なチャットアプリケーションを作成する手順を紹介します。
Vue.js 以外に、次のサービスを利用します。

- **Firebase** ユーザー管理とリアルタイムデータベースを利用します
- **Twitter** アプリケーション認証を利用します

Google アカウントおよび Twitter アカウントは、すでに取得していることを前提とします。
また、Twitter アプリケーションを作成するためには、使用する Twitter アカウントで電話番号を登録している必要があります。

## Firebase とは？

Google が運営するソーシャルログインやリアルタイムデータベースの機能を提供するサービスです。
認証やデータ管理のためのバックエンドシステムを用意する必要がなくなり、フロントエンドの開発に専念することができます。

一定の容量・転送量までは無料で利用できます。
様々な機能が提供されていますが、ここでは「Authentication」と「Database」のみを使用します。
リアルタイムデータベースは、クライアント側から API へ問い合わせをしなくても、更新があるとデータベースから新しいデータを送信してくるといった機能です。

## Firebase プロジェクトのセットアップ

まずは、Firebase のプロジェクトと、Twitter の認証用アプリケーションをセットアップします。

- [Firebase トップページ](https://firebase.google.com/?hl=ja)

### プロジェクトの追加

- [Firebase コンソール](https://console.firebase.google.com/?hl=ja)

<code-caption>キャプチャ1.1</code-caption>
<p align="center"><img src="/images/firebase/firebase1.png"></p>

コンソールから、プロジェクトを追加します。
プロジェクト名には、好きな名前を付けてください。

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
簡単なアプリケーションなので、ルームなどは作らず `message` という階層のみを定義して、ユーザーの名前とプロフィール画像の URL もこれに含めることにします。

```json
{
  "rules": {
    // デフォルトの読み書きはすべて拒否
    ".read": false,
    ".write": false,
    "message": {
      ".read": true,           // 読み込みは誰でも可能
      ".write": "auth != null" // 書き込みは認証が必要
    }
  }
}
```

## Vue.js で Firebase を利用する

Vue.js で Firebase を利用したアプリケーションを作成します。

### Firebase の初期化

`firebase` モジュールをインストールして `main.js` で読み込みます。

```
npm install firebase
```

<code-caption>src/main.js</code-caption>

```js
import firebase from 'firebase'
```

Firebase の「Authentication」ページの右上にある「ウェブ設定」をクリックすると、次のようなコードが表示されます。

<code-caption>キャプチャ1.7</code-caption>
<p align="center"><img src="/images/firebase/firebase-websetting.png"></p>

スクリプト部分だけを、`main.js` に貼り付けます。

<code-caption>src/main.js</code-caption>
```js
var config = {
  apiKey: "AIza....",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP.firebaseio.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "123456789"
}
firebase.initializeApp(config)
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
  this.user = user ? user : null
})
```

この API を使ってコンポーネントを作成します。

### チャットコンポーネントの定義

入力した「メッセージ」と、ユーザー情報の「名前」および「プロフィール画像」を、Firebase の `message` オブジェクトへ追加しましょう。

<code-caption>src/components/chat.vue</code-caption>
```html
<div class="chat">
  <h1>Chat</h1>
  <!-- ログイン時にはフォームとログアウトボタンを表示 -->
  <div v-if="user" key="login">
    [{{ user.displayName }}]
    <button type="button" @click="doLogout">ログアウト</button>
    <form action="" @submit.prevent="doSend">
      <input v-model="input">
    </form>
  </div>
  <!-- 未ログイン時にはログインボタンを表示 -->
  <div v-else key="logout">
    <button type="button" @click="doLogin">ログイン</button>
  </div>
  <!--　Firebaseから取得したリストをトランジションでカッコよく描画　-->
  <transition-group name="chat" tag="ul" class="chat-list">
    <li v-for="{ key, name, image, message } in chat" :key="key">
      <span><img :src="image" width="40" height="40"></span>
      <span class="name">{{ name }}</span>
      <span class="message">{{ message }}</span>
    </li>
  </transition-group>
</div>
```

<code-caption>src/components/chat.vue</code-caption>
```js
import firebase from 'firebase'
export default {
  data() {
    return {
      user: null, // ユーザー情報
      chat: [],   // 取得したメッセージを入れる配列
      input: ''   // 入力したメッセージ
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null
    })
    // データベースに新しい要素が追加されると随時呼び出される
    firebase.database().ref('message').on('child_added', snap => {
      const message = snap.val()
      // 受け取ったメッセージを配列の先頭に挿入する
      this.chat.unshift({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
    })
  },
  methods: {
    doSend() {
      if (this.input.length) {
        // データベースにメッセージを追加
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => { this.input = '' }) // フォームを空にする
      }
    },
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    doLogout() {
      firebase.auth().signOut()
    }
  }
}
```

<code-caption>チャット画面のイメージ</code-caption>
<p align="center"><img src="/images/firebase/firebase-image.png"></p>

Firebase と Vue.js を使えば、これだけのコードでリアルタイムに更新されるチャットのプロトタイプが作成できました。
