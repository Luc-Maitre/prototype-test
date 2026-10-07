import { PasswordGate } from './components/PasswordGate'
import { MyWallet } from './components/MyWallet'

function App() {
  return (
    <PasswordGate>
      <MyWallet />
    </PasswordGate>
  )
}

export default App
