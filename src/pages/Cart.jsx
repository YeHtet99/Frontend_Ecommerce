import React from 'react'
import Helmet from '../Helmet/Helmet'
import Commonsection from '../UI/Commonsection'
import { Container,Row,Col } from 'reactstrap'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import '../style/cart.css'
import { cartActions } from '../redux/slices/cartSlices'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { removeFromCart } from '../redux/actions/itemAction'
import Header from '../components/Header'
import { getItem } from '../redux/actions/itemAction'
import { deleteFromCart } from '../api/item'
export const baseUrl= "http://localhost:8080/"
// import armChair from '../assets/images/arm-chair-01.jpg'


export default function Cart() {
  const now = new Date().getFullYear()
  const cartItems=useSelector((state)=>state.item.cartItems)
  const userId=useSelector((state)=>state.auth.userId)
  console.log("cart items",cartItems)
  const totalAmount=useSelector((state)=>state.item.totalAmount)
  const dispatch =useDispatch()
  useEffect(()=>{
    // dispatch(getItem(userId))
  },[])
  
  console.log("condition",cartItems)
  return (
    <div>
      <Header/>
      <Helmet title="Cart">
          <Commonsection title="Carts"></Commonsection>
          <section className='cart_list'>
            <Container>
              <Row>
                
                  <Col lg='9'>
                  <table className='table table-bordered my-5'>
                    <thead>
                      <tr>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Image</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Product Name</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Quantity</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Price</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                          cartItems.length > 0 ? 
                          cartItems.map(item=>(
                           <Tr item={item} userId={userId}></Tr>
                          )) 
                          : <tr className='text-center'>
                            <td colSpan={5}>There is no products in your cart</td>
                          </tr>
                        }
                      
                    </tbody>
                  </table>
                </Col>
                <Col lg='3' className='my-5'>
                  <span className='d-flex align-items-center justify-content-between mb-2'>
                    <p className='fs-4' style={{color:'black',fontWeight:'bold'}}>Total :</p>
                    <span className='fs-4' style={{fontWeight:600}}>{totalAmount}$</span>
                  </span>
                  <p className='mb-4'>taxes and shipping will calculate in checkout</p>
                  <motion.button className='cart_button w-100 mb-2' whileTap={{scale:1.2}}>
                    <Link to='/shop'>Continue Shopping</Link>
                  </motion.button>
                  {/* <motion.button className='cart_button w-100' whileTap={{scale:1.2}}>
                    <Link to='/vouncher'>
                    Get Vouncher
                    </Link>
                  </motion.button> */}
                </Col>
               
                
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
                  <p className='text-center mt-5'>Copyright {now} developed by YMH</p>
                </Col>
              </Row>
            </Container>
          </section>
      </Helmet>
    </div>
  )
}
const Tr=({item,userId})=>{
  
  const dispatch=useDispatch()
  const deleteHandler=()=>{
  //  const data={
  //   id:item.id,
  //   ownerId:item.ownerId
  //  }
    deleteFromCart(item.id,userId)
    dispatch(cartActions.deleteItem(item.id))
  }
  const plusItem=(item)=>{
    dispatch(cartActions.addItem(item))
  }
  const minusItem=(item)=>{
    dispatch(cartActions.removeItem(item))
  }
  return(
    <tr>
                        
    <td className='text-center' style={{verticalAlign:'middle'}}>
      <img src={baseUrl+item.imgUrl} className='cart_image' alt="" />
      </td>
    <td className='text-center' style={{verticalAlign:'middle'}}>{item.productName}</td>
    <td className='text-center' style={{verticalAlign:'middle'}}>
      <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
      <div onClick={()=>minusItem(item)} style={{cursor:"pointer",width:20,height:20,background:"#07162e",borderRadius:3,display:"flex",justifyContent:"center",alignItems:"center"}}>< i style={{color:"white"}} class="ri-subtract-line"></i></div>
      {item.quantity}
      <div onClick={()=>plusItem(item)} style={{cursor:"pointer",width:20,height:20,background:"#07162e",borderRadius:3,display:"flex",justifyContent:"center",alignItems:"center"}}>< i style={{color:"white"}} class="ri-add-line"></i></div>
      </div>
      

      </td>
    <td className='text-center' style={{verticalAlign:'middle'}}>${item.price}</td>
    <td  className='text-center' style={{verticalAlign:'middle'}}>
    <i onClick={deleteHandler} style={{cursor:"pointer",color:"red"}} class="bi bi-trash-fill"></i>
    </td>
  </tr>
  )
  
}
