import React, { useEffect } from 'react'
import { Col,Container,Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import {motion} from 'framer-motion'
import Helmet from '../Helmet/Helmet'
import LandingImg from '../assets/images/iphone-15-pro-gray.jpg'
import '../style/style.css'
import Services from '../services/Services'
import ProductList from '../UI/ProductList'  
import Clock from '../UI/Clock'
import counterImg from '../assets/images/iphone.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { useDispatch } from 'react-redux'
import { getItem,getAllItem } from '../api/item'
import { cartActions } from '../redux/slices/cartSlices'
import { productDataActions } from '../redux/slices/productDataSlices'
import { getAllProducts } from '../api/product'




export default function Home() {
  const now_year=new Date().getFullYear()
  const products = useSelector((state)=>state.productData.products)

  const [tredingProducts,setTrendingProducts]=useState([])
  const [bestSales,setBestSales]=useState([])
  const [newArrivals,setNewArrivals]=useState([])
  const [popular_products,setPropular]=useState([])

  const dispatch = useDispatch();
  const user=useSelector((state)=>state?.auth?.userName)
  const userId=useSelector((state)=>state.auth.userId)
  console.log("userId",useSelector((state)=>state.auth))
  // const item=useSelector((state)=>state.)
  console.log("home======>",useSelector((state)=>state),user)

  useEffect(()=>{
    const filterTrend=products.filter((item)=>item.category == 'trend')
    setTrendingProducts(filterTrend)
    const filterBestSales=products.filter((item)=>item.category == 'best-sales')
    setBestSales(filterBestSales)
    const filterNewArrivals=products.filter((item)=>item.category == 'new-arrivals')
    setNewArrivals(filterNewArrivals)
    const filterPopular=products.filter((item)=>item.category == 'popular')
    setPropular(filterPopular)

  },[products])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItem(userId);
        const result= await getAllProducts();
        console.log("result of product",result)
        // const getData= await getAllItem();
        // console.log("get data",getData)
        if (data) {
          dispatch(cartActions.getItem(data));
        }
        if(result){
          dispatch(productDataActions.getProducts(result));
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
  
    fetchData();
  }, [userId, dispatch]);
  
  
  return (
    <div>

    <Header></Header>
      <Helmet title={"Home"}>
          <section className='home_details'>
              <Container>
                <Row style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 0px'}}>
                  <Col lg='6' md='6'>
                    <div className='home_context'>
                      <p>Trending Product in {now_year}</p>
                      <h2>Stunning Display</h2>
                      <p> Dive into a world of vibrant colors and crystal-clear visuals with our high-definition display</p>
                      <motion.div whileTap={{scale:1.2}} className='home_shop_btn'>
                        <NavLink to='/shop'>Shop Now</NavLink>
                        
                      </motion.div>

                    </div>
                  </Col>
                  <Col lg='6' md='6'>
                    <img src={LandingImg} style={{width:'500px',height:'500px',objectFit:'cover'}} alt="" />
                  </Col>
                </Row>
              </Container>
          </section>
          <Services></Services>
          {/* <section className='trending_products'>
            <Container>
              <Row>
                <Col lg='12' className='text-center' style={{marginBottom:20}}>
                    <h4 style={{fontWeight:'bold'}}>Trending Products</h4>
                </Col>
                <ProductList data={tredingProducts}></ProductList>
              </Row>
            </Container>
          </section> */}
          <section className='best_sales'>
            <Container>
              <Row>
                <Col lg='12' className='text-center' style={{marginBottom:20}}>
                    <h4 style={{fontWeight:'bold'}}>Best Sales</h4>
                </Col>
                <ProductList data={bestSales}></ProductList>
              </Row>
            </Container>
          </section>
          <section className='count_down'>
            <Container>
              <Row 
              // style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}
              >
                <Col lg='6'>
                    <div className='count_down_content'>
                      <h4 style={{margin:'20px 0px'}}>Limited Offers</h4>
                      <h5 style={{marginBottom:'20px'}}>I Phone 15 Pro Max</h5>
                    </div>
                    <Clock></Clock>
                    <motion.button whileTap={{scale:1.2}} className='home_shop_btn'>
                      <Link to='/shop'>
                            Visit Shop
                      </Link>
                    </motion.button>
                </Col>
                <Col lg='6'>
                  <span>
                    <img src={counterImg} alt="" className='text-end' />
                  </span>
                </Col>
              </Row>
            </Container>
          </section>
          <section className='new_arrivals'>
            <Container>
              <Row>
                <Col lg='12' className='text-center' style={{margin:'20px 0px'}}>
                    <h4 style={{fontWeight:'bold'}}>New Arrivals</h4>
                </Col>
                <ProductList data={newArrivals}></ProductList>
              </Row>
            </Container>
          </section>
          {/* <section className='popular'>
            <Container>
              <Row>
                <Col lg='12' className='text-center' style={{margin:'40px 0px 20px 0px'}}>
                    <h4 style={{fontWeight:'bold'}}>Popular Products</h4>
                </Col>
                <ProductList data={popular_products}></ProductList>
                
              </Row>
            </Container>
          </section> */}
          <section className='footer'>
            <Container>
            <Row>
                <Col lg='4'>
                  <h5 className='mb-3 mt-4 text-white'>Shop.com</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, fuga molestias vero reiciendis quibusdam quia illum pariatur tempore consequuntur adipisci expedita harum cum ipsa velit soluta cupiditate, aliquid accusamus maxime.</p>

                </Col>
                <Col lg='2'>
                  <h5 className='mb-3 mt-4 text-white'>Top Cateogories</h5>
                  <div style={{lineHeight:2}}>
                  <p>I Phone</p>
                  
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
      </Helmet>
    </div>
  )
}
