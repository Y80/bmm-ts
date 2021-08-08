import { NDataTable, NButtonGroup, NButton, NSpace, NPopconfirm, NPopover } from 'naive-ui'
import { InternalRowData, TableColumn } from 'naive-ui/lib/data-table/src/interface'
import { defineComponent } from 'vue'

interface TagRowData {
  name: string
  bookmarkNum: number
}

const columns: TableColumn<TagRowData>[] = [
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
            v-slots={{
              default: () => `确定要删除标签【${row.name}】吗？`,
              trigger: () => (
                <NButton text type="error">
                  删除
                </NButton>
              ),
            }}
          />
          <NButton text>编辑</NButton>
        </NSpace>
      )
    },
  },
]
const tableData = [{ name: '标签1' }, { name: '标签2' }, { name: '标签3' }]

export default defineComponent({
  setup() {},

  render() {
    return <NDataTable size="small" columns={columns} data={tableData} />
  },
})
