Vue.component('my-select', {
    template: '<div>'
        + '<label v-for="label in mysoptions">'
        + '<input type="radio" v-model="current" v-bind:value="label.value">{{ label.label }}'
        + '</label>'
        + '</div>',
    props: ['mysoptions'],
    /* TODO: コンポーネントの双方向バインディングが理解出来ていない */
    data: function() {
        return {
            current: -1
        }
    },
    watch: {
        current: function(newval, oldval) {
            this.$emit('updatecurrent', newval)
        }
    }
})