import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import {
    fetchList,
    fetchMerchants,
    fetchBillingRule,
    fetchBusinessHours,
    fetchSubmitOutletSave,
    fetchSubmitOutletSaveEdit,
} from "../api/outletApi";
import { message } from "antd";

const outletInit = {
    // OUTLET
    outletLoading: false,
    outletModal: false,
    merchantsLoading: true,
    merchants: [],
    billingLoading: true,
    hoursLoading: true,
    editType: "all",
    outlet: {
        id: 0,
        address1: "",
        address2: "",
        billingRule: {
            boostAmount: 0,
            deposit: 0,
            freeTime: 0, //minut
            maxRentalTime: 0, //hours
            price: 0,
            pricePerTime: 0, //minut
        },
        businessHours: [],
        city: "",
        lat: 0,
        log: 0,
        merchantId: "",
        outletName: "",
    },
};
const filterInit = {
    id: "",
    outletName: "",
    "staff.id": "",
};

const initialState = {
    //Outlet List
    state: "loading",
    outlets: [],
    size: 20,
    totalElements: 0,
    number: 0,

    ...outletInit,
    saveLoading: false,

    filter: { ...filterInit },
};

export const getOutlets = createAsyncThunk("outlets/get", async (data) => {
    let response = await fetchList(data);
    return response;
});
export const getMerchants = createAsyncThunk("outlets/get/merchants", async (data) => {
    let response = await fetchMerchants(data);
    return response;
});
export const getBillingRule = createAsyncThunk("outlets/get/rules", async (data) => {
    let response = await fetchBillingRule(data);
    return response;
});
export const getBusinessHours = createAsyncThunk("outlets/get/hours", async (data) => {
    let response = await fetchBusinessHours(data);
    return response;
});
export const onSubmitOutletSave = createAsyncThunk("outlets/save/new", async (data) => {
    let response = await fetchSubmitOutletSave(data);
    return response;
});
export const onSubmitOutletSaveEdit = createAsyncThunk("outlets/save/edit", async (data) => {
    let response = await fetchSubmitOutletSaveEdit(data);
    return response;
});

export const outletSlice = createSlice({
    name: "outlet",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            state.filter[action.payload.name] = action.payload.value;
        },

        //OUTLET
        setOutletModal: (state, action) => {
            state.outletModal = action.payload.value;
            if (action.payload.type) {
                state.editType = action.payload.type;
            }
            if (action.payload.outlet) {
                state.outlet = action.payload.outlet;
            }
        },
        onChangeHandlerOutlet: (state, action) => {
            state.outlet[action.payload.name] = action.payload.value;
        },
        onChangeHandlerOutletBilling: (state, action) => {
            state.outlet.billingRule[action.payload.name] = action.payload.value;
        },
        outletHandleCancel: (state) => {
            Object.keys(outletInit).map((keyName) => (state[keyName] = outletInit[keyName]));
        },
        addBusinessTime: (state, action) => {
            state.outlet["businessHours"] = [
                ...current(state.outlet["businessHours"]),
                action.payload,
            ];
        },
        changeTime: (state, action) => {
            state.outlet["businessHours"] = current(state.outlet["businessHours"]).map(
                (aa, ind) => {
                    if (ind === action.payload.index) {
                        return {
                            ...aa,
                            [action.payload.name]: action.payload.value,
                        };
                    } else {
                        return aa;
                    }
                }
            );
        },
        removeBusinessTime: (state, action) => {
            state.outlet["businessHours"] = current(state.outlet["businessHours"]).filter(
                (aa, ind) => {
                    if (ind === action.payload.index) {
                        return false;
                    } else {
                        return true;
                    }
                }
            );
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getOutlets.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getOutlets.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.outlets = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getOutlets.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(getMerchants.pending, (state) => {
                state.merchantsLoading = true;
            })
            .addCase(getMerchants.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.merchantsLoading = false;
                    state.merchants = result.content || [];
                } else {
                    state.merchantsLoading = false;
                }
            })
            .addCase(getMerchants.rejected, (state, action) => {
                state.merchantsLoading = false;
            })

            .addCase(getBillingRule.pending, (state) => {
                state.billingLoading = true;
            })
            .addCase(getBillingRule.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.billingLoading = true;
                    state.outlet.billingRule = {
                        ...current(state.outlet.billingRule),
                        ...JSON.parse(result.defaultBillingRule),
                    };
                } else {
                    state.billingLoading = false;
                }
            })
            .addCase(getBillingRule.rejected, (state, action) => {
                state.billingLoading = false;
            })

            .addCase(getBusinessHours.pending, (state) => {
                state.hoursLoading = true;
            })
            .addCase(getBusinessHours.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.hoursLoading = false;
                    state.outlet.businessHours = JSON.parse(result.businessHours);
                } else {
                    state.hoursLoading = false;
                }
            })
            .addCase(getBusinessHours.rejected, (state, action) => {
                state.hoursLoading = false;
            })

            .addCase(onSubmitOutletSave.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(onSubmitOutletSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    Object.keys(outletInit).map(
                        (keyName, i) => (state[keyName] = outletInit[keyName])
                    );
                    state.saveLoading = false;
                    state.outlets = [result, ...current(state.outlets)];
                } else {
                    state.saveLoading = false;
                }
            })
            .addCase(onSubmitOutletSave.rejected, (state, action) => {
                state.saveLoading = false;
            })

            .addCase(onSubmitOutletSaveEdit.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(onSubmitOutletSaveEdit.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    Object.keys(outletInit).map(
                        (keyName, i) => (state[keyName] = outletInit[keyName])
                    );
                    state.saveLoading = false;
                    state.outlets = current(state.outlets).map((aa) => {
                        if (aa.id === action.meta?.arg?.outlet.id) {
                            if (action.meta?.arg?.editType === "billing") {
                                return {
                                    ...aa,
                                    billingRule: result,
                                };
                            } else if (action.meta?.arg?.editType === "time") {
                                return {
                                    ...aa,
                                    businessHours: result,
                                };
                            } else if (action.meta?.arg?.editType === "basic") {
                                return {
                                    ...aa,
                                    ...result,
                                };
                            }
                        } else {
                            return aa;
                        }
                    });
                } else {
                    state.saveLoading = false;
                }
            })
            .addCase(onSubmitOutletSaveEdit.rejected, (state, action) => {
                state.saveLoading = false;
            });
    },
});

export const {
    changeSize,
    setFilter,
    onChangeHandlerOutlet,
    outletHandleCancel,
    setOutletModal,
    addBusinessTime,
    onChangeHandlerOutletBilling,
    changeTime,
    removeBusinessTime,
} = outletSlice.actions;

const getOutlet = createSelector([(state) => state.outlet], (outlet) => outlet);
const getList = createSelector(
    [getOutlet],
    ({ outlets, state, filter, size, totalElements, number }) => ({
        outlets,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
const getOutletData = createSelector(
    [getOutlet],
    ({
        outletLoading,
        outletModal,
        outlet,
        merchantsLoading,
        merchants,
        billingLoading,
        hoursLoading,
        saveLoading,
        editType,
    }) => ({
        outletLoading,
        outletModal,
        outlet,
        merchantsLoading,
        merchants,
        billingLoading,
        hoursLoading,
        saveLoading,
        editType,
    })
);
export const outletSelectors = { getOutlet, getList, getOutletData };

export default outletSlice.reducer;
