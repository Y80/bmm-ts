import { dateZhCN, NConfigProvider, NMessageProvider, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import store from '../store'
import Index from './Index'

export default defineComponent({
  setup() {
    store.dispatch('getAllTags')
  },

  render() {
    return (
      <NConfigProvider locale={zhCN} dateLocale={dateZhCN}>
        <NMessageProvider>
          <Index />
        </NMessageProvider>
      </NConfigProvider>
    )
  },
})
