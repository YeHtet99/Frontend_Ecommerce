import React, { useState } from 'react'
import Helmet from '../Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'
import {SignUp} from '../api/auth'
import {motion} from 'framer-motion'
import '../style/login.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RegisterFormValidation } from '../validation/LoginFormValidation'
import { toast } from 'react-toastify'

export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [file,setFile]=useState(null)
  const user=useSelector((state)=>state?.auth?.user)
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const _handleSubmit = (e) => {
    e.preventDefault();
    const ValidatedErr = RegisterFormValidation(username,email,password);
    if(ValidatedErr.userNameErr){
      toast.error(ValidatedErr.userNameErr);
    }
    else if (ValidatedErr.emailErr) {
      toast.error(ValidatedErr.emailErr);
      
    } else if(ValidatedErr.passwordErr) {
      
      toast.error(ValidatedErr.passwordErr);
    }
    console.log("condition",Object.keys(ValidatedErr))
    if(Object.keys(ValidatedErr).length === 0){
      SignUp(username,email,password)
      navigate('/login')
    } 
  };


  return (
    <Helmet title='login'>
      <section className='my-5'>
        <Container >
          <Row style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Col lg='6' style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }} className='login text-center'>
              <label htmlFor="" className='mb-5'>Register</label>
              <form action="">
              <input type="text" className='form-control mb-4' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' required />
                
                <input type="text" className='form-control mb-4' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required />
                <input type="password" className='form-control mb-4' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
                {/* <input type="file" className='form-control mb-4' onChange={(e)=>setFile(e.target.files[0])} minLength={1} accept="image/png, image/gif, image/jpeg"  /> */}
                <motion.button className='login_btn mb-3' type='submit' 
                // onClick={()=>SignUp(username,email,password)}
                onClick={_handleSubmit}
                >Register</motion.button>
              </form>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <p>Already have an account?
               
              </p>
              <span><Link to='/login'>Login</Link></span>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className='footer'>
            <Container>
            <Row>
                <Col lg='4'>
                  <h5 className='mb-3 mt-4 text-white'>Shop.com</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, fuga molestias vero reiciendis quibusdam quia illum pariatur tempore consequuntur adipisci expedita harum cum ipsa velit soluta cupiditate, aliquid accusamus maxime.</p>

                </Col>
                <Col lg='2'>
                  <h5 className='mb-3 mt-4 text-white'>Top Cateogories</h5>
                  <div style={{lineHeight:2}}>
                  <p>Mobile Phones</p>
                  <p>Sofa</p>
                  

                  <p>Arm Chair</p>
                  <p>Smart Watches</p>
                  </div>

                </Col>
                <Col lg='2'>
                  <h5 className='mb-3 mt-4 text-white' >Useful Links</h5>
                  <div style={{lineHeight:2}}>
                    <p>Shop</p>
                    <p>Cart</p>
                    <p>Login</p>
                    <p>Privacy Policy</p>
                  </div>
                  

                </Col>
                <Col lg='4'>
                  <h5 className='mb-3 mt-4 text-white'>Contact</h5>
                  <div style={{lineHeight:2}}>
                    <p>
                    <i class="ri-map-pin-2-fill"></i> Chan Aye Thar Zan,Mandalay
                    </p>
                    <p>
                    <i class="ri-phone-fill"></i> +95953453345
                    </p>
                    <p>
                    <i class="ri-mail-line"></i> yemyinthtet99999@gmail.com
                    </p>
                  </div>
                 
                </Col>
                <Col lg='12'>
                  <p className='text-center mt-5'>Copyright 2023 developed by YMH</p>
                </Col>
              </Row>
            </Container>
          </section> */}
    </Helmet>
  )
}
