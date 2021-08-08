import { defineComponent } from 'vue'
import { NButton, NButtonGroup, NDataTable, NDrawer, NDrawerContent, NSpace, NTag } from 'naive-ui'
import TagManager from './TagManager'

export default defineComponent({
  setup() {},

  render() {
    return (
      <NDrawer show placement="right" width="600">
        <NDrawerContent title="标签管理">
          <TagManager />
        </NDrawerContent>
      </NDrawer>
    )
  },
})
