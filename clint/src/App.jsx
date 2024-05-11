
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
        <Route path='/' element={(logedinUser?.messege === "Unauthorised" || logedinUser == null) ?  <SignUp /> : <HomePage />} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/notifications' element={(logedinUser?.messege === "Unauthorised" || logedinUser == null) ?  <Login /> : <NotificationPage />} />
        <Route path='/profile/:username' element={(logedinUser?.messege === "Unauthorised" || logedinUser == null) ?  <Login /> : <ProfilePage />} />
      </Routes>
      {(logedinUser?.messege === "Unauthorised" || logedinUser == null) ? "" : <RightPanel />}
     </div>
    </>
  )
}

export default App
