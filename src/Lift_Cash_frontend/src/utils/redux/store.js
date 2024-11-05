import actorsSlice  from "./actorsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        actors: actorsSlice,
    },
});

export default store;