---
sidebarDepth: 2
title: Vue.js＋Netlifyで自動デプロイ
---

# Netlifyへの自動デプロイをしよう

このチュートリアルでは、Vue CLI で作成したVue.jsのプロジェクトを、Netlify で手動デプロイおよび自動デプロイするまでの手順を説明します。

## Netlify とは？

静的サイト向けの高機能なホスティングサービスです。
Git のホスティングサービスと連携した自動デプロイ、SSL/HTTPS を無料で利用できます。
英語のサイトですが、直感的な作りになっているため Google 翻訳などを利用すれば問題なく使用できるでしょう。
特に、ポートフォリオなどの静的サイトには最適です。
ここでは、GitHub アカウントを使った登録方法を説明します。

ちなみに、このサイトも Netlify を使って公開されています！

## Netlify の登録

- [netlify トップページ](https://www.netlify.com/)
- [netlify Signup ページ](https://app.netlify.com/signup)

「signup」ページを開き、認証方法に「GitHub」を選択します。

<code-caption>キャプチャ2.1</code-caption>
<p align="center"><img src="/images/netlify/netlify-singup1.png"></p>

別ウィンドウで GitHub へ認証の許可を求める画面が表示されるので、内容に問題がなければ「Authorize」ボタンで承認します。
登録はこれで完了です。
管理画面を開いてみましょう。

- [netlify 管理画面トップページ](https://app.netlify.com/)

## ローカルビルドからのデプロイ

ローカルでビルドしたファイルを、Netlify に公開してみましょう。

### ビルドファイルを圧縮

あらかじめ、`dist` フォルダと `index.html` を選択して ZIP 形式で圧縮します。

<p align="center"><img src="/images/netlify/netlify-zip.png"></p>


### ZIP ファイルのアップロード

管理画面のトップページは、次のようになっています。
画面上にある点線で囲まれた枠に ZIP ファイルをドラッグすると、ワンステップでウェブサイトを公開できます。

<code-caption>キャプチャ2.2</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy1.png"></p>

ZIPファイルを、<span class="num">1</span> の点線のエリアにドラッグします。
少し待つと、次のような画面が表示されます。

<code-caption>キャプチャ2.3</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy2.png"></p>

### サイトの確認

<span class="num">2</span> の URL を開くと、ウェブサイトが公開されているのが確認できます。

<code-caption>キャプチャ2.4</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy3.png"></p>

## GitHub からの自動デプロイ

つづいて、GitHub のリポジトリと連携した自動デプロイをしてみましょう。

### リポジトリの作成

予め用意した GitHub のリポジトリに、Vue CLI で作成したプロジェクトをPushします。
好きな名前で作成してください。

<code-caption>キャプチャ2.8</code-caption>
<p align="center"><img src="/images/netlify/netlify-github1.png"></p>

ビルドファイルではなく、このキャプチャのようにプロジェクトルートからのソースコードの状態でリポジトリを作成します。

### 新しいサイトの作成

Netlify の管理画面トップの右上にある<span class="num">1</span> 「New site from Git」を選択します。

<code-caption>キャプチャ2.9</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy1.png"></p>

### Git ホスティングの選択

Git ホスティングサービスの選択画面で <span class="num">2</span> 「GitHub」を選択します。
認証方法が同じならそのままリポジトリ一覧を取得しますが、別の認証方法の場合は再度GitHub認証を求められる場合があります。

<code-caption>キャプチャ2.10</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy2.png"></p>

### リポジトリの選択

GitHubアカウントにあるリポジトリの一覧が取得されるので、Netlifyで公開したいリポジトリを選択しましょう。

<code-caption>キャプチャ2.11</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy3.png"></p>

### ビルド設定

次の画面で、ビルドコマンドとフォルダの設定をします。
<span class="num">4</span> のブランチは基本「master」ですが、特定のブランチを公開したい場合は変更します。

<code-caption>キャプチャ2.12</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy4.png"></p>


<span class="num">5</span> のビルドコマンドは、ローカルでのビルドと同じものを設定します。

```
npm run build
```

<span class="num">6</span> の公開ディレクトリは、`index.html` のあるフォルダを指します。
デフォルトの設定では、`dist` フォルダの中に `index.html` が作成されるため、次のように設定します。

```
dist
```

Vue CLI で作成された `package.json` や webpack の設定を編集していなければ、この状態でデプロイできます。

### ビルド

初回ビルドはモジュールのインストールに時間がかかるためゆっくり待ちましょう。
ビルドログから今何をしているか確認することもできます。

<p align="center"><img src="/images/netlify/netlify-complete-deploy.png"></p>

ビルドが終わると、ページの上部に <span class="num">7</span> 「Preview deploy」というリンクが表示されます。
公開されたサイトを確認してみましょう！
画面は静的サイトをアップロードしたものと同じなので省略します。
一度設定したあとは、連携している GitHub のリポジトリに Push するだけで、差分を取得して自動的にデプロイをします。

## サイトの削除

サイトを削除したい場合は、「キャプチャ2.3」「<span class="num">3</span> Site settings」ページを開き、下の方にある「Delete Site」から完全に削除できます。

<code-caption>キャプチャ2.5</code-caption>
<p align="center"><img src="/images/netlify/netlify-delete.png"></p>

## サブドメインの変更

デフォルトではランダムな長い URL になっていますが、これはサイト名を変えることで好きな文字に変更できます。
「キャプチャ2.3」「<span class="num">4</span> Domain settings」のページを開き、「Cutom Domain」の「…」から「Edit site name」を選択します。

<code-caption>キャプチャ2.6</code-caption>
<p align="center"><img src="/images/netlify/netlify-rename1.png"></p>

すでに使用されていなければ、好きなサブドメインに変更できます。

<code-caption>キャプチャ2.7</code-caption>
<p align="center"><img src="/images/netlify/netlify-rename2.png"></p>

ここでは詳しくは説明しませんが、独自ドメインの設定も可能です。


最近では、紹介したような高機能なホスティングサービスや、バックエンドサービスが数多く提供されています。
こういったサービスを利用することで、Vue.js で作成したアプリケーションを手軽にウェブ上に公開できます。

