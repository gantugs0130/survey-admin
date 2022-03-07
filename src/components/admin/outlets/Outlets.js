import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Tag, Dropdown, Card, Button, Modal, Popover, Select } from "antd";
import {
    outletSelectors,
    getOutlets,
    changeSize,
    setFilter,
    setOutletModal,
    getMerchants,
    getBillingRule,
    getBusinessHours,
} from "../../../slice/outletSlice";
import { mainSelectors } from "../../../slice/mainSlice";
import Pagination from "../../../utils/Pagination";
import MenuI from "./utils/Menu";
import Filter from "./utils/Filter";
import OutletModal from "./utils/OutletModal";
import moment from "moment";
const { Option } = Select;

const Outlets = ({ location }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(mainSelectors.getUser);
    const { outlets, state, number, filter, totalElements, size } = useSelector(
        outletSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getOutlets({ page: value, size, ...filter }));
    }

    function onChangeSize(a, b) {
        dispatch(changeSize({ number: a, size: b }));
        getList(a, filter, b);
    }

    function onFinish() {
        getList(number, filter, size);
    }

    function getOutletConfig() {
        dispatch(getMerchants({ "role.id": 6 }));
        dispatch(getBillingRule({ type: 2 }));
        dispatch(getBusinessHours({ type: 3 }));
    }

    useEffect(() => {
        let outletId = location?.state?.outletId;
        console.log(location?.state);
        if (outletId) {
            dispatch(setFilter({ name: "id", valie: outletId }));
            getList(number, { ...filter, id: outletId }, size);
        } else {
            getList(number, filter, size);
        }
    }, []);

    const columns = [
        {
            key: "id",
            title: "id",
            width: 60,
            dataIndex: "id",
        },
        {
            key: "outletName",
            title: "Outlet Name",
            dataIndex: "outletName",
        },
        {
            key: "address",
            title: "Address",
            dataIndex: "address1",
        },
        {
            key: "phone",
            title: "Phone",
            dataIndex: "staff",
            width: 100,
            render: (text, record, idx) => (text.phone ? text.phone : "-"),
        },
        {
            key: "businessHours",
            title: "Business hours",
            dataIndex: "businessHours",
            width: 120,
            render: (text, record, idx) =>
                record.businessHours ? (
                    <Popover content={<></>} title="Title" placement="bottom">
                        <span style={{ color: "#276ce1", cursor: "pointer" }}>detail</span>
                    </Popover>
                ) : (
                    "-"
                ),
        },
        {
            key: "merchant",
            title: "Merchant",
            dataIndex: "staff",
            render: (text, record, idx) => (text.name ? text.name : "-"),
        },
        {
            key: "CREATETIME",
            title: "Create time",
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
                    overlay={() => <MenuI record={record} getOutletConfig={getOutletConfig} />}
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
        <Card
            title="Outlets"
            extra={
                user?.role?.id === 1 || user?.role?.id === 2 ? (
                    <Button
                        onClick={() => {
                            getOutletConfig();
                            dispatch(setOutletModal({ value: true, outlet: null }));
                        }}
                        icon={<PlusOutlined />}
                    >
                        New Outlet
                    </Button>
                ) : null
            }
        >
            <div style={{ marginBottom: 20 }}>
                <Filter onFinish={onFinish} setFilter={setFilter} filter />
            </div>
            <Table
                loading={state === "loading"}
                rowKey={(record) => record.id}
                size="small"
                dataSource={outlets}
                columns={columns}
                pagination={Pagination(totalElements, number, size)}
                onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
            />
            <OutletModal />
        </Card>
    );
};
export default Outlets;
