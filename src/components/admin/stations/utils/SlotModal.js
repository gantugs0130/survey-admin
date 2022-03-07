import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Select, Input, Dropdown, Table, Button, Tag } from "antd";
import { LoadingOutlined, DownOutlined } from "@ant-design/icons";
import {
    stationSelectors,
    stationHandleCancel,
    stationReset,
} from "../../../../slice/stationSlice";
import moment from "moment";
import MenuISlot from "./MenuSlot";
const { Option } = Select;

const SlotModal = () => {
    const { selectedStation, slotModal, slotLoading } = useSelector(stationSelectors.getSlot);

    const dispatch = useDispatch();

    let data = Array.from({ length: selectedStation.totalSlot }, (v, k) => {
        return selectedStation.batteries.find((aa) => aa.slot === k + 1) || { slot: k + 1 };
    });

    const columns = [
        {
            key: "slot",
            title: "Slot ID",
            width: 60,
            dataIndex: "slot",
        },
        {
            key: "batterySN",
            title: "Battery SN",
            dataIndex: "batterySN",
        },
        {
            key: "batteryLevel",
            title: "Battery",
            dataIndex: "batteryLevel",
            render: (text, record, idx) => (text + 1) * 20 || 0,
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "batteryLevel",
            render: (text, record, idx) =>
                record.id ? (
                    <Tag color="green">{"ONLINE"}</Tag>
                ) : (
                    <Tag color="red">{"OFFLINE"}</Tag>
                ),
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            render: (text, record) => (
                <Dropdown
                    disabled={record.loading}
                    trigger="click"
                    overlay={MenuISlot({
                        id: selectedStation.id,
                        slot: record.slot,
                    })}
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        Action {record.loading ? <LoadingOutlined spin={true} /> : <DownOutlined />}
                    </a>
                </Dropdown>
            ),
            width: 90,
        },
    ];

    return (
        <Modal
            title={
                <>
                    {selectedStation.id + " - " + selectedStation.imei}
                    <Button
                        onClick={() =>
                            dispatch(
                                stationReset({
                                    id: selectedStation.id,
                                })
                            )
                        }
                        size="small"
                        style={{ marginLeft: 20 }}
                    >
                        Reload
                    </Button>
                </>
            }
            width={800}
            visible={slotModal}
            onCancel={() => dispatch(stationHandleCancel())}
            maskClosable={false}
            footer={[<Button onClick={() => dispatch(stationHandleCancel())}>Close</Button>]}
        >
            <Table
                rowKey={(record) => record.id}
                size="small"
                loading={slotLoading}
                dataSource={data}
                columns={columns}
                pagination={false}
            />
        </Modal>
    );
};
export default SlotModal;
