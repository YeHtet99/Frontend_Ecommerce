import { toast } from "react-toastify"
import { baseUrl } from "../../api/url";
export const itemSuccess = (item) => 
  ({
  
  type: 'ADD_TO_CART',
  payload: item,
});
export const removeItem = (item) => 
  ({
  
  type: 'REMOVE_FROM_CART',
  payload: item,
});
export const addItem = (credentials) => {
    console.log("addItem",credentials)
    // const navigate =useNavigate();
    return async (dispatch) => {
      try {
        const result=await fetch(baseUrl+"add_item", {
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
              dispatch(itemSuccess(data?.payload));            
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
  export const getItem = (id)=>{
    return async (dispatch) => {
      try {
        await fetch(baseUrl+"get_item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
          },
          body:JSON.stringify({ownerId:id})
        })
        // console.log("result in item actions",result)
          .then((res) => res.json())
          .then((data) => {
            if(data.success == true){
              console.log("item data======>",data)
              dispatch(itemSuccess(data?.payload));            
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
  export const removeFromCart = (id,ownerId) => {
    console.log("remove item",id,ownerId)
    const data={
      id,ownerId
    }
    return async (dispatch) => {
      try {
        await fetch(baseUrl+"delete_item", {
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
              dispatch(itemSuccess(data?.payload));            
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