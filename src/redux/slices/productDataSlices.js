import { createSlice } from '@reduxjs/toolkit'
import products from '../../assets/data/products';

const initialState = {
    products:[],
}

const productDataSlices = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    // addItem:(state,action)=>{
    //     const newItem=action.payload
    //     const existingItem=state.cartItems.find(item=>item.id ==  newItem.id)
    //     console.log("add item in slice",newItem,existingItem)
    //     state.totalQuantity++;
    //     if(!existingItem){
    //         console.log("if condition")
    //         state.cartItems.push({
    //             id:newItem.id,
    //             productName:newItem.productName,
    //             imgUrl:newItem.imgUrl,
    //             price:newItem.price,
    //             quantity:1,
    //             totalPrice:newItem.price
    //         })
    //     }else{
    //         existingItem.quantity++;
    //         existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
    //     }
    //     state.totalAmount = state.cartItems.reduce((total,item)=>
    //         total + (Number(item.price) * Number(item.quantity)),0
    //     )
    //     console.log("total quantity",state.totalQuantity)
    // },
    // removeItem: (state, action) => {
    //     const item = action.payload;
    //     const filteredData = state.cartItems.filter((v) => v.id === item.id);
    //     const totalAmount = state.cartItems.reduce(
    //         (total, item) => total + (Number(item.price) * Number(item.quantity)),
    //         0
    //     );
    //     console.log("filtered data",filteredData)
    
    //     if (filteredData.length > 0 && filteredData[0].quantity > 1) {
    //         // Find the index of the item in the cartItems array
    //         const itemIndex = state.cartItems.findIndex((v) => v.id === item.id);
    
    //         // Decrement the quantity of the item at the found index
    //         if (itemIndex !== -1) {
    //             state.cartItems[itemIndex].quantity--;
    //             state.totalAmount = totalAmount - item.price;
    //             state.totalQuantity = state.totalQuantity - 1;
    //         }
    //     }
    // },
    // deleteItem:(state,action)=>{
    //     const id=action.payload
    //     console.log("delete id",id)
    //     const existingItem=state.cartItems.find(item=>item.id == id)
    //     console.log("existing item",existingItem)
    //     if(existingItem){
    //         state.cartItems =state.cartItems.filter(item=>item.id != id)
    //         state.totalQuantity=state.totalQuantity - existingItem.quantity
    //     }
    //     state.totalAmount =state.cartItems.reduce((total,item)=>total + (Number(item.price) *  Number(item.quantity)),0)
        
    // },
    getProducts:(state,action)=>{
        console.log("get produts with slice",state,action)
        state.products = action.payload;
    }
  }
});

export const productDataActions = productDataSlices.actions

export default productDataSlices.reducer