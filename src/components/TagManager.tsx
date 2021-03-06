import { Plus } from '@vicons/tabler'
import {
  NDataTable,
  NButton,
  NSpace,
  NPopconfirm,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NDrawer,
  NDrawerContent,
  FormInst,
  NSpin,
  NIcon,
} from 'naive-ui'
import { TableColumn } from 'naive-ui/lib/data-table/src/interface'
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import TagAPI from '../api/tag'
import { ITag } from '../interface'

export default defineComponent({
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    onClose: {
      required: true,
      type: Function as PropType<() => void>,
    },
  },

  setup(props) {
    const store = useStore()
    const showSpin = ref(false)
    const formRef = ref<FormInst>(null as unknown as FormInst)
    const modal = reactive({
      show: false,
      title: '',
      loading: false,
      tagId: 0,
      formModel: { name: '' },
    })
    const columns: TableColumn<ITag>[] = [
      {
        title: '标签名称',
        key: 'name',
      },
      {
        title: '关联书签数量',
        key: 'bookmarkNum',
      },
      {
        title: '操作',
        key: 'action',
        render(row) {
          return (
            <NSpace>
              <NPopconfirm
                onPositiveClick={() => {
                  TagAPI.remove(row.id).then(refreshTagData)
                }}
                v-slots={{
                  default: () => `确定要删除标签【${row.name}】吗？`,
                  trigger: () => <NButton text>删除</NButton>,
                }}
              />
              <NButton text onClick={() => openModal(row)}>
                编辑
              </NButton>
            </NSpace>
          )
        },
      },
    ]

    function refreshTagData() {
      showSpin.value = true
      store.dispatch('getAllTags').finally(() => {
        showSpin.value = false
      })
    }
    function openModal(data?: ITag) {
      if (data) {
        modal.formModel.name = data.name
        modal.title = '编辑标签'
        modal.tagId = data.id
      } else {
        modal.formModel.name = ''
        modal.title = '创建标签'
        modal.tagId = 0
      }

      modal.show = true
    }
    async function handleSubmit() {
      await formRef.value.validate()
      modal.loading = true
      function add() {
        return TagAPI.add(modal.formModel)
      }
      function update() {
        return TagAPI.update({ ...modal.formModel, id: modal.tagId })
      }
      const promise = modal.tagId ? update() : add()
      promise
        .then(() => {
          refreshTagData()
          modal.show = false
        })
        .finally(() => {
          modal.loading = false
        })
    }

    watch(
      () => props.show,
      (value) => {
        if (value) refreshTagData()
      }
    )

    return () => (
      <>
        <NDrawer
          placement="right"
          width={store.state.isMobile ? '100%' : 600}
          show={props.show}
          onUpdateShow={(value) => !value && props.onClose()}
        >
          <NDrawerContent title="标签管理" closable>
            <NSpace align="center" justify="space-between" style={{ marginBottom: '.5em' }}>
              <span>当前有 {store.state.tags?.length} 个标签</span>
              <NButton type="primary" onClick={() => openModal()}>
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
            <NSpin show={showSpin.value}>
              <NDataTable size="small" columns={columns} data={store.state.tags} />
            </NSpin>
          </NDrawerContent>
        </NDrawer>

        <NModal
          title={modal.title}
          show={modal.show}
          preset="confirm"
          positiveText="确认"
          loading={modal.loading}
          onPositiveClick={handleSubmit}
          onClose={() => (modal.show = false)}
        >
          <NForm labelPlacement="left" ref={formRef} model={modal.formModel}>
            <NFormItem
              label="名称"
              path="name"
              rule={{ required: true, message: '请输入标签名称' }}
            >
              <NInput
                maxlength={15}
                showCount
                v-model={[modal.formModel.name, 'value']}
                placeholder="请输入标签名称"
              />
            </NFormItem>
          </NForm>
        </NModal>
      </>
    )
  },
})
