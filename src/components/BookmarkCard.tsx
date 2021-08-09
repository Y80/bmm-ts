import { NButton, NCard, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import { Edit, TrashOff } from '@vicons/tabler'
import { IBookmark } from '../interface'

interface Props {
  // dataSource: IBookmark
  // onRemove(id: number): void
  // onEdit(id: number): void
}

export default defineComponent({
  // props: ['dataSource'],
  props: {
    dataSource: Object,
  },

  setup(props) {
    console.log(props)

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
                trigger: () => <span style={{ cursor: 'pointer' }}>{props.dataSource?.name}</span>,
                default: () => props.dataSource?.description || props.dataSource?.name,
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
              {props.dataSource?.tags?.map((tag) => (
                <NTag round size="small" key={tag.id}>
                  {tag.name}
                </NTag>
              ))}
            </NSpace>
          ),
        }}
      />
    )
  },
})
