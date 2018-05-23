<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <EditForm/>
  </div>
</template>
<script>
import store from './store'
// 子コンポーネントを読み込む
import EditForm from './components/EditForm'
export default {
  name: 'app',
  components: {
    EditForm
  },
  computed: {
    // ローカルの message とストアの message を同期
    message() {
      return store.getters.message
    }
  }
}
</script>
