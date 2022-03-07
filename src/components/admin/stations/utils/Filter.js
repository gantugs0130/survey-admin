import React from "react";
import { useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Button, Input, Select } from "antd";
const { Option } = Select;

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
                    type="number"
                    allowClear
                    value={filter["id"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="IMEI">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="imei"
                    allowClear
                    value={filter["imei"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="Outlet ID">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="affiliatedOutlet.id"
                    type="number"
                    allowClear
                    value={filter["affiliatedOutlet.id"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="Status">
                <Select
                    style={{ width: 160, marginRight: 20 }}
                    size="small"
                    value={filter["status"]}
                    onChange={(e) => dispatch(setFilter({ name: "status", value: e }))}
                >
                    <Option value="">All</Option>
                    <Option value="ONLINE">Online</Option>
                    <Option value="OFFLINE">Offline</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" size="small" htmlType="submit" icon={<SearchOutlined />}>
                    Search
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Filter;
