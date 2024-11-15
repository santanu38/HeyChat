import React,{ useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import { login as authLogin } from '../Store/authSlice.js'
import authService from "../auth"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"


function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login=async(data)=>{
        setError("")
        try {
            const session=await authService.login(data)
            if(session){
               const userData=await authService.getCurrentUser()
               if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="auth--container">
       <div className="form--wrapper">
         <form onSubmit={handleSubmit(login)} >
              <div className="field--wrapper">
                  <label>Email:</label>
                  <input 
                   type="email"
                    name="email"
                     placeholder="Enter your email..."
                     {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                  
                  />
              </div>
              <div className="field--wrapper">
                 <label>Password:</label>
                 <input 
                   type="password"
                   name="password"
                   placeholder="Enter password..."
                   {...register("password", {
                      required: true,
                   })}
                 
                 />
              </div>
              <div className="field--wrapper">

                    <input 
                    type="submit"
                    value="Login"
                    className="btn btn--lg btn--main"
                    />

            </div>
         </form>
         <p>Dont have an account?  <Link to="/signup">Sign Up</Link > </p>
         {error && <p style={{ color: '#dc2626', marginTop: '2rem', textAlign: 'center' }}>{error}</p>}
       </div>
    </div>
  )
}

export default Login
