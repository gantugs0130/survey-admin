import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadOutlined } from "@ant-design/icons";
import { Table, Card, Tag, Select, Button } from "antd";
import {
    batterieSelectors,
    getBatteries,
    changeSize,
    setFilter,
} from "../../../slice/batterieSlice";
import Filter from "./utils/Filter";
import Pagination from "../../../utils/Pagination";
import moment from "moment";
const { Option } = Select;

const Batteries = () => {
    const dispatch = useDispatch();
    const { batteries, state, number, filter, totalElements, size } = useSelector(
        batterieSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getBatteries({ page: value, size, ...filter }));
    }

    function onChangeSize(a, b) {
        dispatch(changeSize({ number: a, size: b }));
        getList(a, filter, b);
    }

    function onFinish() {
        getList(number, filter, size);
    }

    useEffect(() => {
        getList(number, filter, size);
    }, []);

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
            key: "batterySN",
            title: "Battery SN",
            dataIndex: "batterySN",
        },
        {
            key: "batteryLevel",
            title: "Battery",
            dataIndex: "batteryLevel",
            render: (text, record, idx) => (text + 1) * 20 || 0,
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "lastOrder",
            render: (text, record, idx) =>
                record.lastOrder ? (
                    <Tag color={getColor(text.orderStatus)}>{text.orderStatus}</Tag>
                ) : (
                    "--"
                ),
        },
        {
            key: "lastCheckedTime",
            title: "Last updated",
            width: 140,
            render: (text, record, idx) =>
                record.audit
                    ? moment(record.audit.updatedOn || record.audit.audit).format(
                          "YYYY-MM-DD HH:mm"
                      )
                    : "-",
        },
    ];
    return (
        <>
            <Card
                title="Batteries"
                extra={[
                    <Button onClick={() => getList(number, filter, size)} icon={<ReloadOutlined />}>
                        Refresh
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 20 }}>
                    <Filter onFinish={onFinish} setFilter={setFilter} filter />
                </div>
                <Table
                    loading={state === "loading"}
                    rowKey={(record) => record.id}
                    size="small"
                    dataSource={batteries}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
            </Card>
        </>
    );
};
export default Batteries;
