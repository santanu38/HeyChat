import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../auth'
import {logout} from '../Store/authSlice'
import { LogOut } from 'react-feather'

function LogoutBtn() {
  const dispatch=useDispatch();
  const logouthandler=()=>{
    authService.logout().then(()=>{
        dispatch(logout());
    })
  }
  
    return (
    
      <LogOut className="header--link" onClick={logouthandler}/>
    
  )
}

export default LogoutBtn
