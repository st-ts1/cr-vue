<template>
  <div class="example-loading example">
    <p><button @click="loadContent" :disabled="!list.length">コンテンツをリロード</button></p>
    <!-- ボーダー付きのラッパーレイヤー -->
    <div class="flexbox-wrapper" :style="{height: height+'px'}">
      <!-- トランジション ＆ $refs.body -->
      <transition>
        <component :is="current" :list="list" class="flexbox-body" ref="body"/>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BeforeLoadContent from './BeforeLoadContent.vue'
import AfterLoadContent from './AfterLoadContent.vue'
export default {
  data() {
    return {
      height: null,
      list: []
    }
  },
  // 算出プロパティ
  computed: {
    current() {
      return this.list.length ? AfterLoadContent : BeforeLoadContent
    }
  },
  // ウォッチャ
  watch: {
    list() {
      // nextTick
      this.$nextTick(() => {
        // $refs
        this.height = this.$refs.body.$el.getBoundingClientRect().height
      })
    }
  },
  methods: {
    loadContent() {
      this.list = []
      axios.get('/data/list.json').then(response => {
        setTimeout(() => {
          this.list = response.data
        }, 1500)
      })
    }
  },
  created() {
    this.loadContent()
  }
}
</script>

<style scoped>
.flexbox-wrapper {
  position: relative;
  border: 2px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  transition: height .4s;
}
.flexbox-body {
  padding: 16px;
}
/* トランジション用スタイル */
.v-enter-active, .v-leave-active {
  transition: opacity .4s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
