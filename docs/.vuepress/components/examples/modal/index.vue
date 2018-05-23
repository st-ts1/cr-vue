<template>
  <div class="example-modal-window">
    <p>ボタンを押すとモーダルウィンドウが開きます</p>
    <button @click="openModal">開く</button>

    <!-- コンポーネント MyModal -->
    <MyModal @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <p>Vue.js Modal Window!</p>
      <div><input v-model="message"></div>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <template slot="footer">
        <button @click="doSend">送信</button>
      </template>
      <!-- /footer -->
    </MyModal>
  </div>
</template>

<script>
import MyModal from './MyModal.vue'
export default {
  components: { MyModal },
  data() {
    return {
      modal: false,
      message: ''
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        alert('メッセージを入力してください')
      }
    }
  }
}
</script>

