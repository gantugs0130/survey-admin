import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import {
    fetchList,
    fetchSubmitStaffSave,
    fetchToggle,
    fetchSubmitStaffUpdate,
} from "../api/staffApi";
import { message } from "antd";

const filterInit = {
    id: "",
    username: "",
};

const staffInit = {
    // STAFF
    staffModal: false,
    saveLoading: false,
    updateModal: false,
    type: "",
    staff: {
        id: 0,
        username: "",
        password: "",
        confirmPassword: "",
        roleId: "",

        //vendor
        clientId: "",
        clientSecret: "",
        webhookUrl: "",

        //merchant //vendor
        name: "",
        phone: "",
        address: "",
    },
};

const initialState = {
    //Staff List
    state: "loading",
    staffs: [],
    size: 20,
    totalElements: 0,
    number: 0,
    ...staffInit,
    filter: { ...filterInit },
};

export const getStaffs = createAsyncThunk("staffs/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const onSubmitStaffSave = createAsyncThunk("staffs/save", async (data) => {
    let response = await fetchSubmitStaffSave(data);
    return response;
});

export const toggleAccount = createAsyncThunk("staffs/toggle", async (data) => {
    let response = await fetchToggle(data);
    return response;
});

export const onSubmitUpdateSave = createAsyncThunk("staffs/update", async (data) => {
    let response = await fetchSubmitStaffUpdate(data);
    return response;
});

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            state.filter[action.payload.name] = action.payload.value;
        },

        //STAFF
        setStaffModal: (state, action) => {
            if (action.payload.staff) {
                state.updateModal = action.payload.value;
                state.staff = action.payload.staff;
                state.type = action.payload.type;
            } else {
                state.staffModal = action.payload.value;
            }
        },
        onChangeHandlerStaff: (state, action) => {
            state.staff[action.payload.name] = action.payload.value;
        },
        staffHandleCancel: (state) => {
            Object.keys(staffInit).map((keyName) => (state[keyName] = staffInit[keyName]));
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getStaffs.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getStaffs.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.staffs = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getStaffs.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(onSubmitStaffSave.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(onSubmitStaffSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    Object.keys(staffInit).map(
                        (keyName, i) => (state[keyName] = staffInit[keyName])
                    );
                    state.saveLoading = false;
                    if (result?.role?.id !== 5 && result?.role?.id !== 6) {
                        state.staffs = [result, ...current(state.staffs)];
                    }
                } else {
                    state.saveLoading = false;
                }
            })
            .addCase(onSubmitStaffSave.rejected, (state, action) => {
                state.saveLoading = false;
            })

            .addCase(toggleAccount.fulfilled, (state, action) => {
                state.staffs = current(state.staffs)?.map((aa) => {
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

            .addCase(onSubmitUpdateSave.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(onSubmitUpdateSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    console.log(result);
                    Object.keys(staffInit).map(
                        (keyName, i) => (state[keyName] = staffInit[keyName])
                    );
                    state.saveLoading = false;
                    if (result?.role?.id !== 5 && result?.role?.id !== 6) {
                        state.staffs = current(state.staffs)?.map((aa) => {
                            if (aa.id === result.id) {
                                return result;
                            } else {
                                return aa;
                            }
                        });
                    }
                } else {
                    state.saveLoading = false;
                }
                message.success("Saved successfully");
            })
            .addCase(onSubmitUpdateSave.rejected, (state, action) => {
                state.saveLoading = false;
            });
    },
});

export const { changeSize, setFilter, onChangeHandlerStaff, staffHandleCancel, setStaffModal } =
    staffSlice.actions;

const getStaff = createSelector([(state) => state.staff], (staff) => staff);
const getList = createSelector(
    [getStaff],
    ({ staffs, state, filter, size, totalElements, number }) => ({
        staffs,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
const getStaffData = createSelector(
    [getStaff],
    ({ staffModal, updateModal, staff, saveLoading, type }) => ({
        staffModal,
        updateModal,
        staff,
        saveLoading,
        type,
    })
);
export const staffSelectors = { getStaff, getList, getStaffData };

export default staffSlice.reducer;
