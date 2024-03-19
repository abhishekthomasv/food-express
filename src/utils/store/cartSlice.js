import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { item, qty, id } = action.payload;
      state.items.push({ item, qty, id });
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;

      state.items = state.items
        .map((item) => {
          if (item.item.card.info.id === id) {
            if (qty === 0) {
              return null; // Remove the item
            } else {
              return { ...item, qty }; // Update the quantity
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null); // Filter out null items
    },
    deleteItem: (state, action) => {
      const { id } = action.payload;

      state.items = state.items.filter((item) => item.item.card.info.id !== id);
    },
    clearItems: (state, action) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, deleteItem, clearItems, updateQty } = cartSlice.actions;
export default cartSlice.reducer;
