import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";

export default configureStore({
  reducer: {
    films: filmsSlice
    
  }
})