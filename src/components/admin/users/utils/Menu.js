import React from "react";
import { useDispatch } from "react-redux";
import { EditFilled, DeleteFilled, KeyOutlined, RollbackOutlined } from "@ant-design/icons";
import { Menu, Popconfirm } from "antd";

const MenuI = ({ record, history }) => {
    const dispatch = useDispatch();
    return (
        <Menu>
            <Menu.Item key="1" onClick={() => history.push("/orders/all", { userId: record.id })}>
                Order list
            </Menu.Item>
        </Menu>
    );
};
export default MenuI;
