import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Row, Dropdown, Card, Col, Button, Tag, Popover, Select } from "antd";
import { vendorSelectors, getVendors, changeSize, setFilter } from "../../../slice/vendorSlice";
import { setStaffModal } from "../../../slice/staffSlice";
import MenuI from "./utils/Menu";
import Filter from "./utils/Filter";
import CredModal from "./utils/CredModal";
import Pagination from "../../../utils/Pagination";
import UserModal from "../staffs/utils/UserModal";
import moment from "moment";
import UpdateModal from "../staffs/utils/UpdateModal";

const Vendors = () => {
    const dispatch = useDispatch();
    const { vendors, state, number, filter, totalElements, size } = useSelector(
        vendorSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getVendors({ page: value, size, ...filter }));
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
                title="Vendors"
                extra={
                    <Button
                        onClick={() => {
                            dispatch(setStaffModal({ value: true, vendor: null }));
                        }}
                        icon={<PlusOutlined />}
                    >
                        New Vendor
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
                    dataSource={vendors}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
            </Card>
            <UserModal type={"vendor"} />
            <UpdateModal />
            <CredModal />
        </>
    );
};
export default Vendors;
