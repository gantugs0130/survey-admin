import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, PlusOutlined, KeyOutlined } from "@ant-design/icons";
import { Table, Tag, Dropdown, Card, Button, Modal, Divider, Form, Input, Select } from "antd";
import { userSelectors, getUsers, changeSize, setFilter } from "../../../slice/userSlice";
import MenuI from "./utils/Menu";
import Filter from "./utils/Filter";
import Pagination from "../../../utils/Pagination";
import moment from "moment";
const { Option } = Select;

const Users = ({ history }) => {
    const dispatch = useDispatch();
    const { users, state, number, filter, totalElements, size } = useSelector(
        userSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getUsers({ page: value, size, ...filter }));
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
            title: "User Name",
            dataIndex: "username",
        },
        {
            key: "firstname",
            title: "First Name",
            dataIndex: "firstname",
        },
        {
            key: "lastname",
            title: "Last Name",
            dataIndex: "lastname",
        },
        {
            key: "phone",
            title: "Phone",
            dataIndex: "phone",
            width: 100,
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "registrationtime",
            title: "Registration Time",
            width: 140,
            render: (text, record, idx) =>
                record.audit?.createdOn
                    ? moment(record.audit?.createdOn).format("YYYY-MM-DD")
                    : "-",
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
        <Card title="Users">
            <div style={{ marginBottom: 20 }}>
                <Filter onFinish={onFinish} setFilter={setFilter} filter />
            </div>
            <Table
                loading={state === "loading"}
                rowKey={(record) => record.ID}
                size="small"
                dataSource={users}
                columns={columns}
                pagination={Pagination(totalElements, number, size)}
                onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
            />
        </Card>
    );
};
export default Users;
