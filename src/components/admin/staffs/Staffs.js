import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Row, Dropdown, Card, Col, Button, Tag, Popover, Select } from "antd";
import {
    staffSelectors,
    getStaffs,
    changeSize,
    setFilter,
    setStaffModal,
} from "../../../slice/staffSlice";
import Filter from "./utils/Filter";
import MenuI from "./utils/Menu";
import UserModal from "./utils/UserModal";
import UpdateModal from "./utils/UpdateModal";
import Pagination from "../../../utils/Pagination";
import moment from "moment";
const { Option } = Select;

const Staffs = () => {
    const dispatch = useDispatch();
    const { staffs, state, number, filter, totalElements, size } = useSelector(
        staffSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getStaffs({ page: value, size, ...filter }));
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
            render: (text, record) =>
                record.role.id !== 1 ? (
                    <Dropdown trigger="click" overlay={() => <MenuI record={record} />}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            Action{" "}
                            {record.loading ? <LoadingOutlined spin={true} /> : <DownOutlined />}
                        </a>
                    </Dropdown>
                ) : null,
            width: 90,
        },
    ];
    return (
        <>
            <Card
                title="Staffs"
                extra={
                    <Button
                        onClick={() => {
                            dispatch(setStaffModal({ value: true, staff: null }));
                        }}
                        icon={<PlusOutlined />}
                    >
                        New Staff
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
                    dataSource={staffs}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
            </Card>
            <UserModal type={"staff"} />
            <UpdateModal />
        </>
    );
};
export default Staffs;
