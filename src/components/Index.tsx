import { defineComponent, reactive, ref, watch } from 'vue'
import { NButton, NSpace, useMessage, useDialog, NSpin, NEmpty, NIcon } from 'naive-ui'
import TagManager from './TagManager'
import TagPool from './TagPool'
import BookmarkCard from './BookmarkCard'
import BookmarkModal from './BookmarkModal'
import { IBookmark } from '../interface'
import BookmarkAPI from '../api/bookmark'
import { Plus } from '@vicons/tabler'

export default defineComponent({
  setup() {
    window.$message = useMessage()
    window.$dialog = useDialog()

    const showTagManger = ref(false)
    const bookmarks = ref<IBookmark[]>([])
    const bookmarkModal = reactive<{ show: boolean; dataSource: IBookmark | null }>({
      show: false,
      dataSource: null,
    })
    const loadingBookmarks = ref(false)
    const currentTagId = ref<number>()

    function getBookmarks() {
      loadingBookmarks.value = true
      BookmarkAPI.query(currentTagId.value)
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
        title: '删除书签',
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
      bookmarkModal.dataSource = dataSource || null
      bookmarkModal.show = true
    }

    watch(() => currentTagId.value, getBookmarks)

    return () => (
      <>
        <TagManager
          show={showTagManger.value}
          onClose={() => {
            showTagManger.value = false
            getBookmarks()
          }}
        />
        <TagPool
          currentTagId={currentTagId.value}
          onManagerClick={() => (showTagManger.value = true)}
          onTagClick={(tagId) => (currentTagId.value = tagId)}
        />
        <NSpace style={{ margin: '1em 0' }}>
          <NButton type="primary" onClick={() => openBookmarkModal()}>
            {{
              default: () => '添加书签',
              icon: () => (
                <NIcon>
                  <Plus />
                </NIcon>
              ),
            }}
          </NButton>
        </NSpace>
        <NSpin show={loadingBookmarks.value} style={{ minHeight: '50px' }}>
          <NSpace size={[25, 50]}>
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
