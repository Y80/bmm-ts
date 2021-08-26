import { createApp } from 'vue'
import App from './components/App'
import store from './store'
import router from './pages/router'
//www.npmjs.com/package/vfonts
import 'vfonts/FiraSans.css'
// import 'vfonts/FiraCode.css'
import './style/base.css'

createApp(App).use(store).use(router).mount('#app')

window.handleSuccessLogin = () => {
  console.log('你已登录成功！')
}
