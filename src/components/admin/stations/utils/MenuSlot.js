import React from "react";
import { useDispatch } from "react-redux";
import { EditFilled, DeleteFilled, KeyOutlined, RollbackOutlined } from "@ant-design/icons";
import { Menu, Popconfirm } from "antd";
import { popUpBattery } from "../../../../slice/stationSlice";

const MenuI = (record) => {
    const dispatch = useDispatch();
    return (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    dispatch(
                        popUpBattery({
                            id: record.id,
                            slot: record.slot,
                        })
                    );
                }}
            >
                Pop up
            </Menu.Item>
        </Menu>
    );
};
export default MenuI;
