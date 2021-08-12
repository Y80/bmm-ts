import { NButton, NCard, NConfigProvider, NEllipsis, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import { Edit, TrashOff, Plus } from '@vicons/tabler'
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
      <NConfigProvider
        themeOverrides={{
          Button: { textColorText: '#8f8f8f' },
          Card: { titleTextColor: '#333' },
        }}
      >
        <NCard
          class={styles.bookmarkCard}
          hoverable
          v-slots={{
            header: () => (
              <NTooltip
                placement="top-start"
                displayDirective="if"
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
                <NButton
                  size="tiny"
                  v-show={!props.dataSource.tags.length}
                  onClick={() => props.onEdit(props.dataSource)}
                >
                  {{
                    default: () => '添加标签',
                    icon: () => (
                      <NIcon>
                        <Plus />
                      </NIcon>
                    ),
                  }}
                </NButton>
              </NSpace>
            ),
          }}
        />
      </NConfigProvider>
    )
  },
})
