import { createSlice } from "@reduxjs/toolkit";

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    cost: 0,
  },
  reducers: {
    updateDeliveryCost: (state, action) => {
      const { deliveryCost } = action.payload;
      state.cost = deliveryCost;
    },
  },
});

export const { updateDeliveryCost } = deliverySlice.actions;
export default deliverySlice.reducer;
