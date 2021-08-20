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
  NButton,
} from 'naive-ui'
import { defineComponent, ref, reactive, watch, PropType } from 'vue'
import { IBookmark, ITag } from '../interface'
import store from '../store'
import BookmarkAPI from '../api/bookmark'
import { Bookmarks, Trash } from '@vicons/tabler'

const iconApiPrefixUrl = 'https://get-favicon-zteu24lrsgf7.runkit.sh/'
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
      type: Object as PropType<IBookmark | null>,
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
      loading: false,
    })
    const formRef = ref<FormInst>()
    const formModel = reactive(getFormInitialValues())
    const tags = ref<Array<ITag & { checked: boolean }>>([])
    const icon = reactive({
      loading: false,
      showSetButtons: true,
      dataUrl: '',
    })

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
        icon.showSetButtons = !formModel.favicon
        icon.dataUrl = ''
      }
    )

    async function handleSubmit() {
      await formRef.value?.validate()
      modal.loading = true
      const payload = {
        ...formModel,
        tagIds: tags.value.filter((tag) => tag.checked).map((tag) => tag.id),
        b64Favicon: icon.dataUrl,
      }
      const promise = isEdit.value
        ? BookmarkAPI.update({
            id: props.dataSource?.id!,
            ...payload,
          })
        : BookmarkAPI.add(payload)

      try {
        await promise
        props.onClose()
        props.onSuccess()
      } finally {
        modal.loading = false
      }
    }

    async function fetchIcon() {
      const { host } = new URL(formModel.url)
      if (!host) return window.$message.warning('请先输入网址')

      icon.loading = true
      try {
        const rsp = await fetch(iconApiPrefixUrl + host)
        if (rsp.status !== 200) throw new Error()

        const blob = await rsp.blob()
        await new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.onload = (progressEvent) => {
            icon.dataUrl = progressEvent.target?.result as string
            icon.showSetButtons = false
            resolve(null)
          }
          fileReader.onerror = (err) => {
            reject(err)
          }
          fileReader.readAsDataURL(blob)
        })
      } catch (error) {
        window.$message.error('自动获取图标失败')
      } finally {
        icon.loading = false
      }
    }

    function handleRemoveIcon() {
      icon.showSetButtons = true
      formModel.favicon = ''
      icon.dataUrl = ''
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
        displayDirective="show"
      >
        <NForm
          model={formModel}
          ref={formRef}
          rules={formRules}
          labelPlacement="left"
          labelWidth="70"
        >
          <NFormItem label="网址" path="url">
            <NInput v-model={[formModel.url, 'value']} />
          </NFormItem>
          <NFormItem label="名称" path="name">
            <NInput v-model={[formModel.name, 'value']} />
          </NFormItem>
          <NFormItem label="图标" path="favicon">
            {/* <NTabs>
              <NTabPane name="自动获取">自动获取</NTabPane>
              <NTabPane name="手动上传">手动上传</NTabPane>
              <NTabPane name="手动输入">手动输入</NTabPane>
            </NTabs> */}
            <NSpace align="center">
              {{
                default() {
                  if (icon.showSetButtons) {
                    return (
                      <>
                        <NButton disabled>手动上传</NButton>
                        <NButton
                          onClick={fetchIcon}
                          loading={icon.loading}
                          disabled={!formModel.url}
                        >
                          自动获取
                        </NButton>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <img
                          style={{ display: 'block', width: '24px' }}
                          src={formModel.favicon || icon.dataUrl}
                        />
                        <NButton
                          text
                          type="error"
                          style={{ display: 'block' }}
                          onClick={handleRemoveIcon}
                        >
                          {{ icon: () => <Trash /> }}
                        </NButton>
                      </>
                    )
                  }
                },
              }}
            </NSpace>
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
