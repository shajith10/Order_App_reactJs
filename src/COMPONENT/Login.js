import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './Login.css'
import myimage1 from "./Assest/email.png"
import myimage2 from "./Assest/password.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [fitH, setfitH] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ress,setress]=useState(0);
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        console.log('Form submitted successfully:', data);
        axios.post('http://localhost:2001/api/v1/user/login',data)
        .then(res=>setress(res))
        .catch(err=>console.log(err))
         navigate('/foodfront',{state:"shajith"})
      
    };
   useEffect(()=>{
   if( errors.email || errors.password){
   setfitH(true)
   }
   if( !errors.email && !errors.password){
    setfitH(false)
   }


   },[errors.email,errors.password,ress,navigate])
    return (
        <div className='container' >
            <div className='startingd' style={{ height: fitH ? "470px" : "300px" }}>
                <div className='formname'>Login</div>
                <div className='formstart'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='inner-form'>
                            <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} placeholder="Enter Your Email" />
                            <img src={myimage1} alt='EmailImage' className='innerinput-img' />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        <div className='inner-form'>
                            <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} type="password" placeholder="Enter Your Password" />
                            <img src={myimage2} alt='PasswordImage' className='innerinput-img' />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>

                        <input type="submit" value={"Login"} style={{ backgroundColor: "white", color: "black", width: "220px", marginTop: "35px" }} />
                        <div style={
                    {color:"white",marginTop:'20px',fontSize:'15px',marginLeft:'15px'}
                   }>You Don't Have Accout?<span style={{color:'violet',cursor:'pointer'}}><Link to='/' style={{color:'red',textDecoration:'none'}}>SignUp</Link></span> </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login
