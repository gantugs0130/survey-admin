import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Form, Select, Input, PageHeader, Divider, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
    onChangeHandlerStaff,
    staffSelectors,
    staffHandleCancel,
    onSubmitStaffSave,
} from "../../../../slice/staffSlice";
const { Option } = Select;

const UserModal = ({ type }) => {
    const { staffModal, staff, saveLoading } = useSelector(staffSelectors.getStaffData);

    const dispatch = useDispatch();

    function onSubmitStaff() {
        dispatch(onSubmitStaffSave({ data: staff, type }));
    }

    // useEffect(() => {
    //     if (type === "merchant") {
    //         dispatch(
    //             onChangeHandlerStaff({
    //                 name: "roleId",
    //                 value: 6,
    //             })
    //         );
    //     } else {
    //         if (type === "vendor") {
    //             dispatch(
    //                 onChangeHandlerStaff({
    //                     name: "roleId",
    //                     value: 5,
    //                 })
    //             );
    //         }
    //     }
    // }, []);

    return (
        <Drawer
            placement="right"
            width={600}
            onClose={() => dispatch(staffHandleCancel())}
            visible={staffModal}
            title={
                <div>
                    {type === "staff"
                        ? "Add Staff"
                        : type === "merchant"
                        ? "Add Merchant"
                        : type === "vendor"
                        ? "Add Payment Vendor"
                        : null}
                    <Button
                        size="small"
                        icon={<SaveOutlined />}
                        style={{ marginLeft: 30, float: "right" }}
                        type="primary"
                        onClick={() => onSubmitStaff()}
                        loading={saveLoading}
                    >
                        Save
                    </Button>
                </div>
            }
            maskClosable={false}
        >
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} autoComplete="off">
                <div>
                    <PageHeader
                        className="site-page-header"
                        title="Basic Information"
                        // breadcrumb={{ routes }}
                        // subTitle="This is a subtitle"
                    />
                    <Form.Item label="User name">
                        <Input
                            type="text"
                            value={staff.username}
                            name="username"
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
                    {type === "staff" ? (
                        <Form.Item label="Role ID">
                            <Select
                                style={{ marginBottom: 10, display: "block" }}
                                value={staff.roleId}
                                name="roleId"
                                disabled={type === "merchant" || type === "vendor"}
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerStaff({
                                            name: "roleId",
                                            value: e,
                                        })
                                    )
                                }
                            >
                                <React.Fragment>
                                    <Option value="" disabled>
                                        Please select
                                    </Option>
                                    <Option value={1}>ROLE_ADMIN</Option>
                                    <Option value={2}>ROLE_OPERATOR</Option>
                                    <Option value={3}>ROLE_CALL_CENTER</Option>
                                    <Option value={4}>ROLE_FINANCE</Option>
                                </React.Fragment>
                            </Select>
                        </Form.Item>
                    ) : null}
                    {type === "merchant" ? (
                        <React.Fragment>
                            <Form.Item label="Merchant name">
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
                    ) : null}
                    {type === "vendor" ? (
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
                            <Divider />
                            <Form.Item label="Client ID">
                                <Input
                                    type="text"
                                    value={staff.clientId}
                                    name="clientId"
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
                            <Form.Item label="Client Secret">
                                <Input
                                    type="text"
                                    value={staff.clientSecret}
                                    name="clientSecret"
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
                            <Form.Item label="webhookUrl">
                                <Input
                                    type="text"
                                    value={staff.webhookUrl}
                                    name="webhookUrl"
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
                    ) : null}
                </div>
            </Form>
        </Drawer>
    );
};
export default UserModal;
