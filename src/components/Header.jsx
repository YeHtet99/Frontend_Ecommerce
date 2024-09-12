import React, { useEffect,useRef, useState } from 'react'
import { Row,Container } from 'reactstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import logo from '../assets/images/eco-logo.png'
import HeaderDropDown from './HeaderDropDown'
import { Cookies } from 'react-cookie'
import user_icon from '../assets/images/user-icon.png'

import './Header.css'
import { useSelector } from 'react-redux'


export default function Header() {
    const refHeader=useRef(null)
    const navigate=useNavigate();
    const cookies=new Cookies();
  const isAuthenticated=cookies.get('token')
  const userType = cookies.get('userType')
    const userName=useSelector(state=>state.auth?.userName)
    // const totalQuantity=useSelector(state=>state.item?.totalQuantity)
    const cartItems=useSelector((state)=>state.item.cartItems)
    const totalQuantity = cartItems?.reduce((p,c)=>p+c.quantity,0)
    const [showDialog,setDialog]=useState(false);
    // console.log("totalQunatity",totalQuantity)
    const stickyHeader=()=>{
        window.addEventListener('scroll',()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                refHeader?.current?.classList.add('sticky_header')
                refHeader?.current?.classList.remove('nav_wrapper')
            }else{
                refHeader?.current?.classList.remove('sticky_header')
                refHeader?.current?.classList.add('nav_wrapper')
            }
        })
    }
    useEffect(()=>{
        stickyHeader()
        return ()=> window.removeEventListener('scroll',stickyHeader)
    })
    const handleCartList=()=>{
        navigate('/cart')
    }
    const nav_links=[
        {
            display:"Home",
            link:'home'
        },
        {
            display:"Shop",
            link:'shop'
        },
        {
            display:"Cart",
            link:'cart'
        }
    ]
  return (
    <div style={{display:"flex",alignItems:"center",background:'white'}} className='site-nav' id='site-nav' ref={refHeader}>
        <Container>
            <Row>
                <div className="nav_wrapper navbar navbar-expand-lg"  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div className="logo" style={{gap:10}} onClick={()=>navigate('/home')}>
                            <img src={logo} className='logo-icon' alt="" />
                            <h5 style={{fontWeight:'bold'}}>Shop.com</h5>
                            
                        </div>
                        <div class="navbar-toggler border-0" style={{background:'#07162e',color:'white',borderRadius:'20px'}} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="bi bi-list menu-icon"></i>
                        </div>
                    </div>
                    {
                        userType == "admin" ? null :  
                        <div className='collapse navbar-collapse navigation' id="navbarSupportedContent" style={{justifyContent:'end',background:'white'}}>
                        <ul className='nav_links navbar-nav mb-lg-0'>
                            {
                                nav_links.map((item,index)=>(
                                    <li className='nav_item nav-item'>
                                <NavLink to={"/"+item.link} className={(navClass)=>navClass.isActive ? 'nav_links_active nav-link' : 'nav-link'}>{item.display}</NavLink>
                            </li>
                                ))
                            }
                            {/* <li className='nav_item'>
                                <NavLink to='home'>Home</NavLink>
                            </li>
                            <li className='nav_item'>
                                <NavLink to='shop'>Shop</NavLink>
                            </li>
                            <li className='nav_item'>
                                <NavLink to='cart'>Cart</NavLink>
                            </li> */}
                            
                        </ul>
                    </div>
                    }
                    
                    <div className="user_details" style={{position:'relative'}}>
                        {
                            userType == "admin" ? null : 
                            <motion.span whileTap={{scale:1.2}} className='bag_icon' onClick={handleCartList}>
                        <i class="ri-shopping-bag-line"></i>
                        <span className='bag_icon_noti'>{totalQuantity}</span>
                        </motion.span>
                        }
                        <div onClick={()=>setDialog(!showDialog)} style={{display:"flex",gap:"15px",alignItems:"center",cursor:"pointer"}}>
                                <div className='user_icon'>
                                    <motion.img whileTap={{scale:1.1}} src={user_icon} alt="" />
                                </div>
                                <div>
                                    {userName}
                                </div>
                        </div>
                        {
                        showDialog && (<HeaderDropDown/>)
                        }
                        
                    </div>
                    
                    <div className="mobile_menu">
                        <span>
                            <i class="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}
