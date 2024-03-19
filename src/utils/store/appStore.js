import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import deliveryReducer from "./deliverySlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    location: locationReducer,
    delivery: deliveryReducer,
  },
});

export default appStore;
