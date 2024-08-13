// authReducers.js

const itemData = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const itemReducers = (state = itemData, action) => {
  console.log("item reducers",action)
  const data=action.payload;
  // const totalValue = data?.reduce((p,c)=>p+(c.count * c.price),0)
  // const totalCount =data?.reduce((p,c)=>p+c.count,0)
  switch (action.type) {
    
    case 'ADD_TO_CART':
      console.log("add to cart")
      return {
      ...state,
      cartItems:action.payload,
       totalAmount:data?.reduce((p,c)=>p+(c.count * c.price),0),
       totalQuantity : data?.reduce((p,c)=>p+c.count,0)
      };
      

      
      // const existingItemIndex = state.cartItems.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // if (existingItemIndex !== -1) {
      //   const updatedCartItems = [...state.cartItems];
      //   updatedCartItems[existingItemIndex].quantity += 1;

      //   return {
      //     ...state,
      //     cartItems: updatedCartItems,
      //     totalAmount: state.totalAmount + action.payload.price,
      //     totalQuantity: state.totalQuantity + 1,
      //   };
      // } else {
      //   const newItem = {
      //     ...action.payload,
      //     quantity: 1,
      //   };

      //   return {
      //     ...state,
      //     cartItems: [...state.cartItems, newItem],
      //     totalAmount: state.totalAmount + action.payload.price,
      //     totalQuantity: state.totalQuantity + 1,
      //   };
      // }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
      cartItems:action.payload,
       totalAmount:0,
       totalQuantity : 0
      };
      // const itemToRemoveIndex = state.cartItems.findIndex(
      //   (item) => item.id === action.payload
      // );

      // if (itemToRemoveIndex !== -1) {
      //   const updatedCartItems = [...state.cartItems];
      //   const removedItem = updatedCartItems.splice(itemToRemoveIndex, 1)[0];

      //   return {
      //     ...state,
      //     cartItems: updatedCartItems,
      //     totalAmount: state.totalAmount - removedItem.price * removedItem.quantity,
      //     totalQuantity: state.totalQuantity - removedItem.quantity,
      //   };
      // }

    default:
      return state;
  }
};

export default itemReducers;

  