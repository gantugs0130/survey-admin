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
                    type="number"
                    allowClear
                    value={filter["id"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
            </Form.Item>
            <Form.Item label="Battery SN">
                <Input
                    maxLength={60}
                    size="small"
                    style={{ width: 160, marginRight: 20 }}
                    name="batterySN"
                    allowClear
                    value={filter["batterySN"]}
                    onChange={(e) =>
                        dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                    }
                />
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
