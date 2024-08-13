import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import Commonsection from '../UI/Commonsection'
import Helmet from '../Helmet/Helmet'
import '../style/checkout.css'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
 

export default function Checkout() {
  const now_year=new Date().getFullYear()
  const totalQty=useSelector(state=>state.cart.totalQuantity)
  const totalAmount=useSelector(state=>state.cart.totalAmount)
  return (
    <div>
      <Helmet title="Checkout">
      <Commonsection title="Checkout"></Commonsection>
        <section>
        <Container className='my-4'>
          <Row>
            <Col lg='8'>
            <label htmlFor="" className='fs-4 fw-20 mb-4'>Billing Information</label>
                  <form action="" style={{gap:10}}>
                    
                    <input type="text" className='form-control mb-3' required placeholder='Enter Your Name' />
                    <input type="text" className='form-control mb-3' required placeholder='Enter Your Email' />
                    <input type="text" className='form-control mb-3' required placeholder='Phone Number' />
                    <input type="text" className='form-control mb-3' required placeholder='Street Address' />
                    <input type="text" className='form-control mb-3' required placeholder='City' />
                    <input type="text" className='form-control mb-3' required placeholder='Postal Code' />
                    <input type="text" className='form-control mb-3' required placeholder='Country Code' />
                    

                  </form>
            </Col>
            <Col lg='4' className='billing-card mt-4'>
              <span className='d-flex justify-content-between align-items-center p-3'>
                <span>Total Qty:</span>
                <span>{totalQty} items</span>
              </span>
              <span className='d-flex justify-content-between align-items-center p-3'>
                <span>Subtotal:</span>
                <span>$345</span>
              </span>
              <span className='d-flex justify-content-between align-items-start p-3'>
                <span>Shipping <br />free shipping </span>
                <span>$0</span>
              </span>
              <span className='total_cost d-flex justify-content-between align-items-center p-3'>
                <h4>Total Cost:</h4>
                <h4>${totalAmount}</h4>
              </span>
              <motion.button whileTap={{scale:1.05}} className='checkout_btn w-100'>Place an order</motion.button>
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
                  <p className='text-center mt-5'>Copyright {now_year} developed by YMH</p>
                </Col>
              </Row>
            </Container>
          </section>
        </Helmet>
    </div>
  )
}
