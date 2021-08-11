import { NButton, NCard, NEllipsis, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import { Edit, TrashOff } from '@vicons/tabler'
import { IBookmark } from '../interface'
import * as styles from '../styles.css'

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
        class={styles.bookmarkCard}
        hoverable
        v-slots={{
          header: () => (
            <NTooltip
              placement="top-start"
              v-slots={{
                trigger: () => (
                  <span onClick={() => window.open(props.dataSource.url)}>
                    {props.dataSource.name}
                  </span>
                ),
                default: () =>
                  props.dataSource.name +
                  (props.dataSource.description && `: ${props.dataSource.description}`),
              }}
            />
          ),
          'header-extra': () => (
            <NSpace size={[5, 0]} align="center">
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
            <NSpace size={[5, 0]} wrap={false} class={styles.tagsBox}>
              {props.dataSource.tags.map((tag) => (
                <NTag size="small" key={tag.id}>
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
