# 切り替えタブ

## デモ

<client-only>
<demo-block>
  <examples-tab-index/>
</demo-block>
</client-only>

あまり面白味がなかったので、トランジションでスライドっぽくしてみました。

## 使用している主な機能

<page-info page="62">クラスのデータバインディング</page-info>
<page-info page="64">複数の属性のデータバインディング</page-info>
<page-info page="120">算出プロパティ computed</page-info>
<page-info page="146">コンポーネント</page-info>
<page-info page="153">コンポーネント コンポーネント間の通信</page-info>
<page-info page="194">トランジション</page-info>

## ソースコード

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/tab)

<code-caption>index.vue</code-caption>
{include:examples/tab/index.vue}

<code-caption>TabItem.vue</code-caption>
{include:examples/tab/TabItem.vue}

::: tip タブ要素のコンポーネントで、自分がアクティブかを判断するには？

コンポーネントは、どんな状態にするか、何をすればいいのか、基本的に自分自身で判断できます。
このサンプルでは、親から渡されたプロパティ `currentId` を使って、自分の ID が現在選択されている要素の ID と一致するかを確認しています。

:::
