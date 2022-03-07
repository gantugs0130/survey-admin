import React from "react";
import { useDispatch } from "react-redux";
import { EditFilled, DeleteFilled, KeyOutlined, RollbackOutlined } from "@ant-design/icons";
import { Menu, Popconfirm } from "antd";
import { setOutletModal } from "../../../../slice/outletSlice";

const MenuI = ({ record, getOutletConfig }) => {
    const dispatch = useDispatch();
    let data = { ...record, merchantId: record?.staff?.id };
    return (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    dispatch(setOutletModal({ value: true, type: "basic", outlet: data }));
                }}
            >
                Basic Information
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => {
                    dispatch(setOutletModal({ value: true, type: "billing", outlet: data }));
                }}
            >
                Billing Rule
            </Menu.Item>
            <Menu.Item
                key="3"
                onClick={() => {
                    dispatch(setOutletModal({ value: true, type: "time", outlet: data }));
                }}
            >
                Business Hours
            </Menu.Item>
        </Menu>
    );
};
export default MenuI;
