import { NButton, NConfigProvider, NInput, NPopselect, NSpace } from 'naive-ui'
import { Search } from '@vicons/tabler'
import { CSSProperties, reactive, ref } from 'vue'

const searchEngineOptions = [
  {
    value: 'baidu',
    name: '百度搜索',
    icon: 'http://cdn.gu13.cn/favicon/bz.zzzmh.cn.ico',
    generateSearchUrl: (q: string) => 'https://baidu.com/s?wd=' + encodeURI(q),
  },
  {
    value: 'bing',
    name: '必应搜索',
    icon: 'http://cdn.gu13.cn/favicon/bing.com.ico',
    generateSearchUrl: (q: string) => 'http://bing.com/search?q' + encodeURI(q),
  },
]

const style: CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto 100px',
  display: 'flex',
}

export default function SearchBox() {
  const state = reactive({
    engine: searchEngineOptions[0].value,
    icon: searchEngineOptions[0].icon,
  })

  function handleChangeEngine(value: string) {
    state.engine = value
    state.icon = searchEngineOptions.find((itme) => itme.value === value)?.icon!
  }

  return (
    <NConfigProvider
      themeOverrides={{
        Popover: { padding: '0', space: '12px' },
        Input: { paddingMedium: '0' },
        InternalSelectMenu: { optionPaddingMedium: '0 36px 0 12px' },
      }}
    >
      <NInput
        style={style}
        size="large"
        round
        placeholder="搜点什么？"
        v-slots={{
          prefix: () => (
            <NPopselect
              value={state.engine}
              onUpdateValue={handleChangeEngine}
              trigger="click"
              placement="bottom-start"
              options={searchEngineOptions.map((item) => {
                return {
                  value: item.value,
                  label: () => (
                    <NSpace align="center">
                      <img style={{ display: 'block' }} src={item.icon} width={24} />
                      <span>{item.name}</span>
                    </NSpace>
                  ),
                }
              })}
              v-slots={{
                default: () => (
                  <NButton
                    text
                    size="large"
                    style="margin: 0 8px 0 2px"
                    v-slots={{
                      icon: () => <img src={state.icon} />,
                    }}
                  />
                ),
              }}
            />
          ),
          suffix: () => (
            <NButton
              bordered={false}
              size="small"
              type="primary"
              style={{ marginRight: '-6px' }}
              round
              v-slots={{
                default: () => '搜索',
                icon: () => <Search />,
              }}
            />
          ),
        }}
      />
    </NConfigProvider>
  )
}
