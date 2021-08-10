import { NButton, NCard, NEllipsis, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import { Edit, TrashOff } from '@vicons/tabler'
import { IBookmark } from '../interface'

export default defineComponent({
  props: {
    dataSource: {
      required: true,
      type: Object as PropType<IBookmark>,
    },
    onRemove: {
      required: true,
      type: Function as PropType<(bookmark: IBookmark) => void>,
    },
    onEdit: {
      required: true,
      type: Function as PropType<(bookmark: IBookmark) => void>,
    },
  },

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
                trigger: () => <span style={{ cursor: 'pointer' }}>{props.dataSource.name}</span>,
                default: () =>
                  props.dataSource.name +
                  (props.dataSource.description && `: ${props.dataSource.description}`),
              }}
            />
          ),
          'header-extra': () => (
            <NSpace>
              <NButton
                text
                onClick={() => props.onEdit(props.dataSource)}
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
                onClick={() => props.onRemove(props.dataSource)}
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
              {props.dataSource.tags.map((tag) => (
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
