import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
function Header() {
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate()
    const navItems=[
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name:"Room",
      slug:"/room",
      active:authStatus
    }
    ]
  return (
     <nav>
        <ul>
            {
              navItems.map((item)=>
                item.active?(
                  <li key={item.name}>
                     <button
                      onClick={() => navigate(item.slug)}
                      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                      >{item.name}</button>
                  </li>
                ):null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            
        </ul>
     </nav>
  )
}

export default Header
