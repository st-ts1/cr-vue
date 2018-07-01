---
sidebarDepth: 2
title: はじめに
---

# はじめに

## Vue.jsってどんなもの？

<page-info page="3"></page-info>

まずは、ほんの少しだけ Vue.js を体験してみましょう！

```html
<!DOCTYPE html>
<html>
<body>
<div id="app">
  <h1>{{ message }}</h1>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!'
    }
  })
</script>
</body>
</html>
```

この HTML は、適当なフォルダにファイルを作成して、そのままブラウザで開くだけでも動作します。
