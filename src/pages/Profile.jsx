import React, { useEffect, useState } from 'react'
import Helmet from '../Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'
import '../style/login.css'
import {motion} from 'framer-motion'
import { useDispatch,useSelector } from 'react-redux'
import { profile } from '../redux/actions/authActions';
import { Cookies } from 'react-cookie'
import FormData from 'form-data'
import { baseUrl } from '../api/auth'


export default function Profile() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state?.auth?.user)
  const [credentials, setCredentials] = useState({
    email: user.email,
    userName: user.userName,
  });
  const userImg=useSelector((state)=>state?.auth?.user?.imgUrl)
  const [selectedImage,setSelectedImage]=useState(null);
  const [selectedImageName,setSelectedImageName]=useState(null);
  useEffect(()=>{
    setSelectedImageName(`${baseUrl}`+userImg)
  },[userImg])
  console.log("selected image",selectedImage)

  const dispatch = useDispatch();
  // const error = useSelector((state) => state.auth.error);
  

  const cookies=new Cookies();
  console.log("user Profile====>",user,useSelector((state)=>state))
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleProfile=(e)=>{
    e.preventDefault();
    const file=e.target.files[0]
    setSelectedImageName(file.name)
    console.log("handle profile",file)
    if (file && file instanceof File) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setSelectedImage(imageUrl);
      };
  
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file selected");
    }
  }
  const _handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append('email',JSON.stringify(credentials.email))
    formData.append('userName',JSON.stringify(credentials.userName))
    formData.append('current_password',JSON.stringify(credentials.current_password))
    formData.append('new_password',JSON.stringify(credentials.new_password))

    formData.append('confirm_password',JSON.stringify(credentials.confirm_password))

    formData.append('file',JSON.stringify(selectedImage))
    formData.append('userId',JSON.stringify(user._id))
    formData.append('fileName',JSON.stringify(selectedImageName))


    
    dispatch(profile(formData));
    setSelectedImage(null);
    // navigate('/home')
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
            <label htmlFor="">Profile</label>
            <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>navigate('/home')}>
            <i style={{fontSize:"30px"}} class="ri-arrow-left-circle-line"></i>
            Back To Home
            </div>
            </div>
          
              <div className='col-12 mb-4' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <label htmlFor="image"  style={{width:80,height:80,borderRadius:"50%",backgroundColor:"white",border:"42px solid white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                {
                  selectedImage ? <img src={selectedImage} alt="" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover"}} /> :
                  selectedImageName ? <img src={selectedImageName} alt="" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover"}} /> :
                  <i class="ri-upload-cloud-fill" style={{color:"black",fontSize:"40px"}}></i>

                }
                
              
              
              </label>
              <input type="file" accept='image/*' id="image" name="image" className='d-none' onChange={handleProfile} />
             
                  
              </div>

              <div className='col-12 mb-4'>
                <div className='d-flex align-items-center'>
                <div className='col-3' style={{textAlign:"start"}}> 
                    UserName :
                </div>
                <div className='col-9'>
                <input type="text" className='form-control' name="userName" value={credentials?.userName} onChange={handleInputChange} placeholder='User Name' />

                </div>
                </div>
                

              </div>
              <div className='col-12 mb-4'>
                <div className='d-flex align-items-center'>
                <div className='col-3' style={{textAlign:"start"}}> 
                    Email :
                </div>
                <div className='col-9'>
                <input type="text" className='form-control' name="email" value={credentials?.email} onChange={handleInputChange} placeholder='Email' />

                </div>
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
