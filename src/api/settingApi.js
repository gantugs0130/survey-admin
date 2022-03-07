import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchData(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/system-config`, { params: data });
}

export async function fetchSave(data) {
    if (data.type === "billing") {
        return await apiClient.post(
            `${config.get("apiUrl")}/api/system-config/billing-rule`,
            data.data
        );
    } else if (data.type === "time") {
        return await apiClient.post(
            `${config.get("apiUrl")}/api/system-config/business-hours`,
            data.data
        );
    } else {
        return await apiClient.post(`${config.get("apiUrl")}/api/system-config`, data.data);
    }
}
