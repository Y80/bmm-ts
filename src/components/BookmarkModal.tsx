import {
  FormInst,
  FormRules,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NSpace,
  NTag,
} from 'naive-ui'
import { defineComponent, ref, reactive, watch, PropType } from 'vue'
import { IBookmark, ITag } from '../interface'
import store from '../store'
import BookmarkAPI from '../api/bookmark'
import { Bookmarks } from '@vicons/tabler'

const formRules: FormRules = {
  name: { required: true, message: '请输入书签名称', trigger: ['blur', 'input'] },
  url: { required: true, message: '请输入书签网址', trigger: ['blur', 'input'] },
}
function getFormInitialValues() {
  return {
    name: '',
    url: '',
    description: '',
    favicon: '',
  }
}

export default defineComponent({
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    dataSource: {
      required: false,
      type: Object as PropType<IBookmark>,
    },
    onClose: {
      required: true,
      type: Function as PropType<() => any>,
    },
    onSuccess: {
      required: true,
      type: Function,
    },
  },

  setup(props) {
    const isEdit = ref(false)
    const modal = reactive({
      title: isEdit.value ? '编辑书签' : '添加书签',
      loading: false,
    })
    const formRef = ref<FormInst>()
    const formModel = reactive(getFormInitialValues())
    const tags = ref<Array<ITag & { checked: boolean }>>([])

    watch(
      () => store.state.tags,
      () => {
        tags.value = store.state.tags.map((tag) => ({ ...tag, checked: false }))
      },
      { immediate: true }
    )
    watch(
      () => props.show,
      (value) => {
        if (!value) return
        // 打开了 modal
        if (props.dataSource) {
          isEdit.value = true
          Object.assign(formModel, props.dataSource)
          const linkedTagIds = props.dataSource.tags.map((tag) => tag.id)
          tags.value.forEach((tag) => (tag.checked = linkedTagIds.includes(tag.id)))
        } else {
          isEdit.value = false
          Object.assign(formModel, getFormInitialValues())
          tags.value.forEach((tag) => (tag.checked = false))
        }
      }
    )

    async function handleSubmit() {
      await formRef.value?.validate()
      modal.loading = true
      const payload = {
        ...formModel,
        tagIds: tags.value.filter((tag) => tag.checked).map((tag) => tag.id),
      }
      const promise = isEdit.value
        ? BookmarkAPI.update({
            id: props.dataSource?.id!,
            ...payload,
          })
        : BookmarkAPI.add(payload)
      promise
        .then(() => {
          props.onClose()
          props.onSuccess()
        })
        .finally(() => {
          modal.loading = false
        })
    }

    return () => (
      <NModal
        title={isEdit.value ? '编辑书签' : '添加书签'}
        loading={modal.loading}
        show={props.show}
        preset="dialog"
        positiveText="提交"
        icon={() => (
          <NIcon>
            <Bookmarks />
          </NIcon>
        )}
        onPositiveClick={handleSubmit}
        onClose={props.onClose}
        onMaskClick={props.onClose}
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
