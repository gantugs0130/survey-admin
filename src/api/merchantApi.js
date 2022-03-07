import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchList(data) {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs`, { params: data });
}
