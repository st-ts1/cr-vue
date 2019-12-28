Vue.component('menuheader', {
    // template: '<el-row>'
    //     + '<el-col v-bind:span="24"><h1>チュートリアルToDoリスト</h1></el-col>'
    //     + '</el-row>',
        template: '<el-menu v-bind:default-active="activeIndex" mode="horizontal" v-on:select="handleselect">'
        + '<el-menu-item index="1">チュートリアルToDoリスト</el-menu-item>'
        + '<el-menu-item index="2">メニューテスト</el-menu-item>'
        + '</el-menu>',
    data: function () {
        return {
            activeIndex: 1
        }
    },
    methods: {
        handleselect: function(key, keyPath) {
            console.log("menu handleSelect key:"+key+" keyPath:"+keyPath);
          }
    }
})