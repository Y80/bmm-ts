import { NButton, NCard, NConfigProvider, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { defineComponent, PropType, ref, watchEffect } from 'vue'
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
    const imgSrc = ref('')

    watchEffect(() => {
      imgSrc.value = props.dataSource.favicon || 'http://cdn.gu13.cn/favicon/default.svg'
    })

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
              <>
                <img
                  style={{ display: 'block', borderRadius: '2px' }}
                  src={imgSrc.value}
                  alt="favicon"
                  width={20}
                  onError={() => (imgSrc.value = 'http://cdn.gu13.cn/favicon/img_fail.svg')}
                />
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
              </>
            ),
            'header-extra': () => (
              <NSpace size={[5, 0]} align="center" wrap={false}>
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
