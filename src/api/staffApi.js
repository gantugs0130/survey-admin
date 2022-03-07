import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs`, { params: data });
}

export async function fetchSubmitStaffSave(data) {
    let url = `${config.get("apiUrl")}/api/staffs`;
    if (data.type === "merchant") {
        url = `${config.get("apiUrl")}/api/staffs/add-merchant`;
    }
    if (data.type === "vendor") {
        url = `${config.get("apiUrl")}/api/staffs/add-payment-vendor`;
    }
    return await apiClient.post(url, data.data);
}

export async function fetchSubmitStaffUpdate(data) {
    if (data.type === "password") {
        return await apiClient.post(
            `${config.get("apiUrl")}/api/staffs/update-password`,
            data.data
        );
    } else {
        return await apiClient.put(`${config.get("apiUrl")}/api/staffs`, data.data);
    }
}

export async function fetchToggle(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/staffs/${data.id}`);
}
