import { configureStore } from "@reduxjs/toolkit";
import Api from "./slice/Api";



const store = configureStore({
  reducer: {
  todo:Api,
  },
});
export default store;
