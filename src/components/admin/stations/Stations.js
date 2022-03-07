import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons";
import { Table, Row, Dropdown, Card, Col, Statistic, Tag, Popover, Select, Button } from "antd";
import {
    stationSelectors,
    getStations,
    changeSize,
    setFilter,
    getBindOutlets,
} from "../../../slice/stationSlice";
import MenuI from "./utils/Menu";
import Filter from "./utils/Filter";
import OutletBindModal from "./utils/OutletBindModal";
import VolumeModal from "./utils/VolumeModal";
import SlotModal from "./utils/SlotModal";
import Pagination from "../../../utils/Pagination";
import moment from "moment";
const { Option } = Select;

const Stations = () => {
    const dispatch = useDispatch();
    const { stations, state, number, filter, totalElements, size } = useSelector(
        stationSelectors.getList
    );

    function getList(value = number, filter, size = size) {
        dispatch(getStations({ page: value, size, ...filter }));
    }
    useEffect(() => {
        getList(number, filter, size);
    }, []);

    function onChangeSize(a, b) {
        dispatch(changeSize({ number: a, size: b }));
        getList(a, filter, b);
    }

    function getStationConfig() {
        dispatch(getBindOutlets());
    }

    function onFinish() {
        getList(number, filter, size);
    }
    const columns = [
        {
            key: "id",
            title: "id",
            width: 60,
            dataIndex: "id",
        },
        {
            key: "imei",
            title: "IMEI",
            dataIndex: "imei",
        },
        {
            key: "affiliatedOutlet",
            title: "Affiliated Outlet",
            dataIndex: "affiliatedOutlet",
            render: (text, record, idx) => (record.affiliatedOutlet ? text.outletName : "-"),
        },
        {
            key: "OutletAddress",
            title: "Outlet Address",
            dataIndex: "affiliatedOutlet",
            render: (text, record, idx) => (record.affiliatedOutlet ? text.address1 : "-"),
        },
        {
            key: "status",
            title: "Online status",
            dataIndex: "status",
            render: (text, record, idx) =>
                text === "ONLINE" ? <Tag color="green">{text}</Tag> : <Tag color="red">{text}</Tag>,
        },
        {
            key: "availablePowerbank",
            title: "Available",
            dataIndex: "totalSlot",
            render: (text, record, idx) => (record.batteries || []).length || 0,
        },
        {
            key: "emptyPowerbank",
            title: "Empty",
            dataIndex: "totalSlot",
            render: (text, record, idx) => text - (record.batteries || []).length,
        },
        {
            key: "lastCheckedTime",
            title: "Last checked",
            width: 140,
            render: (text, record, idx) =>
                record.lastCheckedTime
                    ? moment(record.lastCheckedTime).format("YYYY-MM-DD HH:mm")
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
                    overlay={() => (
                        <MenuI
                            record={record}
                            getStationConfig={getStationConfig}
                            isOnline={record.status === "ONLINE"}
                        />
                    )}
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
            <div className="site-statistic-demo-card" style={{ maxWidth: 600, marginBottom: 15 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="ONLINE"
                                value={
                                    (stations.filter((aa) => aa.status === "ONLINE") || []).length
                                }
                                valueStyle={{ color: "#3f8600" }}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="OFFLINE"
                                value={
                                    (stations.filter((aa) => aa.status === "OFFLINE") || []).length
                                }
                                valueStyle={{ color: "#cf1322" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Card
                title="Stations"
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
                    dataSource={stations}
                    columns={columns}
                    pagination={Pagination(totalElements, number, size)}
                    onChange={(e) => onChangeSize(e.current - 1, e.pageSize)}
                />
                <OutletBindModal />
                <SlotModal />
                <VolumeModal />
            </Card>
        </>
    );
};
export default Stations;
