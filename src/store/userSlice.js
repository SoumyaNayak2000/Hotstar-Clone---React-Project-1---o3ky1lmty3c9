import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: null,
        watchlist: [],
    },
    reducers: {
        getUser: (state, action) => {
            state.userDetails = action.payload;
        },
        getWatchlist: (state, action) => {
            state.watchlist = action.payload;
        },
    },
});

export const { getUser, getWatchlist } = userSlice.actions;

export default userSlice.reducer;
