import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchList } from "../api/batterieApi";
import { message } from "antd";

const filterInit = {
    id: "",
    batterySN: "",
};

const initialState = {
    //Batterie List
    state: "loading",
    batteries: [],
    size: 20,
    totalElements: 0,
    number: 0,

    filter: { ...filterInit },
};

export const getBatteries = createAsyncThunk("batteries/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const batterieSlice = createSlice({
    name: "batterie",
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

            .addCase(getBatteries.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getBatteries.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.batteries = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getBatteries.rejected, (state, action) => {
                state.state = "error";
            });
    },
});

export const { changeSize, setFilter } = batterieSlice.actions;

const getBatterie = createSelector([(state) => state.batterie], (batterie) => batterie);
const getList = createSelector(
    [getBatterie],
    ({ batteries, state, filter, size, totalElements, number }) => ({
        batteries,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
export const batterieSelectors = { getBatterie, getList };

export default batterieSlice.reducer;
