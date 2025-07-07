// store/reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.push(product)
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.find(item => item.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item && quantity === 0) {
        return state.filter(item => item.id !== id)
      }
    }
  }
})

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions
export default cartSlice.reducer
