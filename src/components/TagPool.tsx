import { NSpace, NTag } from 'naive-ui'
import { defineComponent } from 'vue'
import store from '../store'

export default defineComponent({
  setup() {
    return () => (
      <NSpace>
        {store.state.tags.map((tag) => (
          <NTag round>{tag.name}</NTag>
        ))}
      </NSpace>
    )
  },
})
