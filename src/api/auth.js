import { toast } from "react-toastify"
import { Cookies } from "react-cookie"
export const baseUrl= "http://localhost:8080/"


export const SignUp=async(username,email,password)=>{
  const userData ={
    username,
    email,
    password}
    // userData.userType = 'admin'
    // const [setCookie] = useCookies();
    const cookies=new Cookies();
    return await fetch(baseUrl+"signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(userData)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data",data)
          if(data.success == true){
            const {userName,password,_id,token}=data.payload
            toast.success("Successfully Created")
            // cookies.set('auth', true, { path: '/' });
            // cookies.set('userId',_id,{path:'/'})
            // cookies.set('userName',userName,{path:'/'})
            // cookies.set('token',token,{path:'/'})
            // window.location.pathname = '/home'
          }
        })
        .catch((err) => console.log("err=====>",err));
}
export const Login_api=async(email,password)=>{
  const loginData ={
    email,
    password}
    const cookies=new Cookies();


    return await fetch(baseUrl+"login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(loginData)
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success == true){
            const {userName,_id,token,userType}=data?.payload
            toast.success(data?.payload)
            cookies.set('auth', true, { path: '/' });
            cookies.set('userId',_id,{path:'/'})
            cookies.set('userName',userName,{path:'/'})
            cookies.set('token',token,{path:'/'})
            cookies.set('userType',userType,{path:'/'})
            window.location.pathname = '/home'
            console.log("data======>",data)
          }
          // console.log("data====>",data)
        })
        .catch((err) => console.log("err=====>",err));
}