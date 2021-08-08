import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import Index from './Index'

export default defineComponent({
  render() {
    return (
      <NConfigProvider locale={zhCN} dateLocale={dateZhCN}>
        <Index />
      </NConfigProvider>
    )
  },
})
