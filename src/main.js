import Vue from 'vue'
import App from './App'
import router from './router/router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/reset.css'
import '../static/css/public.css'
import '../static/js/font.js'
import Axios from 'axios'
Vue.prototype.axios = Axios
Vue.config.productionTip = false
Vue.use(MintUI)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    'App': App
  },
  template: '<App/>'
})
