import { createApp } from 'vue'
import App from './components/App'
import store from './store'
//www.npmjs.com/package/vfonts
import 'vfonts/FiraSans.css'
// import 'vfonts/FiraCode.css'
import './style/base.css'

createApp(App).use(store).mount('#app')
