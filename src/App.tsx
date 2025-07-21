import {AppRoot, View, Panel} from '@vkontakte/vkui'
import { HelloModal } from './components/HelloModal'

function App() {
  return (
    <AppRoot>
      <View activePanel='main'>
        <Panel id='main'>
          <HelloModal></HelloModal>
        </Panel>
      </View>
    </AppRoot>
  )
}

export default App