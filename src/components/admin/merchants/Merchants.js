import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Dropdown, Card, Button, Tag } from "antd";
import {
    merchantSelectors,
    getMerchants,
    changeSize,
    setFilter,
} from "../../../slice/merchantSlice";
import { setStaffModal } from "../../../slice/staffSlice";
import MenuI from "./utils/Menu";
import Filter from "./utils/Filter";
import Pagination from "../../../utils/Pagination";
import UserModal from "../staffs/utils/UserModal";
import UpdateModal from "../staffs/utils/UpdateModal";
import moment from "moment";

const Merchants = () => {
    const dispatch = useDispatch();
    const { merchants, state, number, filter, totalElements, size } = useSelector(
        merchantSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getMerchants({ page: value, size, ...filter }));
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

    const columns = [
        {
            key: "id",
            title: "id",
            width: 60,
            dataIndex: "id",
        },
        {
            key: "username",
            title: "User name",
            dataIndex: "username",
        },
        {
            key: "role",
            title: "Role",
            dataIndex: "role",
            render: (text, record, idx) => text?.name || null,
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "isEnabled",
            render: (text, record, idx) =>
                text ? <Tag color="green">{"Enabled"}</Tag> : <Tag color="red">{"Disabled"}</Tag>,
        },
        {
            key: "registration",
            title: "Registration Time",
            width: 140,
            render: (text, record, idx) =>
                record.audit ? moment(record.audit.createdOn).format("YYYY-MM-DD HH:mm") : "-",
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            render: (text, record) => (
                <Dropdown trigger="click" overlay={() => <MenuI record={record} />}>
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
                title="Merchants"
                extra={
                    <Button
                        onClick={() => {
                            dispatch(setStaffModal({ value: true, merchant: null }));
                        }}
                        icon={<PlusOutlined />}
                    >
                        New Merchant
                    </Button>
                }
            >
                <div style={{ marginBottom: 20 }}>
                    <Filter onFinish={onFinish} setFilter={setFilter} filter />
                </div>
                <Table
                    loading={state === "loading"}
                    rowKey={(record) => record.id}
                    size="small"
                    dataSource={merchants}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
            </Card>
            <UserModal type={"merchant"} />
            <UpdateModal />
        </>
    );
};
export default Merchants;
