import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Slider, Select, Input, PageHeader, TimePicker, Form, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
    vendorSelectors,
    credHandleCancel,
    onSubmitCredSave,
    onChangeHandlerCred,
} from "../../../../slice/vendorSlice";

const CredModal = () => {
    const { credModal, credSaveLoading, cred, credLoading } = useSelector(vendorSelectors.getCred);

    const dispatch = useDispatch();

    function onSubmitCred() {
        dispatch(onSubmitCredSave(cred));
    }

    return (
        <Modal
            title={`Set Cred ${cred.id}`}
            width={380}
            visible={credModal}
            onOk={() => onSubmitCred()}
            onCancel={() => dispatch(credHandleCancel())}
            okText="Save"
            cancelText="Close"
            confirmLoading={credSaveLoading}
            maskClosable={false}
        >
            {credLoading ? (
                <Spin size="large" />
            ) : (
                <React.Fragment>
                    <Form.Item label="Auth Client ID">
                        <Input
                            type="text"
                            value={cred.authClientId}
                            name="authClientId"
                            onChange={(e) =>
                                dispatch(
                                    onChangeHandlerCred({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Auth Client Secret">
                        <Input
                            type="text"
                            value={cred.authClientSecret}
                            name="authClientSecret"
                            onChange={(e) =>
                                dispatch(
                                    onChangeHandlerCred({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Client ID">
                        <Input
                            type="text"
                            value={cred.clientId}
                            name="clientId"
                            disabled
                            onChange={(e) =>
                                dispatch(
                                    onChangeHandlerCred({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Client Secret">
                        <Input
                            type="text"
                            value={cred.clientSecret}
                            name="clientSecret"
                            onChange={(e) =>
                                dispatch(
                                    onChangeHandlerCred({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label="webhookUrl">
                        <Input
                            type="text"
                            value={cred.webhookUrl}
                            name="webhookUrl"
                            onChange={(e) =>
                                dispatch(
                                    onChangeHandlerCred({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                    </Form.Item>
                </React.Fragment>
            )}
        </Modal>
    );
};
export default CredModal;
