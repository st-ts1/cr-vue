# Canvas の組み込み

## デモ

<client-only>
<demo-block>
  <examples-canvas-index/>
</demo-block>
</client-only>

## ソースコード

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/canvas)

<code-caption>index.vue</code-caption>
{include:examples/canvas/index.vue}

<code-caption>MyCanvas.vue</code-caption>
{include:examples/canvas/MyCanvas.vue}

ライフサイクルの `mounted` 以降で `$el` や `$refs` などを使ってアクセスしましょう。
