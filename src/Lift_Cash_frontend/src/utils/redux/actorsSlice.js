import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actors: {
        communityActor: null,
        economyActor: null,
        // liftLedgerActor: null,
        // promoLedgerActor: null,
    },
};

export const actorsSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {
        setActors: (state, action) => {
            state.actors = action.payload;
        },
        clearActors: (state) => {
            state.actors = [];
        },
    },
});

export const { setActors,clearActors } = actorsSlice.actions;

export default actorsSlice.reducer;