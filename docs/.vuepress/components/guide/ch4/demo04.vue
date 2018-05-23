<template>
  <div>
    <p>算出プロパティ</p>
    <ol>
      <li>{{ computedData }}</li>
      <li>{{ computedData }}</li>
    </ol>
    <p>メソッド</p>
    <ol>
      <li>{{ methodsData() }}</li>
      <li>{{ methodsData() }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    computedData: function() { return Math.random() }
  },
  methods: {
    methodsData: function() { return Math.random() }
  }
}
</script>

<style scoped>

</style>
