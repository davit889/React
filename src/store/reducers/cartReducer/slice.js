import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
