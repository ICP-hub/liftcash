import actorsSlice from "./actorsSlice";
import themeSlice from "./themeSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    actors: actorsSlice,
    theme: themeSlice,
  },
});

export default store;
