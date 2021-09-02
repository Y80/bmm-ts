import { defineComponent, reactive, ref, watch } from 'vue'
import { NButton, NSpace, NSpin, NEmpty, NIcon } from 'naive-ui'
import TagManager from '../../components/TagManager'
import TagPool from '../../components/TagPool'
import BookmarkCard from '../../components/BookmarkCard'
import BookmarkModal from '../../components/BookmarkModal'
import { IBookmark } from '../../interface'
import BookmarkAPI from '../../api/bookmark'
import { Plus } from '@vicons/tabler'
import SearchBox from '../../components/SearchBox'
import classes from '../../style/index.module.css'
import Layout from '../../components/Layout'
import store from '../../store'

export default defineComponent({
  setup() {
    const showTagManger = ref(false)
    const bookmarks = ref<IBookmark[]>([])
    const bookmarkModal = reactive<{ show: boolean; dataSource: IBookmark | null }>({
      show: false,
      dataSource: null,
    })
    const loadingBookmarks = ref(false)
    const currentTagId = ref<number>()

    store.dispatch('getAllTags')

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
      const dialog = window.$dialog.create({
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
      <Layout>
        <SearchBox />
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
          <NButton type="primary" onClick={() => openBookmarkModal()} ghost>
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
          <div class={classes.bookmarkContainer}>
            {bookmarks.value.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                dataSource={bookmark}
                onEdit={openBookmarkModal}
                onRemove={handleRemoveBookmark}
              />
            ))}
          </div>
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
      </Layout>
    )
  },
})
