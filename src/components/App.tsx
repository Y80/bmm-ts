import {
  dateZhCN,
  NConfigProvider,
  NDialogProvider,
  NLayout,
  NLayoutContent,
  NMessageProvider,
  zhCN,
} from 'naive-ui'
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
          <NDialogProvider>
            <NLayout>
              <NLayoutContent
                contentStyle={{ padding: '1rem', maxWidth: '1000px', margin: '0 auto' }}
              >
                <Index />
              </NLayoutContent>
            </NLayout>
          </NDialogProvider>
        </NMessageProvider>
      </NConfigProvider>
    )
  },
})
