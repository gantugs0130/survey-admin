import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchList, fetchCancel } from "../api/orderApi";
import { message } from "antd";

const filterInit = {
    id: "",
    "rentalOutlets.outletName": "",
    "rentalOutlets.id": "",
    "battery.batterySN": "",
    "customer.username": "",
    "customer.id": "",
    orderStatus: "",
};

const initialState = {
    //Order List
    state: "loading",
    orders: [],
    size: 20,
    totalElements: 0,
    number: 0,

    filter: { ...filterInit },
};

export const getOrders = createAsyncThunk("orders/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const cancelOrder = createAsyncThunk("orders/cancel", async (data) => {
    let response = await fetchCancel(data);
    return response;
});

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            console.log(action.payload);
            state.filter[action.payload.name] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getOrders.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.orders = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(cancelOrder.pending, (state, action) => {
                let id = action.meta?.arg?.id || null;
                if (id) {
                    state.orders = current(state.orders).map((aa) => {
                        if (aa.id === id) {
                            return {
                                ...aa,
                                laoding: true,
                            };
                        } else {
                            return aa;
                        }
                    });
                }
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                let id = action.meta?.arg?.id || null;
                state.orders = current(state.orders).map((aa) => {
                    if (aa.id === id) {
                        return {
                            ...aa,
                            laoding: false,
                            orderStatus: success ? "CANCELED_ORDER" : aa.orderStatus,
                        };
                    } else {
                        return aa;
                    }
                });
            });
    },
});

export const { changeSize, setFilter } = orderSlice.actions;

const getOrder = createSelector([(state) => state.order], (order) => order);
const getList = createSelector(
    [getOrder],
    ({ orders, state, filter, size, totalElements, number }) => ({
        orders,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
export const orderSelectors = { getOrder, getList };

export default orderSlice.reducer;
