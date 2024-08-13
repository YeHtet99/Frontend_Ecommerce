import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Routers from '../routers/Routers'
export default function Layout() {
  return (
    <div>
        {/* <Header></Header> */}
        <Routers></Routers>
        {/* <Footer></Footer> */}
    </div>
  )
}
