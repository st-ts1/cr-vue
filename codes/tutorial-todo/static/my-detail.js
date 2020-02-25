Vue.component('my-detail', {
    template: `<div>
    <el-button v-on:click="save()">保存</el-button>
    <el-input type="textarea" :rows="2" placeholder="Please input" v-model="my_detail_prop">
    </div>`,
    props: ['my_detail_prop'],
    methods: {
        save: function() {
            console.log("my-detail.js save function:"+this.my_detail_prop)
            this.$emit('updatedetail', this.my_detail_prop)
        }
    }
});