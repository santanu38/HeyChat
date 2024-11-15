import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './auth'
import { login,logout } from './Store/authSlice'
import Header from './Components/Header'
import './App.css'
import { Outlet } from 'react-router-dom'
function App() {
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()

    useEffect(()=>{
       authService.getCurrentUser().then((userData)=>{
            if(userData){
              dispatch(login(userData))
            }
            else{
              dispatch(logout)
            }
       }).finally(()=>setLoading(false))
    },[])

  return !loading? (
    <>
       <h1>hey there</h1>
      <Header />
        <main>
        TODO:  <Outlet />
        </main>
    </>
  ):null
}

export default App
