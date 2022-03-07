import React, { useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";

import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    SettingOutlined,
    ClusterOutlined,
    ClearOutlined,
    BarsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row } from "antd";
const { Content, Sider, Header } = Layout;
import { useSelector } from "react-redux";
import { mainSelectors } from "../slice/mainSlice";

const VendorLayer = ({ route: { routes }, location, history }) => {
    const { user } = useSelector(mainSelectors.getUser);
    const [collapsed, setCollapsed] = useState(false);
    let active = (location.pathname?.split("/") || [])[1];
    let subActive = (location.pathname?.split("/") || [])[2];

    useEffect(() => {
        if (!(user && user.role?.id === 5)) {
            history.push("/404");
        } else {
            history.push("/orders/all");
        }
    }, []);

    return (
        <Layout className="site-layout">
            <Sider
                trigger={null}
                // width={240}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo" style={{ textAlign: "center" }}>
                    <Link to="/">
                        <h3 style={{ color: "#fff", padding: "20px 0 10px 0px" }}>Hi-Charge</h3>
                    </Link>
                </div>
                <Menu
                    theme={"dark"}
                    defaultOpenKeys={[active, subActive]}
                    defaultSelectedKeys={[active, subActive]}
                    mode="inline"
                >
                    <Menu.SubMenu key="orders" icon={<SettingOutlined />} title="Orders">
                        <Menu.Item icon={<UserOutlined />} key="all">
                            <Link to="/orders/all">
                                <span> All orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="RENTING_ORDER">
                            <Link to="/orders/RENTING_ORDER">
                                <span> In renting orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="FINISHED_ORDER">
                            <Link to="/orders/FINISHED_ORDER">
                                <span> Finished orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="CANCELED_ORDER">
                            <Link to="/orders/CANCELED_ORDER">
                                <span> Cancelled orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="OVERTIME_ORDER">
                            <Link to="/orders/OVERTIME_ORDER">
                                <span> Time out orders</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: "#fff", height: 42, padding: "0 30px" }}>
                    <Row
                        align="middle"
                        type="flex"
                        justify="space-between"
                        style={{ height: "100%" }}
                    >
                        <span>
                            <UserOutlined /> {`${user.name} (${user.username})`}
                        </span>
                        <a
                            href="#"
                            onClick={() => {
                                try {
                                    Cookies.remove("token");
                                } catch (err) {}
                                window.location = "/";
                            }}
                            style={{ fontSize: 14 }}
                        >
                            <LogoutOutlined /> Logout
                        </a>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: "16px 24px",
                        minHeight: "calc(100vh - 112px)",
                        paddingTop: 0,
                    }}
                >
                    {renderRoutes(routes)}
                </Content>
            </Layout>
        </Layout>
    );
};

export default VendorLayer;
