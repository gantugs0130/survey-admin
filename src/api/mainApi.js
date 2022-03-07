import { apiClient } from "./apiClient";
import config from "../config";

export async function fetchUser() {
    return await apiClient.get(`${config.get("apiUrl")}/api/staffs/my-info`);
}
