// import React from "react";
// import ReactDOM from "react-dom/client";
// import "remixicon/fonts/remixicon.css";
// import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter } from "react-router-dom";
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import App from "./App";
// import store from "./redux/store";
// import { Provider } from "react-redux";

// import { ToastContainer } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const tempStore=createStore(store,applyMiddleware(thunk))
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//         <Provider store={tempStore}>
//         <ToastContainer
//         theme="dark"
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
        
//         rtl={false}
//        pauseOnHover={false} />
//         <App />
//         </Provider>
//     </BrowserRouter>
    
//   </React.StrictMode>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store)
// const tempStore=createStore(store,applyMiddleware(thunk))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        
        rtl={false}
       pauseOnHover={false} />
        <App />
        </PersistGate>
        </Provider>
    </BrowserRouter>
    
  </React.StrictMode>
);

