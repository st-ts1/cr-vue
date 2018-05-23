<template>
  <div>
    <h3>通常</h3>
    <p>現在の選択値: {{ value1 }}</p>

    <MySelect v-model="value1" :options="options"/>

    <h3>オプション項目のカスタム</h3>
    <p>現在の選択値: {{ value2 }}</p>

    <MySelect v-model="value2" :options="options">
      <div slot-scope="{value, label, color}" :style="{ color: color }">
        ★ {{ label }}
      </div>
    </MySelect>

    <p>アイコンを付けたり、文字色やフォントファミリを変えたりなどなど…。</p>
    <button type="button" @click="onReset">選択をリセット</button>
  </div>
</template>

<script>
import MySelect from './MySelect.vue'
export default {
  components: { MySelect },
  data() {
    return {
      // フォームの選択値
      value1: '',
      value2: '',
      // フォームのオプションリスト
      options: [
        { value: 'OprionValue1', label: 'Option Label 1', color: '#0098c7' },
        { value: 'OprionValue2', label: 'Option Label 2', color: '#ec617a' },
        { value: 'OprionValue3', label: 'Option Label 3', color: '#32a02c' },
        { value: 'OprionValue4', label: 'Option Label 4', color: '#32a02c' },
        { value: 'OprionValue5', label: 'Option Label 5', color: '#32a02c' },
      ]
    }
  },
  methods: {
    // フォームをリセット
    onReset() {
      this.value1 = ''
      this.value2 = ''
    }
  }
}
</script>
