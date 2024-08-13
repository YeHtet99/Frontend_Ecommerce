// authReducers.js
import { Cookies } from "react-cookie";
const cookies=new Cookies();
const initialState = {
    isAuthenticated: cookies.get('auth'),
    userId:cookies.get('userId'),
    userName:cookies.get('userName'),
    user: null,
    error: null,
  };

  
  const authReducers = (state = initialState, action) => {
    console.log("actin.payload",action.payload)
    switch (action.type) {
      
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: cookies.get('auth'),
          user: action.payload,
          userId:cookies.get('userId'),
          userName:cookies.get('userName'),
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducers;
  