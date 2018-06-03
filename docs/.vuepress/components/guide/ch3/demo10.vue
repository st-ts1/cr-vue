<template>
  <div>
    <select v-model="val">
      <option disabled="disabled">選択してください</option>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </select>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: ''
    }
  }
}
</script>
