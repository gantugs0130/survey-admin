import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Select, Input, Divider } from "antd";
import {
    onChangeHandlerUser,
    userHandleCancel,
    userSelectors,
    onSubmitUserSave,
} from "../../../../slice/userSlice";
const { Option } = Select;

const UserModal = () => {
    const { companies } = useSelector(userSelectors.getList);
    const { userLoading, userModal, user } = useSelector(userSelectors.getUserData);

    const dispatch = useDispatch();
    function onSubmitUser() {
        dispatch(onSubmitUserSave(user));
    }
    return (
        <Modal
            title={user.ID ? "Хэргэлэгч засах" : "Хэргэлэгч нэмэх"}
            width={380}
            visible={userModal}
            onOk={() => onSubmitUser()}
            onCancel={() => dispatch(userHandleCancel())}
            okText="Хадгалах"
            cancelText="Болих"
            confirmLoading={userLoading}
            maskClosable={false}
        >
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
                <Form.Item label="Имэйл">
                    <Input
                        type="email"
                        value={user.EMAIL}
                        name="EMAIL"
                        onChange={(e) =>
                            dispatch(
                                onChangeHandlerUser({ name: e.target.name, value: e.target.value })
                            )
                        }
                    />
                </Form.Item>
                <Form.Item label="Овог">
                    <Input
                        type="text"
                        value={user.LASTNAME}
                        name="LASTNAME"
                        onChange={(e) =>
                            dispatch(
                                onChangeHandlerUser({ name: e.target.name, value: e.target.value })
                            )
                        }
                    />
                </Form.Item>
                <Form.Item label="Нэр">
                    <Input
                        type="text"
                        value={user.FIRSTNAME}
                        name="FIRSTNAME"
                        onChange={(e) =>
                            dispatch(
                                onChangeHandlerUser({ name: e.target.name, value: e.target.value })
                            )
                        }
                    />
                </Form.Item>
                <Divider />
                <Form.Item label="Эрх">
                    <Select
                        style={{ width: "100%" }}
                        size="small"
                        value={user.ROLE}
                        name="ROLE"
                        onChange={(e) => dispatch(onChangeHandlerUser({ name: "ROLE", value: e }))}
                    >
                        <Option value="" dispatch>
                            Сонгох ...
                        </Option>
                        <Option value="manager">Менежер</Option>
                        <Option value="merchant">Мерчант</Option>
                    </Select>
                </Form.Item>
                {user.ROLE === "merchant" ? (
                    <Form.Item label="Компани">
                        <Select
                            style={{ width: "100%" }}
                            size="small"
                            value={user.COMPANYID}
                            name="COMPANYID"
                            onChange={(e) =>
                                dispatch(onChangeHandlerUser({ name: "COMPANYID", value: e }))
                            }
                        >
                            <Option value="" dispatch>
                                Сонгох ...
                            </Option>
                            {(companies || []).map((item, ind) => (
                                <Option key={ind} value={item.ID}>
                                    {item.NAME}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : null}
                {user.ID ? null : (
                    <React.Fragment>
                        <Divider />
                        <Form.Item label="Нууц үг">
                            <Input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerUser({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Нууц үг давтах">
                            <Input
                                type="password"
                                name="passwordRepeat"
                                value={user.passwordRepeat}
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerUser({
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
export default UserModal;
