import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/stations`, { params: data });
}

export async function fetchBindOutlets() {
    return await apiClient.get(`${config.get("apiUrl")}/api/outlets/names`);
}

export async function fetchSubmitOutletBindSave(data) {
    return await apiClient.post(
        `${config.get("apiUrl")}/api/stations/${data.id}/bind-outlet/${data.outletId}`
    );
}

export async function fetchPopUp(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/stations/${data.id}/eject`, {
        slot: data.slot,
    });
}

export async function fetchStationReset(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/stations/${data.id}/slots`);
}

export async function fetchStationRestart(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/stations/${data.id}/restart`);
}

export async function fetchSubmitVolumeSave(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/stations/${data.id}/volume`, {
        level: data.volume,
    });
}
