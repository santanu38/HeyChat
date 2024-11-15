import React,{useState} from 'react'
import authService from '../auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../Store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const create=async(data)=>{
        setError("")
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  
    return (
    <div className="auth--container">
        <div className="form--wrapper">
            <form onSubmit={handleSubmit(create)}>
                <div className="field--wrapper">
                    <label>Name:</label>
                    <input type="text" 
                      placeholder="Enter your full name"
                      {...register("name", {
                          required: true,
                      })}
                    
                    />
                </div>
                <div className="field--wrapper">
                   <label>Email:</label>
                   <input type="email" 
                    placeholder="Enter your email"
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
                  <input type="password"
                   placeholder="Enter your password"
                   {...register("password", {
                       required: true,})}
                   />
                </div>

                <div className="field--wrapper">
                    <input className="btn btn--lg btn--main" type="submit" value="Register"/>
                </div>
            </form>
             <p>Already have an account? Login <Link to="/login">here</Link></p>
        </div>
      
    </div>
  )
}

export default Signup
