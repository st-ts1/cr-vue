# テキストアニメーション

## デモ

<demo-block>
  <examples-text-animation-index/>
</demo-block>

## 使用している主な機能

<page-info page="62">クラスのデータバインディング</page-info>

## ソースコード

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/text-animation)

<code-caption>index.vue</code-caption>
{include:examples/text-animation/index.vue}

### TextAnime1

文字数が少ない＆スタイルを組み合わせてアニメーションを作成する場合はこちらがオススメ。

<code-caption>TextAnime1.vue</code-caption>
{include:examples/text-animation/TextAnime1.vue}

固定の文字列なら、静的コンテンツとして埋め込んでしまってもよいでしょう。

### TextAnime2

文字数が多い＆可変の場合はこちらがオススメ。

<code-caption>TextAnime2.vue</code-caption>
{include:examples/text-animation/TextAnime2.vue}

### TextAnime3

キーが同じなら `v-move` が適用されるのを利用して、文字+文字ごとのインデックスを組み合わせたキーを生成しています。
文字数が多いと若干コストが高くなるため、インスタンス初期化とメッセージが編集されたとき、あらかじめ文字列を分解＆キーを生成しています。

<code-caption>TextAnime3.vue</code-caption>
{include:examples/text-animation/TextAnime3.vue}
