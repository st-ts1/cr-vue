<template>
  <button @click="$emit('select')" :class="[active, 'tab']">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    id: Number,
    label: String,
    current: Object
  },
  computed: {
    active() {
      return this.current.id === this.id ? 'active' : false
    }
  }
}
</script>

<style scoped>
.tab {
  border-radius: 2px 2px 0 0;
  background: #fff;
  color: #311d0a;
  line-height: 24px;
}
.tab:hover {
  background: #eeeeee;
}
.active {
  background: #f7c9c9;
}
</style>
