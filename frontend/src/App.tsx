import './App.css'
import { SocketProvider } from './context/SocketContext'
import UserDashboard from './components/UserDashboard'
function App() {

  return (
    <>
      <div>
        <SocketProvider>
          <UserDashboard />
        </SocketProvider>
      </div>
    </>
  )
}

export default App
