import React, { useState } from 'react'
import Helmet from '../Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'
import '../style/login.css'
import {Login_api} from '../api/auth'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux'
import { LoginFormValidation } from '../validation/LoginFormValidation'
import { LoginForm } from '../redux/actions/authActions';
import { toast } from 'react-toastify'
import { Cookies } from 'react-cookie'


export default function Login() {
  const navigate=useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  // const error = useSelector((state) => state.auth.error);
  const user=useSelector((state)=>state?.auth?.user)
  const cookies=new Cookies();
  console.log("user login====>",user,useSelector((state)=>state))
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    const ValidatedErr = LoginFormValidation(credentials);
    if (ValidatedErr.userErr) {
      
      toast.error(ValidatedErr.userErr);
    } else if (ValidatedErr.passwordErr) {
      
      toast.error(ValidatedErr.passwordErr);
    }
    if(Object.keys(ValidatedErr).length === 0){
        dispatch(LoginForm(credentials));
        // navigate('/home')
        // window.location.reload()
    }
    console.log("credenttails",credentials)
   
  };
  // const _handleSubmit=()=>{
  //   Login_api(email,password)
  // }
  return (
    <Helmet title='login'>
      <section className='my-5'
      
      >
        <Container >
          <Row style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Col lg='5' style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}  className='login text-center'>
              <label htmlFor="" className='mb-5'>Login</label>
              <form action="">
                <input type="text" className='form-control mb-4' name="email" value={credentials?.email} onChange={handleInputChange} placeholder='Email' />
                <input type="password" className='form-control mb-4' name="password" value={credentials?.password} onChange={handleInputChange} placeholder='Password' />
                {/* <button className='login_btn mb-3' type='submit' onClick={_handleSubmit}>Login</button> */}
                <motion.div whileTap={{scale:1.05}} style={{display:"flex",justifyContent:"center",cursor:"pointer"}} onClick={_handleSubmit} className='login_btn mb-4'>
                        Login
                      </motion.div>
              </form>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <p>Dont have an account?</p>
              <span style={{cursor:"pointer"}}><Link to='/register'>Register</Link></span>
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
