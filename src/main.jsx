import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Room from './Pages/Room'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import AuthLayout from './Components/AuthLayout.jsx'

const router=createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
     },
     {
      path: "/room",//room hobe 
      element: (
          <AuthLayout authentication>
              {" "}
              <Room />
          </AuthLayout>
      ),
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/> 
    </Provider>
  </StrictMode>,
)
