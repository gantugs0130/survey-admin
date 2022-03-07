import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditFilled, DeleteFilled, KeyOutlined, RollbackOutlined } from "@ant-design/icons";
import { Menu, Popconfirm } from "antd";
import { mainSelectors } from "../../../../slice/mainSlice";
import {
    setOutletBindModal,
    setSlotModal,
    stationReset,
    setVolumeModal,
    stationRestart,
} from "../../../../slice/stationSlice";

const MenuI = ({ record, getStationConfig, isOnline }) => {
    const { user } = useSelector(mainSelectors.getUser);
    const dispatch = useDispatch();
    return (
        <Menu>
            {user?.role?.id === 1 || user?.role?.id === 2 ? (
                <Menu.Item
                    key="1"
                    onClick={() => {
                        dispatch(
                            setOutletBindModal({
                                value: true,
                                station: {
                                    id: record.id,
                                    outletId: record.affiliatedOutlet?.id || "",
                                },
                            })
                        );
                        getStationConfig();
                    }}
                >
                    Bind outlet
                </Menu.Item>
            ) : null}
            <Menu.Item
                key="2"
                disabled={!isOnline}
                onClick={() => {
                    dispatch(
                        setSlotModal({
                            value: true,
                            station: record,
                        })
                    );
                }}
            >
                Slot info
            </Menu.Item>
            <Menu.Item
                key="3"
                disabled={!isOnline}
                onClick={() => {
                    dispatch(
                        stationReset({
                            id: record.id,
                        })
                    );
                }}
            >
                Reload Station
            </Menu.Item>
            <Menu.Item
                key="3"
                disabled={!isOnline}
                onClick={() => {
                    dispatch(
                        setVolumeModal({
                            value: true,
                            station: record,
                        })
                    );
                }}
            >
                Set Volume
            </Menu.Item>

            <Popconfirm
                title="Are you sure to restart the Station ?"
                onConfirm={() => {
                    dispatch(
                        stationRestart({
                            id: record.id,
                        })
                    );
                }}
                okText="Yes"
                cancelText="No"
            >
                <Menu.Item key="3">Restart Station</Menu.Item>
            </Popconfirm>
        </Menu>
    );
};
export default MenuI;
