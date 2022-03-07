import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/outlets/all`, { params: data });
}

export async function fetchMerchants(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs`, { params: data });
}

export async function fetchBillingRule(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/system-config`, { params: data });
}

export async function fetchBusinessHours(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/system-config`, { params: data });
}

export async function fetchSubmitOutletSave(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/outlets`, data);
}

export async function fetchSubmitOutletSaveEdit(data) {
    let url = "/api/outlets";
    if (data.editType === "basic") {
        url = `/api/outlets/${data.outlet.id}/basic-information`;
    }
    if (data.editType === "billing") {
        url = `/api/outlets/${data.outlet.id}/billing-rule`;
    }
    if (data.editType === "time") {
        url = `/api/outlets/${data.outlet.id}/business-hours`;
    }
    return await apiClient.post(`${config.get("apiUrl")}${url}`, data.outlet);
}
