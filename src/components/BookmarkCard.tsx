import { NButton, NCard, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'
import { Edit, TrashOff } from '@vicons/tabler'
import { IBookmark } from '../interface'

interface Props {
  onRemove: (id: number) => void
  onEdit: (id: number) => void
}

export default defineComponent<Props>({
  setup(props) {
    return () => (
      <NCard
        size="small"
        hoverable
        style={{ width: '230px' }}
        v-slots={{
          header: () => (
            <NTooltip
              placement="top-start"
              v-slots={{
                trigger: () => <span style={{ cursor: 'pointer' }}>谷歌搜索</span>,
                default: () => '一些网站介绍文字一些网站介绍文字一些网站介绍文字一些网站介绍文字',
              }}
            />
          ),
          'header-extra': () => (
            <NSpace>
              <NButton
                text
                v-slots={{
                  icon: () => (
                    <NIcon>
                      <Edit />
                    </NIcon>
                  ),
                }}
              />
              <NButton
                text
                type="error"
                v-slots={{
                  icon: () => (
                    <NIcon>
                      <TrashOff />
                    </NIcon>
                  ),
                }}
              />
            </NSpace>
          ),
          default: () => (
            <NSpace
              size="small"
              wrap={false}
              style={{ overflow: 'scroll' }}
              itemStyle={{ marginRight: '5px' }}
            >
              {['tag1', 'tag2', 'tag3', 'tag4', 'tag5'].map((item) => (
                <NTag round size="small">
                  {item}
                </NTag>
              ))}
            </NSpace>
          ),
        }}
      />
    )
  },
})
