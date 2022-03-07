import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import { fetchData, fetchSave } from "../api/settingApi";

const initialState = {
    state: "loading",
    data: {},
    saveLoading: false,
};

export const getData = createAsyncThunk("settings/get", async (data) => {
    let response = await fetchData(data);
    return response;
});

export const onSave = createAsyncThunk("settings/save", async (data) => {
    let response = await fetchSave(data);
    return response;
});

export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        onChangeHandlerSetting: (state, action) => {
            state.data[action.payload.name] = action.payload.value;
        },
        onChangeHandlerSettingBilling: (state, action) => {
            state.data.defaultBillingRule[action.payload.name] = action.payload.value;
        },
        addBusinessTime: (state, action) => {
            state.data["businessHours"] = [...current(state.data["businessHours"]), action.payload];
        },
        changeTime: (state, action) => {
            state.data["businessHours"] = current(state.data["businessHours"]).map((aa, ind) => {
                if (ind === action.payload.index) {
                    return {
                        ...aa,
                        [action.payload.name]: action.payload.value,
                    };
                } else {
                    return aa;
                }
            });
        },
        removeBusinessTime: (state, action) => {
            state.data["businessHours"] = current(state.data["businessHours"]).filter((aa, ind) => {
                if (ind === action.payload.index) {
                    return false;
                } else {
                    return true;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getData.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getData.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    if (result?.defaultBillingRule) {
                        state.data = {
                            ...current(state.data),
                            defaultBillingRule: JSON.parse(result.defaultBillingRule),
                        };
                    } else if (result?.businessHours) {
                        state.data = {
                            ...current(state.data),
                            businessHours: JSON.parse(result.businessHours),
                        };
                    } else {
                        state.data = {
                            ...current(state.data),
                            ...(result || {}),
                        };
                    }
                } else {
                    state.state = "error";
                }
            })
            .addCase(getData.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(onSave.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(onSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.saveLoading = false;
                    state.data = result || {};
                } else {
                    state.saveLoading = false;
                }
            })
            .addCase(onSave.rejected, (state, action) => {
                state.statesaveLoading = false;
            });
    },
});

export const {
    onChangeHandlerSetting,
    onChangeHandlerSettingBilling,
    addBusinessTime,
    changeTime,
    removeBusinessTime,
} = settingSlice.actions;
const getSetting = createSelector([(state) => state.setting], (setting) => setting);
const getList = createSelector([getSetting], ({ data, state, saveLoading }) => ({
    data,
    state,
    saveLoading,
}));
export const settingSelectors = { getSetting, getList };

export default settingSlice.reducer;
