import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    email: '',
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.email = action.payload.email;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.quantity -= 1;
        state.total -= state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const product = state.products.find(product => product.id === id);

      if (product) {
        const quantityDiff = newQuantity - product.quantity;
        product.quantity = newQuantity;
        state.total += product.price * quantityDiff;
      }
    },
  },
});

export const { addProduct, removeProduct, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
