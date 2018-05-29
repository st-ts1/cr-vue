<template>
<div>
  <comp-child val="これは子A"></comp-child>
  <comp-child val="これは子B"></comp-child>
</div>
</template>

<script>
export default {
  components: {
    compChild: {
      render(h) {
        return h('p', this.val)
      },
      props: ['val']
    }
  }
}
</script>
