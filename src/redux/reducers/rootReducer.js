import { combineReducers } from 'redux';
import authReducers from './authReducers';
import itemReducers from './itemReducers';
import productDataReducers from './productDataReducers';

const rootReducer = combineReducers({
  auth: authReducers,
  item:itemReducers,
  productData:productDataReducers
});

export default rootReducer;