import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [

  ]

};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    }
  },
  selectors: {
    selectProductsList: (state) => state.products.items
  }
})
export default productSlice.reducer
export const { setProducts } = productSlice.actions
export const { selectProductsList } = productSlice.selectors