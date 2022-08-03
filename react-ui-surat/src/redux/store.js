import { configureStore } from "@reduxjs/toolkit"; 
import userReducer from "./userSlice";
import counterReducer from "./counterSlice"; 

const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  },
});

export default store;