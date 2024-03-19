import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: "9.9312328",
    longitude: "76.26730409999999",
    cityName: "Kochi",
  },
  reducers: {
    addLocation: (state, action) => {
      const { lat, lng, city } = action.payload;
      state.latitude = lat;
      state.longitude = lng;
      state.cityName = city;
    },
  },
});

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;
