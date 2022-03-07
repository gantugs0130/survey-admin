import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchList, fetchSubmitCredSave, fetchCredGet } from "../api/vendorApi";
import { toggleAccount, onSubmitStaffSave, onSubmitUpdateSave } from "./staffSlice";
import { message } from "antd";

const filterInit = {
    id: "",
    username: "",
    "role.id": 5,
};
const credInit = {
    // CRED
    credModal: false,
    credSaveLoading: false,
    credLoading: true,
    cred: {
        id: 0,
        authClientId: "",
        authClientSecret: "",
        clientId: "",
        clientSecret: "",
        webhookUrl: "",
    },
};

const initialState = {
    //Vendor List
    state: "loading",
    vendors: [],
    size: 20,
    totalElements: 0,
    number: 0,
    filter: { ...filterInit },
    ...credInit,
};

export const getVendors = createAsyncThunk("vendors/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const getCredInfo = createAsyncThunk("vendors/cred/get", async (data) => {
    let response = await fetchCredGet(data);
    return response;
});

export const onSubmitCredSave = createAsyncThunk("vendors/cred/save", async (data) => {
    let response = await fetchSubmitCredSave(data);
    return response;
});

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            state.filter[action.payload.name] = action.payload.value;
        },
        credHandleCancel: (state) => {
            Object.keys(credInit).map((keyName) => (state[keyName] = credInit[keyName]));
        },

        onChangeHandlerCred: (state, action) => {
            state.cred[action.payload.name] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getVendors.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getVendors.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.vendors = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getVendors.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(onSubmitStaffSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success && result?.role?.id === 5) {
                    state.vendors = [result, ...current(state.vendors)];
                }
            })

            .addCase(onSubmitUpdateSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success && result?.role?.id === 5) {
                    state.vendors = current(state.vendors)?.map((aa) => {
                        if (aa.id === result.id) {
                            return result;
                        } else {
                            return aa;
                        }
                    });
                }
            })

            .addCase(toggleAccount.fulfilled, (state, action) => {
                state.vendors = current(state.vendors)?.map((aa) => {
                    if (aa.id === action.payload) {
                        return {
                            ...aa,
                            isEnabled: !aa.isEnabled,
                        };
                    } else {
                        return aa;
                    }
                });
            })

            .addCase(getCredInfo.pending, (state) => {
                state.credLoading = true;
                state.credModal = true;
            })
            .addCase(getCredInfo.fulfilled, (state, action) => {
                let id = action.meta.arg.id;
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.credLoading = false;
                    state.cred = { id, ...result } || {};
                } else {
                    state.credLoading = false;
                }
            })
            .addCase(getCredInfo.rejected, (state, action) => {
                state.credLoading = false;
            })

            .addCase(onSubmitCredSave.fulfilled, (state, action) => {
                Object.keys(credInit).map((keyName) => (state[keyName] = credInit[keyName]));
                message.success("Saved successfully");
            });
    },
});

export const { changeSize, setFilter, credHandleCancel, onChangeHandlerCred } = vendorSlice.actions;

const getVendor = createSelector([(state) => state.vendor], (vendor) => vendor);
const getList = createSelector(
    [getVendor],
    ({ vendors, state, filter, size, totalElements, number }) => ({
        vendors,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
const getCred = createSelector(
    [getVendor],
    ({ credModal, credLoading, credSaveLoading, cred }) => ({
        credModal,
        credLoading,
        credSaveLoading,
        cred,
    })
);

export const vendorSelectors = { getVendor, getList, getCred };

export default vendorSlice.reducer;
