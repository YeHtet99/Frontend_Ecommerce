//redux toolkit
// import { configureStore } from "@reduxjs/toolkit";
// import cartSlices from "./slices/cartSlices";
// import { combineReducers } from 'redux';

// const store=configureStore({
//     reducer:{
//         cart:cartSlices
//     }
// })

// export default store;

//redux
// import { combineReducers } from 'redux';
// import authReducers from '../redux/reducers/authReducers';
// import itemReducers from './reducers/itemReducers';
// console.log("item reducers in store",itemReducers)

// const store = combineReducers({
//   auth: authReducers,
//   item:itemReducers
// });

// export default store;


//redux and redux-persist
// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from './reducers/rootReducer';
// import persistState from 'redux-localstorage';

// const persistConfig = {
//   key: 'root', // Key for local storage
//   paths: ['item', 'user', 'auth'], // Specify the fields to persist
// };

// const storage = window.localStorage;
// const storageMiddleware = persistState(persistConfig, storage);

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(/* other middlewares if needed */),
//     storageMiddleware // Add the redux-localstorage enhancer
//   )
// );

// export default store;
// import {createStore} from 'redux';
// import rootReducer from './reducers/rootReducer';
// const store =createStore({
//   reducer:rootReducer
// })
// export default store;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducers from './reducers/authReducers';
// import itemReducers from './reducers/itemReducers';
import itemReducers from './slices/cartSlices';
import productDataReducers from './slices/productDataSlices'
// import rootReducer from './reducers/rootReducer';

import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfig={
  key:"root",
  version:1,
  storage
}
const reducer =combineReducers({
  item:itemReducers,
  auth:authReducers,
  productData:productDataReducers
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store =configureStore({
  reducer:persistedReducer
})

// export const purgeAuthState = () => {
//   persistStore(store).purge(['auth']); // 'auth' should match the key used in your persistConfig
// };
export default store;