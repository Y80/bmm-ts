import { FormInst, FormRules, NForm, NFormItem, NInput, NModal, NSpace, NTag } from 'naive-ui'
import { defineComponent, ref, reactive, watch } from 'vue'
import { IBookmark, ITag } from '../interface'
import store from '../store'
import BookmarkAPI from '../api/bookmark'

interface Props {
  show: boolean
  dataSource?: IBookmark
  onClose(): any
}

const formRules: FormRules = {
  name: { required: true, message: '请输入书签名称', trigger: ['blur', 'input'] },
  url: { required: true, message: '请输入书签网址', trigger: ['blur', 'input'] },
}

export default defineComponent<Props>({
  setup(props) {
    const isEdit = ref(!!props.dataSource)
    const modal = reactive({
      title: isEdit.value ? '编辑书签' : '添加书签',
      loading: false,
    })
    const formRef = ref<FormInst>()
    const formModel = reactive({
      name: '',
      url: '',
      description: '',
      favicon: '',
    })
    const tags = ref<Array<ITag & { checked: boolean }>>([])

    watch(
      () => store.state.tags,
      () => {
        tags.value = store.state.tags.map((tag) => ({ ...tag, checked: false }))
      }
    )

    async function handleSubmit() {
      await formRef.value?.validate()
      const payload = {
        ...formModel,
        tagIds: tags.value.filter((tag) => tag.checked).map((tag) => tag.id),
      }
      modal.loading = true
      const promise = isEdit.value
        ? BookmarkAPI.update({
            id: props.dataSource?.id as unknown as number,
            ...payload,
          })
        : BookmarkAPI.add(payload)
      promise
        .then(() => {
          props.onClose()
        })
        .finally(() => {
          modal.loading = false
        })
    }

    return () => (
      <NModal
        title={modal.title}
        loading={modal.loading}
        show={props.show}
        preset="dialog"
        positiveText="提交"
        onPositiveClick={handleSubmit}
        onClose={props.onClose}
      >
        <NForm
          model={formModel}
          ref={formRef}
          rules={formRules}
          labelPlacement="left"
          labelWidth="70"
        >
          <NFormItem label="名称" path="name">
            <NInput v-model={[formModel.name, 'value']} />
          </NFormItem>
          <NFormItem label="网址" path="url">
            <NInput v-model={[formModel.url, 'value']} />
          </NFormItem>
          <NFormItem label="图标地址" path="favicon">
            <NInput v-model={[formModel.favicon, 'value']} />
          </NFormItem>
          <NFormItem label="描述" path="description">
            <NInput type="textarea" v-model={[formModel.description, 'value']} />
          </NFormItem>
          <NFormItem label="关联标签" path="tags">
            <NSpace>
              {tags.value.map((tag) => (
                <NTag key={tag.name} checkable v-model={[tag.checked, 'checked']}>
                  {tag.name}
                </NTag>
              ))}
            </NSpace>
          </NFormItem>
        </NForm>
      </NModal>
    )
  },
})
