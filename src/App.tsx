import {AppRoot, View, Panel} from '@vkontakte/vkui'
import { HelloModal } from './components/widgets/HelloModal'
import AimTraining from './components/pages/AimTraining'

function App() {
  return (
    <AppRoot>
      <View activePanel='main'>
        <Panel id='main' mode='plain'>
          <HelloModal />
          <AimTraining />
        </Panel>
      </View>
    </AppRoot>
  )
}

export default App