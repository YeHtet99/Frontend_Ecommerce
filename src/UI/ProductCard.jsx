import React from 'react'
import { Col } from 'reactstrap'
import {motion} from 'framer-motion' 
import '../style/style.css'
import { Link } from 'react-router-dom'
import { cartActions } from '../redux/slices/cartSlices'
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux'
import { addItem,getItem } from '../api/item'
import { baseUrl } from '../api/url'
// import { addItem } from '../redux/actions/itemAction'
// import { Toast } from 'react-toastify/dist/components'

export default function ProductCard({item}) {
    const dispatch=useDispatch()
    const userID=useSelector((state)=>state.auth.userId)
    const cartItems=useSelector((state)=>state.item.cartItems)
    console.log("cartItems",cartItems)

    console.log("item check",item)
    
    console.log("user id",userID,useSelector((state)=>state.item))
    const filteredData=cartItems?.filter((v)=>v._id == item._id)
    const addToCart=async()=>{
        
        // if(filteredData.length > 0){
        //     toast.error(`${item.productName} is also added in the cart.`)
        // }else{
            const data = await addItem({
                id:item._id,
                productName:item.productName,
                price:item.price,
                imgUrl:item.imgUrl,
                userId:userID
            })
            console.log("data in product card",data)
            if(data?.success == true){
                toast.success("Successfully Added.")
                dispatch(cartActions.getItem(data?.payload))
            }else{
                toast.error(data?.message)
            }
            // toast.success("Successfully Added.")
            // const itemData=await getItem(userID)
            // dispatch(cartActions.addItem(item))
            // itemData?.map((item)=>{
            //     dispatch(cartActions.addItem(item))
            // })
            
        // }
        
        // dispatch(cartActions.addItem({
        //     id:item.id,
        //     productName:item.productName,
        //     price:item.price,
        //     imgUrl:item.imgUrl,
        //     userId:userID
        // }))
    }
    
  return (
    <Col lg='3' md='4' style={{marginBottom:20}}>
        <div className='product_card' style={{padding:'20px'}}>
            <motion.span whileHover={{scale:0.9}} className='product_card_img'>
                <img  src={baseUrl+item.imgUrl} alt="" style={{width:'100%',height:250,objectFit:'cover'}} />
            </motion.span>
            <div style={{display:'flex',alignItems:'end',justifyContent:'space-between'}}>
            <div>
            <h5 className='px-2 py-2' style={{fontWeight:'28px'}}>
                {/* <Link to={`/shop/${item._id}`}> */}
                {item.productName}
                {/* </Link> */}
            </h5>
            {/* <p className='px-2 text-start' style={{fontWeigth:'bold'}}>{item.category}</p> */}
            {/* <span className='px-2 product_card_price'> */}
                <p className='px-2' style={{textAlign:'start'}}>${item.price}</p>
                </div>
                <motion.span whileTap={{scale:1.3}} onClick={()=>addToCart()}>
                <i  class="ri-add-circle-fill" style={{cursor:'pointer',fontSize:'44px'}}></i>
                </motion.span>
                </div>
            {/* </span> */}
        </div>
    </Col>
  )
}
