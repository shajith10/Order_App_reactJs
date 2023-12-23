import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './SiginUp.css'
import myimage from "./Assest/User.png"
import myimage1 from "./Assest/email.png"
import myimage2 from "./Assest/password.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SiginUp() {
    const [fitH, setfitH] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ress,setress]=useState(0);
    const navigate = useNavigate();


    const onSubmit = (data) => {
        console.log('Form submitted successfully:', data);
        axios.post('http://localhost:2001/api/v1/user/createUser',data)
        .then(res=>setress(res.status))
        .catch(err=>console.log(err))
       
    };
    
   
   useEffect(()=>{
   if(errors.name || errors.email || errors.password){
   setfitH(true)
   }
   if(!errors.name && !errors.email && !errors.password){
    setfitH(false)
   }
   
   if(ress===200){
    console.log(ress)
    navigate('login')
  }
 
   },[errors.name,errors.password,errors.email,ress])
    return (
        <div className='container' >
            <div className='startingd' style={{ height: fitH ? "480px" : "325px" }}>
                <div className='formname'>SiginUp</div>
                <div className='formstart'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='inner-form' >
                            <input {...register('name', { required: 'name is required' })} placeholder="Enter Your Name" />
                            <img src={myimage} alt='UserImage' className='innerinput-img' />
                            {  errors.name  && <p>{errors.name.message}</p>}
                        </div>

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
                        <input type="submit" value={"SignUP"} style={{ backgroundColor: "white", color: "black", width: "220px", marginTop: "35px" }} />
                   <div style={
                    {color:"white",marginTop:'20px',fontSize:'15px',marginLeft:'15px'}
                   }>Do You Have Accout?<span style={{cursor:'pointer'}}><Link to={'/login'} style={{color:'red',textDecoration:'none'}}>Login</Link></span> </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default SiginUp
