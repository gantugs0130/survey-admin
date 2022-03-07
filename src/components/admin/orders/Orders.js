import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons";
import { Table, Dropdown, Card, Tag, Button } from "antd";
import { orderSelectors, getOrders, changeSize, setFilter } from "../../../slice/orderSlice";
import Filter from "./utils/Filter";
import MenuI from "./utils/Menu";
import Pagination from "../../../utils/Pagination";
import moment from "moment";

const Orders = ({ match: { params }, history, location }) => {
    let { status } = params;
    let { userId } = location.state || {};
    const dispatch = useDispatch();
    const { orders, state, number, filter, totalElements, size } = useSelector(
        orderSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getOrders({ page: value, size, ...filter }));
    }

    function onChangeSize(a, b) {
        dispatch(changeSize({ number: a, size: b }));
        getList(a, filter, b);
    }

    function onFinish() {
        getList(number, filter, size);
    }

    function fuc() {
        if (userId) {
            dispatch(setFilter({ name: "customer.id", value: userId }));
        }
        if (status && status !== "all") {
            dispatch(setFilter({ name: "orderStatus", value: status }));
            getList(number, { ...filter, orderStatus: status, "customer.id": userId || "" }, size);
        } else {
            getList(number, { ...filter, "customer.id": userId || "" }, size);
        }
    }

    useEffect(() => {
        fuc();
    }, []);

    useEffect(() => {
        fuc();
    }, [status]);

    function getColor(status) {
        switch (status) {
            case "FINISHED_ORDER":
                return "green";
                break;
            case "OVERTIME_ORDER":
                return "yellow";
                break;
            case "MANUALLY_FINISHED":
                return "yellow";
                break;
            case "NOT_RETURNED":
                return "red";
                break;
            case "ERROR_ORDER":
                return "red";
                break;
            default:
                return "gray";
                break;
        }
    }

    const columns = [
        {
            key: "id",
            title: "id",
            width: 60,
            dataIndex: "id",
        },
        {
            key: "orderStatus",
            title: "Order status",
            dataIndex: "orderStatus",
            render: (text, record, idx) => <Tag color={getColor(text)}>{text}</Tag>,
        },
        {
            key: "customer",
            title: "User name",
            dataIndex: "customer",
            render: (text, record, idx) => (text.username ? text.username : "-"),
        },
        {
            key: "totalFee",
            title: "Total fee",
            dataIndex: "totalFee",
        },
        {
            key: "capturePayment.amount",
            title: "Actual fee",
            dataIndex: "capturePayment",
            render: (text, record, idx) => (text?.amount ? text.amount : "-"),
        },
        {
            key: "paymentstatus",
            title: "Payment status",
            dataIndex: "returnedPayment",
            render: (text, record, idx) => (text?.success ? "paid" : "unpaid"),
        },
        {
            key: "costtime",
            title: "Cost Time (mins)",
            dataIndex: "leaseTime",
            render: (text, record, idx) =>
                record.returnTime
                    ? moment(record.returnTime).diff(moment(text), "minutes")
                    : moment().diff(moment(text), "minutes"),
        },
        {
            key: "leaseTime",
            title: "Lease time",
            dataIndex: "leaseTime",
            render: (text, record, idx) => (text ? moment(text).format("YYYY-MM-DD HH:mm") : "-"),
        },
        {
            key: "returnTime",
            title: "Return time",
            dataIndex: "returnTime",
            render: (text, record, idx) => (text ? moment(text).format("YYYY-MM-DD HH:mm") : "-"),
        },
        {
            key: "rentalOutlet",
            title: "Rental Outlets",
            dataIndex: "rentalOutlet",
            render: (text, record, idx) => (text?.outletName ? text.outletName : "-"),
        },
        {
            key: "returnOutlet",
            title: "Return Outlets",
            dataIndex: "returnOutlet",
            render: (text, record, idx) => (text?.outletName ? text.outletName : "-"),
        },
        {
            key: "batterySN",
            title: "Battery SN",
            dataIndex: "battery",
            render: (text, record, idx) => (text?.batterySN ? text.batterySN : "-"),
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            render: (text, record) => (
                <Dropdown
                    disabled={record.loading}
                    trigger="click"
                    overlay={() => <MenuI record={record} history={history} />}
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
        <>
            <Card
                title="Orders"
                extra={[
                    <Button onClick={() => fuc()} icon={<ReloadOutlined />}>
                        Refresh
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 20 }}>
                    <Filter
                        status={status}
                        onFinish={onFinish}
                        setFilter={setFilter}
                        filter={filter}
                    />
                </div>
                <Table
                    loading={state === "loading"}
                    rowKey={(record) => record.id}
                    size="small"
                    dataSource={orders}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
            </Card>
        </>
    );
};
export default Orders;
