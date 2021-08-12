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
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        themeOverrides={{
          common: {
            primaryColor: '#8C5AEE',
            primaryColorHover: '#AB80FF',
            primaryColorPressed: '#7537EE',
            primaryColorSuppl: '#B995FF',
          },

          Card: {
            borderRadius: '8px',
          },
          Dialog: {
            borderRadius: '8px',
          },
          Modal: {},
          Tag: {
            color: '#e8eaed',
            border: 'none',
            borderRadius: '4px',
            textColor: '#262626',
            padding: '0 8px',
            heightSmall: '18px',
            fontSizeSmall: '12px',
          },
        }}
      >
        <NMessageProvider>
          <NDialogProvider>
            <NLayout>
              <NLayoutContent
                contentStyle={{
                  padding: '1rem',
                  maxWidth: '1000px',
                  margin: '0 auto',
                  backgroundImage: 'linear-gradient(180deg, white 30%,#eee8f5, white 30%)',
                }}
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
