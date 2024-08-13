import { toast } from "react-toastify"
import { Cookies } from "react-cookie"
const baseUrl= "http://localhost:8080/"
// import { toast } from "react-toastify"

export const addItem=async(credentials)=>{
    console.log("add item api",credentials)
    return await fetch(baseUrl+"add_item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(credentials)
      })
      // console.log("result in item actions",result)
        .then((res) => res.json())
        .then((data) => {
          return data
          // console.log("data in add item",data)
          // if(data.success == true){
          //   toast.success("Successfully Added.")
          //   // return data
                       
          // }else{
          //   return data
          // }
        })
        .catch((err) => console.log("err=====>",err)); 
}
export const updateItemQuantity = async(data)=>{
  return await fetch(baseUrl+"update-item-quantity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
    },
    body:JSON.stringify(data)
  })
  // console.log("result in item actions",result)
    .then((res) => res.json())
    .then((data) => {
      if(data.success == true){
        return data.payload
        // toast.success("Successfully Added.")           
      }
    })
    .catch((err) => console.log("err=====>",err)); 
}
export const getItem = async(userId)=>{
    
   return await fetch(baseUrl+"get_item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
          },
          body:JSON.stringify({ownerId:userId})
        })
        // console.log("result in item actions",result)
          .then((res) => res.json())
          .then((data) => {
            if(data.success == true){
              return data.payload
            }
          })
          .catch((err) => console.log("err=====>",err));        
      
    
  }
  export const getAllItem = async(userId)=>{
    
    return await fetch(baseUrl+"item_list", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Accept: "*/*",
             "Access-Control-Allow-Origin": "*",
           },
         })
         // console.log("result in item actions",result)
           .then((res) => res.json())
           .then((data) => {
             if(data.success == true){
               return data.payload
             }
           })
           .catch((err) => console.log("err=====>",err));        
       
     
   }
  export const deleteFromCart = async(id,ownerId) => {
    console.log("remove item",id,ownerId)
    const data={
      id,ownerId
    }
    
        return await fetch(baseUrl+"delete_item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
          },
          body:JSON.stringify(data)
        })
        // console.log("result in item actions",result)
          .then((res) => res.json())
          .then((data) => {
            if(data.success == true){
              console.log("data======>",data)
              toast.success("Successfully Deleted")            
            }
          })
          .catch((err) => console.log("err=====>",err));        
     
    
  };