import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Slider, Select, Input, PageHeader, TimePicker, Form, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
    staffSelectors,
    staffHandleCancel,
    onSubmitUpdateSave,
    onChangeHandlerStaff,
} from "../../../../slice/staffSlice";

const UpdateModal = () => {
    const { staff, saveLoading, updateModal, type } = useSelector(staffSelectors.getStaffData);

    const dispatch = useDispatch();

    function onSubmitUpdate() {
        let data = {
            id: staff.id,
            name: staff.name,
            phone: staff.phone,
            address: staff.address,
        };
        if (type === "password") {
            data = {
                id: staff.id,
                password: staff.password,
                confirmPassword: staff.confirmPassword,
            };
        }
        dispatch(onSubmitUpdateSave({ data: data, type }));
    }

    return (
        <Modal
            title={`Update ${staff.id}`}
            width={420}
            visible={updateModal}
            onOk={() => onSubmitUpdate()}
            onCancel={() => dispatch(staffHandleCancel())}
            okText="Save"
            cancelText="Close"
            confirmLoading={saveLoading}
            maskClosable={false}
        >
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
                {type === "password" ? (
                    <React.Fragment>
                        <Form.Item label="Password">
                            <Input
                                type="password"
                                value={staff.password}
                                name="password"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Password repeat">
                            <Input
                                type="password"
                                value={staff.confirmPassword}
                                name="confirmPassword"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Form.Item label="Name">
                            <Input
                                type="text"
                                value={staff.name}
                                name="name"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Address">
                            <Input
                                type="text"
                                value={staff.address}
                                name="address"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Phone">
                            <Input
                                type="text"
                                value={staff.phone}
                                name="phone"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                    </React.Fragment>
                )}
            </Form>
        </Modal>
    );
};
export default UpdateModal;
