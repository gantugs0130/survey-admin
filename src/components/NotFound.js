import React from "react";
import { renderRoutes } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import {
    UserOutlined,
    HomeFilled,
    LogoutOutlined,
    LayoutFilled,
    DollarCircleFilled,
    DatabaseFilled,
    FileTextFilled,
} from "@ant-design/icons";
import { Layout, Menu, Result, Button } from "antd";
const { Content } = Layout;

const NotFound = ({ history }) => {
    return (
        <Layout className="site-layout">
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button type="primary" onClick={() => history.push("/")}>
                            Back Home
                        </Button>
                    }
                />
            </div>
        </Layout>
    );
};
export default NotFound;
