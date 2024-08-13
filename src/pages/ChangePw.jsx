import React, { useEffect, useState } from 'react'
import Helmet from '../Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'
import '../style/login.css'
import {Login_api} from '../api/auth'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux'
import { changePassword} from '../redux/actions/authActions';
import {ChangePasswordValidation} from '../validation/Validation';
import { toast } from 'react-toastify'


export default function ChangePw() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state?.auth?.user)
  const [credentials, setCredentials] = useState({

  });

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value || "",
    });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    credentials.id=user._id
    const validation=ChangePasswordValidation(credentials,null)
    if(validation?.passwordErr){
      toast.error(validation.passwordErr)
    }else{
        dispatch(changePassword(credentials,navigate));
    }


    
    
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
            <Col lg='6' md='8' sm='12' style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}  className='login text-center'>
          <form className='form'>
            <div className='mb-4' style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <label htmlFor="">Change Password</label>
            <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>navigate('/home')}>
            <i style={{fontSize:"30px"}} class="ri-arrow-left-circle-line"></i>
            Back To Home
            </div>
            </div>
              <div className='col-12 mb-4'>
                <div className='d-flex align-items-center'>
                <div className='col-3' style={{textAlign:"start"}}> 
                    Current Password :
                </div>
                <div className='col-9'>
                <input type="password" className='form-control' name="current_password" value={credentials?.current_password} onChange={handleInputChange} placeholder='Current Password' />

                </div>
                </div>
                

              </div>
              <div className='col-12 mb-4'>
                <div className='d-flex align-items-center'>
                <div className='col-3' style={{textAlign:"start"}}> 
                    New Password :
                </div>
                <div className='col-9'>
                <input type="password" className='form-control' name="new_password" value={credentials?.new_password} onChange={handleInputChange} placeholder='New Password' />

                </div>
                </div>
                

              </div>
              <div className='col-12 mb-4'>
                <div className='d-flex align-items-center'>
                <div className='col-3' style={{textAlign:"start"}}> 
                    Confirm Password :
                </div>
                <div className='col-9'>
                <input type="password" className='form-control' name="confirm_password" value={credentials?.confirm_password} onChange={handleInputChange} placeholder='Confirm Password' />

                </div>
                </div>
                

              </div>
              <div style={{display:"flex",justifyContent:"end"}}>
              <motion.div whileTap={{scale:1.05}} 
              onClick={_handleSubmit} 
              className='submit_btn'>
                        Submit
                      </motion.div>
              </div>
          </form>
              
                {/* <button className='login_btn mb-3' type='submit' onClick={_handleSubmit}>Login</button> */}
                
              
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
