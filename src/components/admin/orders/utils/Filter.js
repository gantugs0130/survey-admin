import React from "react";
import { useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Button, Input, Select, Row, Col, DatePicker } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
import moment from "moment";

const Filter = ({ onFinish, setFilter, filter, status }) => {
    const dispatch = useDispatch();

    function onChangeDate(e) {
        if (e && e.length > 1) {
            let date = [
                moment(e[0]).format("YYYY-MM-DDTHH:mm:ss"),
                moment(e[1]).format("YYYY-MM-DDTHH:mm:ss"),
            ];
            dispatch(setFilter({ name: ["leaseTimeFrom"], value: date[0] }));
            dispatch(setFilter({ name: ["leaseTimeTo"], value: date[1] }));
        } else {
            dispatch(setFilter({ name: ["leaseTimeFrom"], value: "" }));
            dispatch(setFilter({ name: ["leaseTimeTo"], value: "" }));
        }
    }
    console.log(filter);
    return (
        <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onFinish={onFinish}>
            <Row gutter={15}>
                <Col span={6}>
                    <Form.Item label="Order ID" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="id"
                            type="number"
                            allowClear
                            value={filter["id"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Outlet name" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="rentalOutlet.outletName"
                            allowClear
                            value={filter["rentalOutlet.outletName"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Outlet ID" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="rentalOutlet.id"
                            type="number"
                            allowClear
                            value={filter["rentalOutlet.id"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Battery SN" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="battery.batterySN"
                            allowClear
                            value={filter["battery.batterySN"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="User name" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="customer.username"
                            allowClear
                            value={filter["customer.username"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="User ID" style={{ marginBottom: 15 }}>
                        <Input
                            maxLength={60}
                            size="small"
                            style={{ width: "100%" }}
                            name="customer.id"
                            allowClear
                            value={filter["customer.id"]}
                            onChange={(e) =>
                                dispatch(setFilter({ name: e.target.name, value: e.target.value }))
                            }
                        />
                    </Form.Item>
                </Col>
                {status === "all" ? (
                    <Col span={6}>
                        <Form.Item label="Order Status" style={{ marginBottom: 15 }}>
                            <Select
                                style={{ width: "100%" }}
                                size="small"
                                value={filter["orderStatus"]}
                                onChange={(e) =>
                                    dispatch(setFilter({ name: "orderStatus", value: e }))
                                }
                            >
                                <Option value="">All</Option>
                                <Option value="NOT_RETURNED">NOT_RETURNED</Option>
                                <Option value="RENTING_ORDER">RENTING_ORDER</Option>
                                <Option value="FINISHED_ORDER">FINISHED_ORDER</Option>
                                <Option value="CANCELED_ORDER">CANCELED_ORDER</Option>
                                <Option value="OVERTIME_ORDER">OVERTIME_ORDER</Option>
                                <Option value="ERROR_ORDER">ERROR_ORDER</Option>
                                <Option value="BOOST_AMOUNT_ORDER">BOOST_AMOUNT_ORDER</Option>
                                <Option value="PAYMENT_VENDOR_ORDER">PAYMENT_VENDOR_ORDER</Option>
                                <Option value="MANUALLY_FINISHED">MANUALLY_FINISHED</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
                <Col span={6}>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}>
                            <Form.Item style={{ marginBottom: 15 }}>
                                <Button
                                    type="primary"
                                    size="small"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                >
                                    Search
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    {filter["leaseTimeFrom"] && filter["leaseTimeTo"] ? (
                        <RangePicker
                            style={{ width: "100%" }}
                            value={[moment(filter["leaseTimeFrom"]), moment(filter["leaseTimeTo"])]}
                            onChange={(e) => onChangeDate(e)}
                            showTime
                        />
                    ) : (
                        <RangePicker
                            valuelue={undefined}
                            style={{ width: "100%" }}
                            onChange={(e) => onChangeDate(e)}
                            showTime
                        />
                    )}
                </Col>
            </Row>
        </Form>
    );
};
export default Filter;
