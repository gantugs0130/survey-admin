import { combineReducers } from "redux";

import mainSlice from "./mainSlice";
import userSlice from "./userSlice";
import outletSlice from "./outletSlice";
import stationSlice from "./stationSlice";
import batterieSlice from "./batterieSlice";
import orderSlice from "./orderSlice";
import settingSlice from "./settingSlice";
import staffSlice from "./staffSlice";
import vendorSlice from "./vendorSlice";
import merchantSlice from "./merchantSlice";

export default combineReducers({
    main: mainSlice,
    user: userSlice,
    outlet: outletSlice,
    station: stationSlice,
    batterie: batterieSlice,
    order: orderSlice,
    setting: settingSlice,
    staff: staffSlice,
    vendor: vendorSlice,
    merchant: merchantSlice,
});
