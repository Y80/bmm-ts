import { defineComponent } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import Index from '../../components/Index'

export default defineComponent({
  setup() {
    return () => (
      <NLayout>
        <NLayoutContent
          contentStyle={{
            padding: '10vh 10px 50px 10px',
            maxWidth: '1295px',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          <Index />
        </NLayoutContent>
      </NLayout>
    )
  },
})
