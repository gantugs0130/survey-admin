import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/orders/all`, { params: data });
}

export async function fetchCancel(data) {
    return await apiClient.post(`${config.get("apiUrl")}/api/cancel`, data);
}
