
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/HomePage'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { logedinUserInfo } from './store/authSlice'

function App() {
  const dispatch = useDispatch();
  const {loginsignupstatus, isLoading, logedinUser} = useSelector(state=>state.auth)
  
  useEffect(()=>{
    
    dispatch(logedinUserInfo())
   
  }, [loginsignupstatus])

  return (
    <>
     <div className='flex max-w-6xl mx-auto'>
      {/*This Is a Common Components*/}
      {(logedinUser?.messege === "Unauthorised" || logedinUser == null) ? "" : <Sidebar />}
      <Routes>
        <Route path='/' element={(logedinUser?.messege === "Unauthorised" || logedinUser == null) ? <SignUp /> : <HomePage />} />
        <Route path='/login' element={logedinUser?.messege === "Unauthorised" ? <Login /> : <Navigate to="/"></Navigate>} />
        <Route path='/signup' element={logedinUser?.messege === "Unauthorised" ? <SignUp /> : <Navigate to="/"></Navigate>} />
        <Route path='/notifications' element={logedinUser?.messege !== "Unauthorised" ? <NotificationPage /> : <Navigate to="/signup"></Navigate>} />
        <Route path='/profile/:username' element={logedinUser?.messege !== "Unauthorised" ? <ProfilePage /> : <Navigate to="/signup"></Navigate>} />
      </Routes>
      {(logedinUser?.messege === "Unauthorised" || logedinUser == null) ? "" : <RightPanel />}
     </div>
    </>
  )
}

export default App
