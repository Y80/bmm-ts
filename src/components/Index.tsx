import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import TagManager from './TagManager'
import TagPool from './TagPool'
import BookmarkCard from './BookmarkCard'

export default defineComponent({
  setup() {
    window.$message = useMessage()

    return () => (
      <>
        <TagManager />
        <TagPool />
        <BookmarkCard />
      </>
    )
  },
})
