import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Select, Input, PageHeader, TimePicker, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
    stationSelectors,
    stationHandleCancel,
    onSubmitOutletBindSave,
    onChangeHandlerOutletBind,
} from "../../../../slice/stationSlice";
import moment from "moment";
const { Option } = Select;

const OutletBindModal = () => {
    const { selectedStation, outlets, outletBindModal, outletBindLoading, outletBindSaveLoading } =
        useSelector(stationSelectors.getOutletBind);

    const dispatch = useDispatch();

    function onSubmitOutletBind() {
        if (selectedStation.outletId) {
            let data = {
                id: selectedStation.id,
                outletId: selectedStation.outletId,
            };
            dispatch(onSubmitOutletBindSave(data));
        } else {
            message.warning("Please select outlet");
        }
    }

    return (
        <Modal
            title={"Bind outlet"}
            width={380}
            visible={outletBindModal}
            onOk={() => onSubmitOutletBind()}
            onCancel={() => dispatch(stationHandleCancel())}
            okText="Save"
            cancelText="Close"
            confirmLoading={outletBindSaveLoading}
            maskClosable={false}
        >
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} autoComplete="off">
                <Form.Item label="Station ID">
                    <Input value={selectedStation.id} name="id" disabled />
                </Form.Item>
                <Form.Item label="Outlet">
                    <Select
                        style={{ marginBottom: 10, display: "block" }}
                        value={selectedStation.outletId}
                        name="outletId"
                        loading={outletBindLoading}
                        onChange={(e) =>
                            dispatch(
                                onChangeHandlerOutletBind({
                                    name: "outletId",
                                    value: e,
                                })
                            )
                        }
                    >
                        <Option value="" disabled>
                            Please select
                        </Option>
                        {(outlets || []).map((item, ind) => (
                            <Option value={item.id}>{item.outletName}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default OutletBindModal;
