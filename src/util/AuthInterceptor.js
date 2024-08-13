import fetchIntercept from "fetch-intercept";

import Cookies from 'universal-cookie';
import { toast } from "react-toastify";
export const AuthInterceptor = () => {
  const cookies = new Cookies();

  fetchIntercept.register({
    request: async function (url, config) {
      let token = await cookies.get("token", { path: '/' });
      // Modify the url or config here
      if (token) {
        if (config.headers) {
          config.headers.token = token;
        }

      }
      if (!config.headers?.["Accept-Language"]) {
        if (config.headers?.["Accept-Language"]) {
          config.headers["Accept-Language"] = "en";
        }

      }

      return [url, config];
    },

    requestError: function (error) {

      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: async function (response) {
      // Modify the reponse object
      if (response.status === 403 || response.status === 500) {
        cookies.remove("userName","/")
        cookies.remove("auth","/")
        cookies.remove("userId","/")
        cookies.remove('token','/')
        cookies.remove('userType','/')
        if(response.status === 403 ){
          toast.error('No token provided!')
        }else if(response.status === 500){
          toast.error('Failed to authenticate token!')
        }
        const time = 1000
        const interval = setInterval(() => {
          window.location.pathname = "/";
        }, time);
        return () => clearInterval(interval);
      } else {
        return response;
      }
    },

    responseError: async function (error) {
      // Handle an fetch error

      return Promise.reject(error);
    },
  });
};
