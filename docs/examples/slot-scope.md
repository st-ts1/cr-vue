---
pageClass: custom-page-class
---

# スコープ付きスロットの応用例

オプションテンプレートをカスタマイズできる、自作のセレクトボックスの例です。

## デモ

<demo-block>
  <examples-slot-scope-index/>
</demo-block>

## 使用している主な機能

<page-info page="105">フォーム入力バインディング v-model</page-info>
<page-info page="146">コンポーネント</page-info>
<page-info page="169">スロット</page-info>
<page-info page="194">トランジション</page-info>
<page-info page="103">イベントハンドリング キー修飾子</page-info>

## ソースコード

- [リポジトリ](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/slot-scope)

<code-caption>MySelect.vue</code-caption>
{include:examples/slot-scope/MySelect.vue}

<code-caption>index.vue</code-caption>
{include:examples/slot-scope/index.vue}

## コメント

キーボード操作や、ウィンドウの領域に収まることを考慮すると、もう少し複雑になります。
特に自作にこだわらないなら、Element などの UI キットを利用するのもオススメです。
しかし、フォームはコンポーネントの学習に最適なので、作成してみるのもいいでしょう！
