import { FunctionalComponent } from 'vue'

interface Props {
  name: string
}

// export default function HelloWorld(props: Props) {
//   console.log(arguments)

//   return <div>你好，</div>
// }

const HelloWorld: FunctionalComponent<Props> = (props) => {}

export default HelloWorld
