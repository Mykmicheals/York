import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  lat: number | null;
  lng: number | null;
}

const initialState: initialState = {
  lat: 40.7128,
  lng: -74.006,
};

export const mapSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const { setLat, setLng } = mapSlice.actions;

const store = configureStore({
  reducer: {
    map: mapSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const mapStore = (state: RootState) => state.map;

export default store;
