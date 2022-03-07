import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs`, { params: data });
}

export async function fetchCredGet(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs/${data.id}/client-cred`, {
        params: data,
    });
}

export async function fetchSubmitCredSave(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/staffs/${data.id}/client-cred`, data);
}
