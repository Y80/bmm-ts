import { NButton, NConfigProvider, NInput, NPopselect, NSpace } from 'naive-ui'
import { Search } from '@vicons/tabler'
import { computed, CSSProperties, reactive } from 'vue'

interface SearchConfigOption {
  value: string
  name: string
  icon: string
  getSearchUrl(question: string): string
}

const searchEngines: SearchConfigOption[] = [
  {
    value: 'baidu',
    name: '百度搜索',
    icon: 'http://cdn.gu13.cn/favicon/www.baidu.com.svg',
    getSearchUrl: (q) => 'https://baidu.com/s?wd=' + encodeURI(q),
  },
  {
    value: 'google',
    name: '谷歌搜索',
    icon: 'http://cdn.gu13.cn/favicon/www.google.com.ico',
    getSearchUrl: (q) => 'https://google.com/search?q=' + encodeURI(q),
  },
  {
    value: 'bing',
    name: '必应搜索',
    icon: 'http://cdn.gu13.cn/favicon/bing.com.ico',
    getSearchUrl: (q) => 'https://bing.com/search?q' + encodeURI(q),
  },
  {
    value: 'stack overflow',
    name: 'Stack Overflow',
    icon: 'http://cdn.gu13.cn/favicon/stackoverflow.com.png',
    getSearchUrl: (q) => 'https://stackoverflow.com/search?q=' + encodeURI(q),
  },
]

const style: CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto 100px',
  display: 'flex',
  lineHeight: '1.3',
}

export default function SearchBox() {
  const state = reactive({
    engine: searchEngines[0].value,
    icon: searchEngines[0].icon,
    question: '',
  })

  const currentEngineConfig = computed(() => {
    const rst = searchEngines.find((item) => item.value === state.engine)
    if (!rst) throw new Error('搜索配置有误')

    return rst
  })

  function handleChangeEngine(value: string) {
    state.engine = value
    state.icon = searchEngines.find((itme) => itme.value === value)?.icon!
  }

  function handleSearch() {
    window.open(currentEngineConfig.value.getSearchUrl(state.question))
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
        clearable
        placeholder="搜点什么？"
        value={state.question}
        onUpdateValue={(v) => (state.question = v)}
        onBlur={() => (state.question = state.question.trim())}
        v-slots={{
          prefix: () => (
            <NPopselect
              value={state.engine}
              onUpdateValue={handleChangeEngine}
              trigger="click"
              placement="bottom-start"
              options={searchEngines.map((item) => {
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
              style={{ margin: '0 -6px 0 6px' }}
              round
              onClick={handleSearch}
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
