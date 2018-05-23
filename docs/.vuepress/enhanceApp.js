//import Icon from 'vue-awesome/components/Icon.vue'
//const Icon = require('vue-awesome/components/Icon')
import CodeCaption from './components/code-caption.vue'
import PageInfo from './components/page-info.vue'
import DemoBlock from './components/demo-block.vue'
import ExerciseBlock from './components/exercise-block.vue'

export default ({
  Vue
}) => {
  //Vue.component('Icon', Icon)
  Vue.component('code-caption', CodeCaption)
  Vue.component('page-info', PageInfo)
  Vue.component('demo-block', DemoBlock)
  Vue.component('exercise-block', ExerciseBlock)
}
