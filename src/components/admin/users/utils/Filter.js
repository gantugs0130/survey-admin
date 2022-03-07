import React from "react";
import { useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";

const Filter = ({ onFinish, setFilter, filter }) => {
    const dispatch = useDispatch();
    return (
        <Form layout="inline" onFinish={onFinish}>
            <Form.Item label="ID">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="id"
                    allowClear
                    type="number"
                    value={filter["id"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="User name">
                <Input
                    maxLength={60}
                    size="small"
                    allowClear
                    style={{ width: 160, marginRight: 20 }}
                    name="username"
                    value={filter["username"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="Email">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="email"
                    allowClear
                    value={filter["email"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="Phone">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="phone"
                    allowClear
                    value={filter["phone"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    size="small"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    onClick={() => console.log("ww")}
                >
                    Search
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Filter;
