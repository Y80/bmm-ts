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
import { RouterView } from 'vue-router'
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
            textColor1: '#1F2225FF',
            textColor2: '#333639FF',
            textColor3: '#9EA4AAFF',
          },
          Layout: {
            color: '#f8f8f8',
          },
          Card: {
            borderRadius: '8px',
            borderColor: 'none',
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
            <RouterView />
          </NDialogProvider>
        </NMessageProvider>
      </NConfigProvider>
    )
  },
})
