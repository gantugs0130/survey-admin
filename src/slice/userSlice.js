import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchList } from "../api/userApi";
import { message } from "antd";

const filterInit = {
    id: "",
    username: "",
    email: "",
    phone: "",
};

const initialState = {
    //User List
    state: "loading",
    users: [],
    size: 20,
    totalElements: 0,
    number: 0,

    filter: { ...filterInit },
};

export const getUsers = createAsyncThunk("users/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            state.filter[action.payload.name] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getUsers.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.users = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getUsers.rejected, (state, action) => {
                action.error && message.error(action.error.message);
                state.state = "error";
            });
    },
});

export const { changeSize, setFilter } = userSlice.actions;

const getUser = createSelector([(state) => state.user], (user) => user);
const getList = createSelector(
    [getUser],
    ({ users, state, filter, size, totalElements, number }) => ({
        users,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
export const userSelectors = { getUser, getList };

export default userSlice.reducer;
