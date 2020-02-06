import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import Miligram from 'milligram'
import Vmodal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(Miligram)
Vue.use(Vmodal)

new Vue({
  render: h => h(App),
}).$mount('#app')
