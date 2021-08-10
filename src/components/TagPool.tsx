import { NButton, NIcon, NSpace, NTag, NThing } from 'naive-ui'
import { CSSProperties, defineComponent, PropType } from 'vue'
import { Tag, ArrowRight } from '@vicons/tabler'
import store from '../store'

const style: CSSProperties = {
  backgroundColor: '#eee',
  borderRadius: '8px',
  margin: '1rem 0',
  padding: '1rem 0.5rem',
}

export default defineComponent({
  props: {
    onTagClick: {
      required: true,
      type: Function as PropType<(tagId: number) => void>,
    },
    onMangerClick: {
      required: true,
      type: Function as PropType<() => void>,
    },
  },

  setup(props) {
    return () => (
      <NThing style={style}>
        {{
          avatar: () => (
            <NIcon size="25">
              <Tag />
            </NIcon>
          ),
          header: () => '标签池',
          'header-extra': () => (
            <NButton
              bordered={false}
              size="small"
              iconPlacement="right"
              onClick={props.onMangerClick}
            >
              {{
                default: '管理标签',
                icon: () => (
                  <NIcon size="16">
                    <ArrowRight></ArrowRight>
                  </NIcon>
                ),
              }}
            </NButton>
          ),
          default: () => (
            <NSpace>
              {store.state.tags.map((tag) => (
                <NButton text onClick={() => props.onTagClick(tag.id)}>
                  <NTag round style={{ cursor: 'pointer' }}>
                    {tag.name}
                  </NTag>
                </NButton>
              ))}
            </NSpace>
          ),
        }}
      </NThing>
    )
  },
})
