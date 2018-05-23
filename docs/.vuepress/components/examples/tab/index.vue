<template>
  <div class="example">
    <div class="tabs">
      <TabItem
        v-for="item in list"
        v-bind="item" :key="item.id" :current="current"
        @select="current=item"/>
    </div>
    <div class="contents">
      <transition>
        <section class="item" :key="current.id">
          {{ current.content }}
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import TabItem from './TabItem.vue'
export default {
  components: { TabItem },
  data() {
    return {
      current: {},
      list: [
        { id: 1, label: 'Tab1', content: 'コンテンツ1' },
        { id: 2, label: 'Tab2', content: 'コンテンツ2' },
        { id: 3, label: 'Tab3', content: 'コンテンツ3' }
      ]
    }
  },
  created() {
    this.current = this.list[0]
  }
}
</script>

<style scoped>
.contents {
  position: relative;
  overflow: hidden;
  width: 280px;
  border: 2px solid #000;
}
.item {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  transition: all 0.8s ease;
}
/* トランジション用スタイル */
.v-leave-active {
  position: absolute;
}
.v-enter {
  transform: translateX(-100%);
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
