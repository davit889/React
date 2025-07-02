import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
   
  ]

};
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts:(state,action)=>{
      state.items =action.payload
    }
  }
})
export default productSlice.reducer
export const {setProducts}=productSlice.actions