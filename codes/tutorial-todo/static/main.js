
// ★STEP2
// https://jp.vuejs.org/v2/examples/todomvc.html

// CDNのElementで日本語を使う
ELEMENT.locale(ELEMENT.lang.ja)

// ★STEP1
new Vue({
  el: '#app',

  data: {
    // ★STEP5 localStorage から 取得した ToDo のリスト
    todos: [],
    // ★STEP11 抽出しているToDoの状態
    current: -1,
    // ★STEP11＆STEP13 各状態のラベル
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],
    dialogVisible: false,
    dialogItem: {detail: ""}
  },

  computed: {

    // ★STEP12
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },

    // ★STEP13 作業中・完了のラベルを表示する
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  },

  // ★STEP8
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function (todos) {
        var vm = this;
        axios.post('/api/v1/save', todos )
        // thenで成功した場合の処理をかける
        .then(response => {
            console.log('status:', response.status); // 200
            console.log('body:', response.data);     // response body.
            if (response.status != 200) {
                vm.$message = "エラー " + response.status;
            } else {
                vm.$message('保存に成功');
            }
        })
        // catchでエラー時の挙動を定義する
        .catch(err => {
            console.log('axios err:', err);
            vm.$message('予期せぬエラー');

        });
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  // ★STEP9
  created() {
    // インスタンス作成時にflaskから読み込む する
    var vm = this;
    axios.get('/api/v1/load')
    // thenで成功した場合の処理をかける
    .then(response => {
        console.log('status:', response.status); // 200
        console.log(response.data);     // response body.
        if (response.status != 200) {
            //vm.message = "エラー " + response.status;
            vm.$message('読み込み失敗');
        } else {
            //vm.message = response.data;
            vm.$message('読み込み成功');
            //json_data = JSON.parse(response.data)
            vm.todos = response.data;
            console.log(vm.todos.length)
        }
    })
    // catchでエラー時の挙動を定義する
    .catch(err => {
        console.log('axios err:', err);
        vm.$message('ロード時に予期せぬエラー');
    });

  },

  methods: {

    // ★STEP7 ToDo 追加の処理
    doAdd: function(event, value) {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }
      var maxid=0;
      for (todo of this.todos) {
        console.log("find maxid todo:"+todo);
        if (maxid < todo.id) {
          maxid = todo.id;
        }
      }
      console.log("find maxid maxid:"+maxid);
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: maxid + 1,

        comment: comment.value,
        state: 0,
        detail: ""
      })
      // フォーム要素を空にする
      comment.value = ''
    },

    // ★STEP10 状態変更の処理
    doChangeState: function (item) {
      item.state = !item.state ? 1 : 0
    },

    // ★STEP10 削除の処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },

    updatecurrentfunc: function(num) {
			this.current = num;
    },
    handleClose: function() {
      console.log("handleClose")
      this.dialogVisible = false
    },
    showDialogDetail: function (item) {
      this.dialogVisible = true
      this.dialogItem = item
    },
    updatedetail_main_func(detial_str, dialogItem) {
      console.log("updatedetail_main_func detail_str:"+detial_str)
      dialogItem.detail = detial_str;
    }
  }
})
