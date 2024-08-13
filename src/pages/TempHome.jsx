import React, { useEffect } from 'react'
import '../style/style.css'
import { Cookies } from 'react-cookie'





export default function TempHome() {
    const cookies=new Cookies();
    const userName =  cookies.get('userName')
   
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>  
        <div>
            <h4>Hi , {userName}</h4>
            <p style={{color:'black'}}>Welcome from the Shop.com</p>
        </div>
        
    </div>
  )
}
