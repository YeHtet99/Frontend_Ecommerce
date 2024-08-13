import { toast } from "react-toastify"
const baseUrl= "http://localhost:8080/"
export const productSuccess = (item) => 
  ({
  
  type: 'ADD_TO_PRODUCTS',
  payload: item,
});
export const removeProduct = (item) => 
  ({
  
  type: 'REMOVE_PRODUCTS',
  payload: item,
});
export const createProductData = (credentials) => {
    console.log("addItem",credentials)
    // const navigate =useNavigate();
    return async (dispatch) => {
      try {
        const result=await fetch(baseUrl+"create-product", {
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
            if(data.success == true){
              console.log("data======>",data)
              dispatch(productSuccess(data?.payload));            
            }
          })
          .catch((err) => console.log("err=====>",err));        
      } catch (error) {
        console.log("error",error)
        // On login failure, dispatch the failure action
        // dispatch(loginFailure(error.response.data.error));
      }
    };
  };
  export const getProductData= ()=>{
    return async (dispatch) => {
      try {
        await fetch(baseUrl+"products", {
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
              console.log("item data======>",data)
              dispatch(productSuccess(data?.payload));            
            }
          })
          .catch((err) => console.log("err=====>",err));        
      } catch (error) {
        console.log("error",error)
        // On login failure, dispatch the failure action
        // dispatch(loginFailure(error.response.data.error));
      }
    };
  }
//   export const removeFromCart = (id,ownerId) => {
//     console.log("remove item",id,ownerId)
//     const data={
//       id,ownerId
//     }
//     return async (dispatch) => {
//       try {
//         await fetch(baseUrl+"delete_item", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "*/*",
//             "Access-Control-Allow-Origin": "*",
//           },
//           body:JSON.stringify(data)
//         })
//         // console.log("result in item actions",result)
//           .then((res) => res.json())
//           .then((data) => {
//             if(data.success == true){
//               console.log("data======>",data)
//               toast.success("Successfully Deleted")
//               dispatch(itemSuccess(data?.payload));            
//             }
//           })
//           .catch((err) => console.log("err=====>",err));        
//       } catch (error) {
//         console.log("error",error)
//         // On login failure, dispatch the failure action
//         // dispatch(loginFailure(error.response.data.error));
//       }
//     };
//   };