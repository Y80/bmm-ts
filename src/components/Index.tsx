import { defineComponent, ref } from 'vue'
import { NButton, NForm, NFormItem, NInput, NModal, NSpace, useMessage } from 'naive-ui'
import TagManager from './TagManager'
import TagPool from './TagPool'
import BookmarkCard from './BookmarkCard'
import BookmarkModal from './BookmarkModal'
import { IBookmark } from '../interface'
import BookmarkAPI from '../api/bookmark'

export default defineComponent({
  setup() {
    window.$message = useMessage()

    const showBookmarkModal = ref(false)
    const bookmarks = ref<IBookmark[]>([{ id: 24, name: '掘金', url: 'juejin.im', tags: [] }])

    BookmarkAPI.query().then((data) => {
      bookmarks.value.push(data[0])
      console.log(bookmarks.value)
    })

    return () => (
      <>
        <TagManager />
        <TagPool />
        <NSpace>
          {bookmarks.value.map((bookmark) => (
            <BookmarkCard key={bookmark.id} dataSource={bookmark} />
          ))}
        </NSpace>

        <NSpace>
          <NButton type="primary" onClick={() => (showBookmarkModal.value = true)}>
            添加书签
          </NButton>
        </NSpace>

        <BookmarkModal
          show={showBookmarkModal.value}
          onClose={() => (showBookmarkModal.value = false)}
        />
      </>
    )
  },
})
