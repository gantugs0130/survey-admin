import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchUser } from "../api/mainApi";
import { message } from "antd";

const initialState = {
    user: {},
    loading: true,
};

export const getUserData = createAsyncThunk("main/getUserData", async () => {
    let response = await fetchUser();
    return response;
});

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                let result = action.payload?.result || {};
                state.loading = false;
                state.user = result || null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

const getMain = createSelector([(state) => state.main], (main) => main);
const getUser = createSelector([getMain], ({ user, loading }) => ({
    user,
    loading,
}));
export const mainSelectors = { getMain, getUser };

export default mainSlice.reducer;
