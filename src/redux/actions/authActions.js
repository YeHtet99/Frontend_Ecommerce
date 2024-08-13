// authActions.js

import { toast } from "react-toastify"
import { Cookies } from "react-cookie"

const baseUrl= "http://localhost:8080/"


export const loginSuccess = (user) => 
  ({
  
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const LoginForm = (credentials) => {
  const cookies=new Cookies();
  return async (dispatch) => {
    try {
      await fetch(baseUrl+"login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(credentials)
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success === true){
            
            toast.success("Successfully Login")
            const {_id,userName,token,userType}=data?.payload
            cookies.set('auth', true, { path: '/' });
            cookies.set('userId',_id,{path:'/'})
            cookies.set('userName',userName,{path:'/'})
            cookies.set('token',token,{path:'/'})
            cookies.set('userType',userType,{path:'/'})
            console.log("auth data======>",data)
            dispatch(loginSuccess(data?.payload));
            window.location.pathname ='/home'
                       
          }else{
            toast.error(data.error)
          }
        })
        .catch((err) => console.log("err=====>",err));     
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };
};



export const profile = (credentials)=>{
  const cookies=new Cookies();
  return async (dispatch) => {
    try {
      await fetch(baseUrl+"profile", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        //   Accept: "*/*",
        //   "Access-Control-Allow-Origin": "*",
        // },
        body:credentials
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success === true){
            toast.success("Successfully Updated")
            cookies.set('userId',data?.payload?._id,{path:'/'})
            cookies.set('userName',data?.payload?.userName,{path:'/'})
            console.log("auth data======>",data)
            dispatch(loginSuccess(data?.payload));            
          }else{
            toast.error(data.error)
          }
        })
        .catch((err) => console.log("err=====>",err));     
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };
}
export const changePassword = (credentials,navigate)=>{
  const cookies=new Cookies();
  return async (dispatch) => {
    try {
      await fetch(baseUrl+"change_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(credentials)
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success === true){
            toast.success(data.payload)
            navigate('/home')
            
          }else{
            toast.error(data.error)
          }
        })
        .catch((err) => console.log("err=====>",err));     
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };
}
export const Logout = ()=>{
  
}
