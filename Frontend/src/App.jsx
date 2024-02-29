import './App.css'
import {BrowserRouter , Routes, Route, useNavigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import AddMoney from './pages/AddMoney'
import PrivateRoute from './pages/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Signup />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<PrivateRoute  Component={Dashboard}/>} />
          <Route path='/send' element={<PrivateRoute Component={SendMoney} />} />
          <Route path='/addmoney' element={<PrivateRoute Component={AddMoney} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
