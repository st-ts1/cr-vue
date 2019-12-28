Vue.component('my-select', {
    // template: '<div>'
    //     + '<label v-for="label in mysoptions">'
    //     + '<input type="radio" v-model="current" v-bind:value="label.value">{{ label.label }}'
    //     + '</label>'
    //     + '</div>',
    template: '<div>'
    + '<el-radio-group v-model="current" size="medium" v-for="label in mysoptions">'
    +'<el-radio-button v-bind:label="label.value">{{ label.label }}</el-radio-button>'
    +'</el-radio-group>'
    +'</div>',
    props: ['mysoptions', 'myscurrent'],
    
    data: function() {
        return {
            current: this.myscurrent
        }
    },
    watch: {
        current: function(newval, oldval) {
            console.log("watch newval:"+String(newval))
            this.$emit('updatecurrent', newval)
        }
    }
})