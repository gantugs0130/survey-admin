import React, { useEffect, useState } from "react";
import Api from "../api/api";
import { Row, Form, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import config from "../config";

const Login = () => {
    const [loading, setLoading] = useState(false);

    async function loginEnter(data) {
        setLoading(true);
        const response = await Api.post(`${config.get("apiUrl")}/api/auth/signin`, data);
        if (response?.accessToken) {
            try {
                Cookies.set("token", response.accessToken, { expires: 1 });
            } catch (err) {}
            window.location = "/";
        } else {
            message.error(response.issue?.error);
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="form___3Tq4m">
                <div className="logo___3tfTW">
                    <h2 style={{ fontSize: 32, lineHeight: "24px", color: "#555" }}>Hi-Charge</h2>
                </div>
                <Form onFinish={loginEnter}>
                    <Form.Item
                        name={"username"}
                        hasFeedback
                        rules={[{ required: true, message: "Please enter username" }]}
                    >
                        <Input
                            type="text"
                            prefix={<UserOutlined style={{ fontSize: 13 }} />}
                            placeholder={`Нэвтрэх нэр`}
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        hasFeedback
                        rules={[{ required: true, message: "Нууц үг оруулна уу" }]}
                    >
                        <Input
                            type="password"
                            prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                            placeholder={`Нууц үг`}
                        />
                    </Form.Item>
                    <Row>
                        <Button htmlType="submit" type="primary" loading={loading}>
                            Нэвтрэх
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
export default Login;
