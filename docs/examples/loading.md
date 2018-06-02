# ローディングと高さのアニメーション

## デモ

<client-only>
<demo-block>
  <examples-loading-index/>
</demo-block>
</client-only>

## 使用している主な機能

<page-info page="120">算出プロパティ computed</page-info>
<page-info page="128">ウォッチャ watch</page-info>
<page-info page="143">nextTick</page-info>
<page-info page="146">コンポーネント</page-info>
<page-info page="185">動的コンポーネント</page-info>
<page-info page="194">トランジション</page-info>

## ソースコード

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/loading)

<code-caption>index.vue</code-caption>
{include:examples/loading/index.vue}

<code-caption>LoadContent.vue</code-caption>
{include:examples/loading/Loading.vue}

## コメント

Katashin さんの [vue-size-provider](https://github.com/ktsn/vue-size-provider) を利用すると、要素の高さを監視して簡単に高さのアニメーションを適用できます。
