# 実例集について

このページでは汎用的な UI のサンプルコードを掲載しています。
詳しい解説はありませんが、ぜひ参考にしてください。
Vue.js は比較的ルールがゆるく、機能を実装する手段がひとつとは限りません。
そのため、ベストプラクティス（一番よい実装方法）が提示されているケースもあります。

## 実例集のコードについて

実例集のコードはすべて、<mark>単一ファイルコンポーネント、ES2015+</mark> で記述しています。
単一ファイルコンポーネントを使用しない場合、ソースコードを次のように変更してください。

### ルートとなるコンポーネントのデータをオブジェクトに変更

<code-caption>変更前</code-caption>
```js
export default {
  components: { MyComponent },
  data() {
    return {
      foo: true
    }
  }
}
```

<code-caption>変更後</code-caption>
```js
new Vue({
  components: { 'my-component': MyComponent },
  data: {
    foo: true
  }
})
```

### コンポーネントのタグをそれぞれのオプションに変更

<code-caption>変更前</code-caption>
```vue
<template>
  <div class="my-component">
    ...
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: true
    }
  }
}
</script>
```

<code-caption>変更後</code-caption>
```js
var MyComponent = {
  template: '<div class="my-component">\
    ...\
  </div>',
  data() {
    return {
      bar: true
    }
  }
}
```

必要に応じて、その他、ES2015+ の記述を変更してください。
