import React from 'react'
import { Routes,Route, useSearchParams } from 'react-router-dom'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import CheckOut from '../pages/Checkout'
import Home from '../pages/Home'
import TempHome from '../pages/TempHome'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProuductDetails'
import Signup from '../pages/Singup'
import Profile from '../pages/Profile'
import Admin from '../pages/Admin'
import ChangePw from '../pages/ChangePw'
import Voucher from '../pages/Vouncher'
import { useSelector } from 'react-redux'
import { AuthInterceptor } from '../util/AuthInterceptor'
import { Cookies } from 'react-cookie'


export default function Routers() {
  const cookies=new Cookies();
  const isAuthenticated=cookies.get('token')
  const userType = cookies.get('userType')
  console.log("is auth",isAuthenticated)
  // AuthInterceptor();
  console.log("auth",isAuthenticated && userType != "undefined",userType != "undefined")
  return (
    <div>
        <Routes>
        <Route
              path="*"
              element={
                isAuthenticated && userType == 'admin' ? <Admin/> : isAuthenticated ? <Home/> :  <Login/>
              }/>
            <Route path = '' element={isAuthenticated && userType == 'admin' ? <Admin/> : isAuthenticated ? <Home/> :  <Login/>}></Route>
            <Route path = 'home' element={
              isAuthenticated && userType == 'admin' ? <Admin/> : isAuthenticated ? <Home/> :  <Login/>
              }></Route>
            <Route path = 'login' element={<Login></Login>}></Route>
            <Route path = 'cart' element={ isAuthenticated ? <Cart/> : <Login/>}></Route>
            <Route path = 'checkout' element={ isAuthenticated ? <CheckOut/> : <Login/>}></Route>
            {/* <Route path = 'home' element={isAuthenticated ? <TempHome/> : <Login/>}></Route> */}
            <Route path = 'shop' element={isAuthenticated ? <Shop/> : <Login/>}></Route>
            <Route path = 'shop/:id' element={isAuthenticated ? <ProductDetails/> : <Login/>}></Route>
            <Route path = 'register' element={<Signup></Signup>}></Route>
            <Route path = 'profile' element={isAuthenticated ? <Profile/> : <Login/>}></Route>
            {/* <Route path = 'vouncher' element={isAuthenticated ? <Voucher/> : <Login/>}></Route> */}

            <Route path = 'admin' element={isAuthenticated && userType == 'admin' ? <Admin/> : isAuthenticated ? <Home/> :  <Login/>}></Route>
            {/* <Route path='admin' element={<Admin/>}></Route> */}
            <Route path = 'change_password' element={isAuthenticated ? <ChangePw/> : <Login/>}></Route>            
        </Routes>
    </div>
  )
}
