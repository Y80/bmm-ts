import { defineComponent, reactive, ref } from 'vue'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSpace,
  useMessage,
  useDialog,
  NSpin,
  NEmpty,
} from 'naive-ui'
import TagManager from './TagManager'
import TagPool from './TagPool'
import BookmarkCard from './BookmarkCard'
import BookmarkModal from './BookmarkModal'
import { IBookmark } from '../interface'
import BookmarkAPI from '../api/bookmark'

export default defineComponent({
  setup() {
    window.$message = useMessage()
    window.$dialog = useDialog()

    const showTagManger = ref(false)
    const bookmarks = ref<IBookmark[]>([])
    const bookmarkModal = reactive<{ show: boolean; dataSource?: IBookmark }>({
      show: false,
      dataSource: undefined,
    })
    const loadingBookmarks = ref(false)

    function getBookmarks(tagId?: number) {
      loadingBookmarks.value = true
      BookmarkAPI.query(tagId)
        .then((data) => {
          bookmarks.value = data
        })
        .finally(() => {
          loadingBookmarks.value = false
        })
    }
    getBookmarks()
    function handleRemoveBookmark(bookmark: IBookmark) {
      const dialog = window.$dialog.warning({
        content: `确定要删除书签【${bookmark.name}】吗？`,
        positiveText: '确定',
        onPositiveClick() {
          dialog.loading = true
          BookmarkAPI.remove(bookmark.id).then(() => {
            getBookmarks()
            dialog.destroy()
          })
          // 默认不关闭确认框
          return false
        },
      })
    }
    function openBookmarkModal(dataSource?: IBookmark) {
      bookmarkModal.dataSource = dataSource
      bookmarkModal.show = true
    }

    return () => (
      <>
        <TagManager
          show={showTagManger.value}
          onClose={() => {
            showTagManger.value = false
            getBookmarks()
          }}
        />
        <TagPool onMangerClick={() => (showTagManger.value = true)} onTagClick={getBookmarks} />
        <NSpace style={{ margin: '1em 0' }}>
          <NButton type="primary" onClick={() => openBookmarkModal()}>
            添加书签
          </NButton>
        </NSpace>
        <NSpin show={loadingBookmarks.value} style={{ minHeight: '50px' }}>
          <NSpace>
            {bookmarks.value.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                dataSource={bookmark}
                onEdit={openBookmarkModal}
                onRemove={handleRemoveBookmark}
              />
            ))}
          </NSpace>
          <NEmpty
            v-show={!bookmarks.value.length && !loadingBookmarks.value}
            style={{ marginTop: '5em' }}
            description="没有获取到书签数据"
          />
        </NSpin>
        <BookmarkModal
          show={bookmarkModal.show}
          dataSource={bookmarkModal.dataSource}
          onClose={() => (bookmarkModal.show = false)}
          onSuccess={getBookmarks}
        />
      </>
    )
  },
})
