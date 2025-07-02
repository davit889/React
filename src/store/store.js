import { configureStore } from '@reduxjs/toolkit';
import productSlice from "./reducers/productsReducer/slice.js";
import cartSlice from "./reducers/cartReducer/slice.js";

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice
  }
});

export default store;
