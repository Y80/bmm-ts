import { NButton, NConfigProvider, NInput, NInputGroup, NPopselect, NSpace } from 'naive-ui'
import { Search } from '@vicons/tabler'
import { CSSProperties } from 'vue'

const searchEngineOptions = [
  { value: 'baidu', name: '百度搜索', icon: 'http://cdn.gu13.cn/favicon/bz.zzzmh.cn.ico' },
  { value: 'bing', name: '必应搜索', icon: 'http://cdn.gu13.cn/favicon/bing.com.ico' },
]

const style: CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto 100px',
  display: 'flex',
}

export default function SearchBox() {
  return (
    <NConfigProvider themeOverrides={{ Popover: { padding: '0' } }}>
      <NInputGroup style={style}>
        <NPopselect
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
            header: () => '选择搜索引擎',
            default: () => (
              <NButton
                v-slots={{
                  icon: () => <img src="http://cdn.gu13.cn/favicon/bing.com.ico" />,
                }}
              />
            ),
            trigger: () => '123',
          }}
        ></NPopselect>
        <NInput placeholder="搜点什么？" />
        <NButton
          ghost
          type="primary"
          v-slots={{
            default: () => '搜索',
            icon: () => <Search />,
          }}
        />
      </NInputGroup>
    </NConfigProvider>
  )
}
