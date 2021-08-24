import { reactive } from 'vue'

interface Props {}

export default function Test(props: Props) {
  const modal = reactive({
    isEdited: false,
    isSubmitting: true,
  })

  setInterval(() => {
    console.log(modal)
    modal.isSubmitting = !modal.isSubmitting
  }, 3000)

  return <div>测试测试测试测试测试测试测试测试</div>
}
