import React, { useEffect, useRef, useState } from 'react'
import Helmet from '../Helmet/Helmet'
import Header from '../components/Header'
import { Container,Row,Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
// import products from '../assets/data/products'
import ProductList from '../UI/ProductList'
import Commonsection from '../UI/Commonsection'
import {motion} from 'framer-motion'
import '../style/product_details.css'
import { useDispatch } from 'react-redux'
import {cartActions} from '../redux/slices/cartSlices'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addItem,getItem } from '../api/item'
import { baseUrl } from '../api/url'

export default function ProuductDetails() {
  const now_year=new Date().getFullYear()

  const paramsId=useParams()
  console.log("param id",paramsId)
  const products = useSelector((state)=>state.productData.products)
  const userID=useSelector((state)=>state.auth.userId)
  const filterProucts=products.filter(item=>item._id == paramsId.id)
  console.log("filterProucts",filterProucts)
  const {imgUrl,avgRating,description,productName,price,category,id,reviews,
    displaySize,
    weights,
    chipSet,
    cpu,
    gpu,
    storage,
    selfieCamera,
    mainCamera,
    ultraWide,
    telePhoto,
    battery
  }=filterProucts[0]
  const categories=[
    {value:'trend',label:'Trend'},
    {value:'best-sales',label:'Best Sales'},
    {value:'popular',label:'Popular'},
    {value:'new-arrivals',label:'New Arrivals'}
  ]
  const categoryName = categories.filter((v)=>v.value == category)
  const reviewUser=useRef('')
  const reviewMesg=useRef('')
  const [tab,setTab]=useState(1)
  const [rating,setRating]=useState(0)
  const dispatch=useDispatch();
  const relatedProducts=products.filter(item=>item.category == category)

  const submitHandler=(e)=>{
    e.preventDefault();
    const userName=reviewUser.current.value;
    const message=reviewMesg.current.value;
    const reviewObj={
      userName:userName,
      text:message,
      rating:rating
    }
    console.log(reviewObj)
  }

  const addToCart=async()=>{
        const data = await addItem({
            id:paramsId.id,
            productName:productName,
            price:price,
            imgUrl:imgUrl,
            userId:userID
        })
        console.log("data in product card",data)
        if(data?.success == true){
            toast.success("Successfully Added.")
            dispatch(cartActions.getItem(data?.payload))
        }else{
            toast.error(data?.message)
        }
}
  
  console.log("filter products",tab,reviews)
  return (
    <section>
      <Header></Header>
      <Helmet title={productName}></Helmet>
      <Commonsection title={productName}></Commonsection>
      <section className='product_details mb-3 p-0'>
        <Container>
          <Row style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Col lg='6' md='6'>
                  <img src={baseUrl+imgUrl} alt="" className='text-start'/>
            </Col>
            <Col lg='6' md='6'>
              <h3 className='product_details_name'>{productName}</h3>
              <ul style={{listStyleType:'circle'}}>
              <li style={{color:'black',fontWeight:'bold'}}>Display Size : {displaySize}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Phone Weight : {weights}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Processor Chipset : {chipSet}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Processor CPU : {cpu}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Processor GPU : {gpu}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Memory Storage : {storage}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Front Camera : {selfieCamera}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Main Camera : {mainCamera}</li>
              <li style={{color:'black',fontWeight:'bold'}}>UltraWide Camera : {ultraWide}</li>
              <li style={{color:'black',fontWeight:'bold'}}>TelePhoto Camera : {telePhoto}</li>
              <li style={{color:'black',fontWeight:'bold'}}>Battery Capacity : {battery}</li>
              </ul>
              {/* <p className='product_details_desc'>{description}</p> */}
              


              <h4 className='product_details_price'>{price+' $'}</h4>
              <motion.button whileTap={{scale:1.2}} className='product_details_button' onClick={()=>addToCart()}><i class="bi bi-cart-plus-fill" style={{fontSize:'30px'}}></i></motion.button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className=''>
        <Container>
          <Row>
            {/* <span className='text_wrapper d-flex align-items-center gap-5'>
              <h6 className={tab == 1 ? 'active_tab' : ''} onClick={()=>setTab(1)}>Descirption</h6>
              <h6 className={tab == 2 ? 'active_tab' : ''} onClick={()=>setTab(2)}>Reviews ({reviews?.length})</h6>
            </span>
            {
              tab == 1 ? <Col lg='12'>
              <p className='description_text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ex harum minima, quos sint, eius voluptatum et ea cupiditate debitis laboriosam dolorem culpa. Iste adipisci perferendis delectus aliquam aut corporis.
              </p>
            </Col> : 
            <Col lg='12' className='my-4'>
              {
                reviews?.length > 0 ? 
                reviews?.map(review=>(
                  <span className='review_content'>
                  <h6>John Snow</h6>
                  <span style={{color:'coral'}}>({review.rating} Ratings)</span>
                  <p>{review.text}</p>
              </span>
                ))
                 : <></>
              }
              
                
              
               <form action="" className='mt-5' onSubmit={submitHandler}>
                <h5 className='mb-3'>Review Form</h5>
                 <input type="text" className='form-control mb-3' placeholder='Your Name' ref={reviewUser}/>
                 <span className='review_stars d-flex align-items-center gap-5 mb-3'>
                   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(1)}>
                   1<i class="ri-star-fill"></i>
                   </motion.span>
                   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(2)}>
                   2<i class="ri-star-fill"></i>
                   </motion.span>
                   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(3)}>
                   3<i class="ri-star-fill"></i>
                   </motion.span>
                   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(4)}>
                   4<i class="ri-star-fill"></i>
                   </motion.span>
                   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(5)}>
                   5<i class="ri-star-fill"></i>
                   </motion.span>
                 </span>
                 
                 <textarea name="" id="" rows='6' className='form-control mb-3' placeholder='Say Something' ref={reviewMesg} ></textarea>
                 
                 <motion.button whileTap={{scale:1.2}} type='submit' className='reviews_button'>Submit</motion.button>
               </form>
            </Col>
            } */}
            <h6 className='my-3'>You might also like</h6>
            <ProductList data={relatedProducts}></ProductList>
            
           
          </Row>
        </Container>
      </section>
      <section className='footer'>
            <Container>
            <Row>
                <Col lg='4'>
                  <h5 className='mb-3 mt-4 text-white'>Shop.com</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, fuga molestias vero reiciendis quibusdam quia illum pariatur tempore consequuntur adipisci expedita harum cum ipsa velit soluta cupiditate, aliquid accusamus maxime.</p>

                </Col>
                <Col lg='2'>
                  <h5 className='mb-3 mt-4 text-white'>Top Brands</h5>
                  <div style={{lineHeight:2}}>
                  <p>I Phone</p>
                  <p>Xiaomi</p>
                  <p>Huawei</p>
                  <p>Vivo</p>
                  <p>Oppo</p>
                  
                  </div>

                </Col>
                <Col lg='2'>
                  <h5 className='mb-3 mt-4 text-white' >Useful Links</h5>
                  <div style={{lineHeight:2}}>
                    <p>Shop</p>
                    <p>Cart</p>
                    <p>Login</p>
                    <p>Register</p>
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
                  <p className='text-center mt-5'>Copyright {now_year} developed by YMH</p>
                </Col>
              </Row>
            </Container>
          </section>
    </section>
  )
}
