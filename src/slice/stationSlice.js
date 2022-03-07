import { createAsyncThunk, createSlice, createSelector, current } from "@reduxjs/toolkit";
import {
    fetchList,
    fetchBindOutlets,
    fetchSubmitOutletBindSave,
    fetchPopUp,
    fetchStationReset,
    fetchSubmitVolumeSave,
    fetchStationRestart,
} from "../api/stationApi";
import { message } from "antd";

const filterInit = {
    id: "",
    status: "",
    imei: "",
    "affiliatedOutlet.id": "",
};

const initialState = {
    //Station List
    state: "loading",
    stations: [],
    size: 20,
    totalElements: 0,
    number: 0,

    outletBindModal: false,
    outletBindLoading: false,
    outlets: [],
    selectedStation: {},
    slotModal: false,
    slotLoading: false,
    volumeModal: false,
    volumeLoading: false,

    filter: { ...filterInit },
};

export const getStations = createAsyncThunk("stations/get", async (data) => {
    let response = await fetchList(data);
    return response;
});

export const getBindOutlets = createAsyncThunk("stations/outlets", async (data) => {
    let response = await fetchBindOutlets(data);
    return response;
});

export const onSubmitOutletBindSave = createAsyncThunk(
    "stations/fetchSubmitOutletBindSave",
    async (data) => {
        let response = await fetchSubmitOutletBindSave(data);
        return response;
    }
);

export const popUpBattery = createAsyncThunk("stations/fetchPopUpBattery", async (data) => {
    let response = await fetchPopUp(data);
    return response;
});

export const stationReset = createAsyncThunk("stations/fetchStationReset", async (data) => {
    let response = await fetchStationReset(data);
    return response;
});

export const stationRestart = createAsyncThunk("stations/fetchStationRestart", async (data) => {
    let response = await fetchStationRestart(data);
    return response;
});

export const onSubmitVolumeSave = createAsyncThunk("stations/fetchStationVolume", async (data) => {
    let response = await fetchSubmitVolumeSave(data);
    return response;
});

export const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload.size;
            state.number = action.payload.number;
        },
        setFilter: (state, action) => {
            state.filter[action.payload.name] = action.payload.value;
        },
        setOutletBindModal: (state, action) => {
            state.outletBindModal = action.payload.value;
            if (action.payload.station) {
                state.selectedStation = action.payload.station;
            }
        },
        stationHandleCancel: (state, action) => {
            state.outletBindModal = false;
            state.outletBindLoading = false;
            state.outlets = [];
            state.selectedStation = {};
            state.slotModal = false;
            state.volumeModal = false;
            state.volumeLoading = false;
        },
        onChangeHandlerOutletBind: (state, action) => {
            state.selectedStation = {
                ...current(state.selectedStation),
                [action.payload.name]: action.payload.value,
            };
        },
        setSlotModal: (state, action) => {
            state.slotModal = action.payload.value;
            if (action.payload.station) {
                state.selectedStation = action.payload.station;
            }
        },
        setVolumeModal: (state, action) => {
            state.volumeModal = action.payload.value;
            if (action.payload.station) {
                state.selectedStation = action.payload.station;
            }
        },
        onChangeHandlerVolume: (state, action) => {
            state.selectedStation = {
                ...current(state.selectedStation),
                voiceLevel: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getStations.pending, (state) => {
                state.state = "loading";
            })
            .addCase(getStations.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.state = "done";
                    state.stations = result.content || [];
                    state.totalElements = result.totalElements || 0;
                    state.number = result.number || 0;
                } else {
                    state.state = "error";
                }
            })
            .addCase(getStations.rejected, (state, action) => {
                state.state = "error";
            })

            .addCase(getBindOutlets.pending, (state) => {
                state.outletBindLoading = true;
            })
            .addCase(getBindOutlets.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || [];
                if (success) {
                    state.outletBindLoading = false;
                    state.outlets = result || [];
                } else {
                    state.outletBindLoading = false;
                }
            })
            .addCase(getBindOutlets.rejected, (state, action) => {
                state.outletBindLoading = false;
            })

            .addCase(onSubmitOutletBindSave.pending, (state) => {
                state.outletBindSaveLoading = true;
            })
            .addCase(onSubmitOutletBindSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    state.stations = current(state.stations).map((aa) => {
                        if (aa.id === result.id) {
                            return result;
                        } else {
                            return aa;
                        }
                    });
                    state.outletBindSaveLoading = false;
                    state.outletBindModal = false;
                    state.outletBindLoading = false;
                    state.outlets = [];
                    state.selectedStation = {};
                } else {
                    state.outletBindSaveLoading = false;
                }
            })
            .addCase(onSubmitOutletBindSave.rejected, (state, action) => {
                state.outletBindSaveLoading = false;
            })

            .addCase(popUpBattery.pending, (state) => {
                state.slotLoading = true;
            })
            .addCase(popUpBattery.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    message.success("PopUp sucessfully");
                    state.selectedStation.batteries = current(
                        state.selectedStation.batteries
                    ).filter((aa) => aa.slot !== result.slot);
                    state.stations = current(state.stations).map((aa) => {
                        if (aa.id === current(state.selectedStation).id) {
                            return {
                                ...aa,
                                batteries: aa.batteries.filter((aa) => aa.slot !== result.slot),
                            };
                        } else {
                            return aa;
                        }
                    });
                    state.slotLoading = false;
                } else {
                    state.slotLoading = false;
                }
            })
            .addCase(popUpBattery.rejected, (state, action) => {
                state.slotLoading = false;
            })

            .addCase(onSubmitVolumeSave.pending, (state) => {
                state.volumeLoading = true;
            })
            .addCase(onSubmitVolumeSave.fulfilled, (state, action) => {
                let success = action.payload?.success;
                let result = action.payload?.result || {};
                if (success) {
                    message.success("Volume set sucessfully");
                    state.stations = current(state.stations).map((aa) => {
                        if (aa.id === result.id) {
                            return {
                                ...aa,
                                voiceLevel: result.level,
                            };
                        } else {
                            return aa;
                        }
                    });
                    state.volumeModal = false;
                    state.volumeLoading = false;
                } else {
                    state.volumeLoading = false;
                }
            })
            .addCase(onSubmitVolumeSave.rejected, (state, action) => {
                state.volumeLoading = false;
            })

            .addCase(stationReset.fulfilled, (state, action) => {
                let stationId = action.meta?.arg?.id;
                let success = action.payload?.success;
                let result = action.payload?.result || [];
                if (success) {
                    message.success("Reset sucessfully");
                    if (current(state.selectedStation)?.id) {
                        state.selectedStation.batteries = result;
                    }
                    state.stations = current(state.stations).map((aa) => {
                        if (aa.id === stationId) {
                            return {
                                ...aa,
                                batteries: result,
                            };
                        } else {
                            return aa;
                        }
                    });
                    state.slotLoading = false;
                } else {
                    state.slotLoading = false;
                }
            })

            .addCase(stationRestart.fulfilled, (state, action) => {
                let success = action.payload?.success;
                if (success) {
                    message.success("Restart sucessfully");
                }
            });
    },
});

export const {
    changeSize,
    setFilter,
    setOutletBindModal,
    stationHandleCancel,
    onChangeHandlerOutletBind,
    setSlotModal,
    onChangeHandlerVolume,
    setVolumeModal,
} = stationSlice.actions;

const getStation = createSelector([(state) => state.station], (station) => station);
const getOutletBind = createSelector(
    [getStation],
    ({ selectedStation, outlets, outletBindModal, outletBindLoading, outletBindSaveLoading }) => ({
        selectedStation,
        outlets,
        outletBindModal,
        outletBindLoading,
        outletBindSaveLoading,
    })
);
const getSlot = createSelector([getStation], ({ selectedStation, slotModal, slotLoading }) => ({
    selectedStation,
    slotModal,
    slotLoading,
}));
const getVolume = createSelector(
    [getStation],
    ({ selectedStation, volumeModal, volumeLoading }) => ({
        selectedStation,
        volumeModal,
        volumeLoading,
    })
);
const getList = createSelector(
    [getStation],
    ({ stations, state, filter, size, totalElements, number }) => ({
        stations,
        state,
        filter,
        size,
        totalElements,
        number,
    })
);
export const stationSelectors = { getStation, getList, getOutletBind, getSlot, getVolume };

export default stationSlice.reducer;
