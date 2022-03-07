import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchList } from "../api/merchantApi";
import { toggleAccount, onSubmitStaffSave, onSubmitUpdateSave } from "./staffSlice";

const filterInit = {
    id: "",
    username: "",
    "role.id": 6,
};

const initialState = {
    //Merchant List
    state: "loading",
    merchants: [],
    size: 20,
    totalElements: 0,
    number: 0,
    filter: { ...filterInit },
};

export const getMerchants = createAsyncThunk("merchants/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const merchantSlice = createSlice({
    name: "merchant",
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

            .addCase(getMerchants.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getMerchants.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.merchants = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getMerchants.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(onSubmitStaffSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success && result?.role?.id === 6) {
                    state.merchants = [result, ...current(state.merchants)];
                }
            })

            .addCase(onSubmitUpdateSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success && result?.role?.id === 6) {
                    state.merchants = current(state.merchants)?.map((aa) => {
                        if (aa.id === result.id) {
                            return result;
                        } else {
                            return aa;
                        }
                    });
                }
            })

            .addCase(toggleAccount.fulfilled, (state, action) => {
                state.merchants = current(state.merchants)?.map((aa) => {
                    if (aa.id === action.payload) {
                        return {
                            ...aa,
                            isEnabled: !aa.isEnabled,
                        };
                    } else {
                        return aa;
                    }
                });
            });
    },
});

export const { changeSize, setFilter } = merchantSlice.actions;

const getMerchant = createSelector([(state) => state.merchant], (merchant) => merchant);
const getList = createSelector(
    [getMerchant],
    ({ merchants, state, filter, size, totalElements, number }) => ({
        merchants,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);

export const merchantSelectors = { getMerchant, getList };

export default merchantSlice.reducer;
