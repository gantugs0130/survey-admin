import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

export const token = Cookies.get("token") || null;

export const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: 30000,
});
apiClient.interceptors.response.use(
    function (response) {
        let data = response?.data || {};
        giveError(data);
        return data;
    },
    function (error) {
        let data = error.response?.data || {};
        giveError(data);
        return Promise.reject(error);
    }
);

function giveError(data) {
    if (data?.path !== "/api/staffs/my-info") {
        if (!data?.success && data?.issue) {
            Object.keys(data.issue).map((keyName) => {
                message.error(`${keyName}: ${data.issue[keyName]}`);
            });
        }
    }
}
