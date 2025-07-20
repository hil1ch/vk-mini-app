import {AppRoot, View, Panel} from '@vkontakte/vkui'

function App() {
  return (
    <AppRoot>
      <View activePanel='main'>
        <Panel id='main'>
        </Panel>
      </View>
    </AppRoot>
  )
}

export default App
