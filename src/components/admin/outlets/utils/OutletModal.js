import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Form, Select, Input, PageHeader, TimePicker, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import GoogleMap from "google-map-react";
import {
    onChangeHandlerOutlet,
    onChangeHandlerOutletBilling,
    outletHandleCancel,
    outletSelectors,
    onSubmitOutletSave,
    addBusinessTime,
    changeTime,
    onSubmitOutletSaveEdit,
    removeBusinessTime,
} from "../../../../slice/outletSlice";
import moment from "moment";
const { Option } = Select;

const OutletModal = () => {
    const { outletModal, outlet, merchants, merchantsLoading, saveLoading, editType } = useSelector(
        outletSelectors.getOutletData
    );
    const format = "HH:mm";
    const [day, setDay] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const dispatch = useDispatch();

    function onSubmitOutlet() {
        if (editType === "all") {
            dispatch(onSubmitOutletSave(outlet));
        } else {
            dispatch(onSubmitOutletSaveEdit({ outlet, editType }));
        }
    }

    function addTime() {
        if (start && end) {
            dispatch(addBusinessTime({ day, start, end }));
            setTimeout(function () {
                setDay(0);
                setStart("");
                setEnd("");
            }, 100);
        } else {
            message.warning("Please select time");
        }
    }
    return (
        <Drawer
            placement="right"
            width={600}
            onClose={() => dispatch(outletHandleCancel())}
            visible={outletModal}
            title={
                <div>
                    {outlet.id ? "Edit Outlet" : "Add Outlet"}
                    <Button
                        size="small"
                        icon={<SaveOutlined />}
                        style={{ marginLeft: 30, float: "right" }}
                        type="primary"
                        onClick={() => onSubmitOutlet()}
                        loading={saveLoading}
                    >
                        Save
                    </Button>
                </div>
            }
            maskClosable={false}
        >
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} autoComplete="off">
                {editType === "all" || editType === "basic" ? (
                    <div>
                        <PageHeader
                            className="site-page-header"
                            title="Basic Information"
                            // breadcrumb={{ routes }}
                            // subTitle="This is a subtitle"
                        />
                        <Form.Item label="Outlet Name">
                            <Input
                                type="text"
                                value={outlet.outletName}
                                name="outletName"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Address 1">
                            <Input
                                type="text"
                                value={outlet.address1}
                                name="address1"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Address 2">
                            <Input
                                type="text"
                                value={outlet.address2}
                                name="address2"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="City">
                            <Input
                                type="text"
                                value={outlet.city}
                                name="city"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Merchant">
                            <Select
                                style={{ marginBottom: 10, display: "block" }}
                                value={outlet.merchantId}
                                name="merchantId"
                                loading={merchantsLoading}
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: "merchantId",
                                            value: e,
                                        })
                                    )
                                }
                            >
                                <Option value="" disabled>
                                    Please select
                                </Option>
                                {(merchants || []).map((item, ind) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div style={{ width: "100%", height: 300 }}>
                            <GoogleMap
                                onClick={(ev) => {
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: "lat",
                                            value: ev.lat,
                                        })
                                    );
                                    dispatch(
                                        onChangeHandlerOutlet({
                                            name: "log",
                                            value: ev.lng,
                                        })
                                    );
                                }}
                                defaultZoom={15}
                                defaultCenter={{ lat: 47.9188727, lng: 106.9153898 }}
                            >
                                {outlet.lat && outlet.log ? (
                                    <div lat={outlet.lat} lng={outlet.log} text="My Marker">
                                        <img
                                            src="/images/pin.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                            style={{ position: "relative", top: -15, left: -15 }}
                                        />
                                    </div>
                                ) : null}
                            </GoogleMap>
                        </div>
                    </div>
                ) : null}
                {editType === "all" || editType === "time" ? (
                    <div>
                        <PageHeader
                            className="site-page-header"
                            title="Business hours"
                            // breadcrumb={{ routes }}
                            // subTitle="This is a subtitle"
                        />
                        <div style={{ textAlign: "center", display: "block" }}>
                            <div>
                                {outlet.businessHours?.map((aa, index) => (
                                    <div style={{ marginBottom: 10 }} key={index}>
                                        <Select
                                            style={{ marginRight: 10, width: 100 }}
                                            size="small"
                                            value={aa.day}
                                            onChange={(e) =>
                                                dispatch(
                                                    changeTime({
                                                        name: "day",
                                                        index,
                                                        value: e,
                                                    })
                                                )
                                            }
                                        >
                                            <Option value={0}>Mon</Option>
                                            <Option value={1}>Tue</Option>
                                            <Option value={2}>Wed</Option>
                                            <Option value={3}>Thu</Option>
                                            <Option value={4}>Fri</Option>
                                            <Option value={5}>Sat</Option>
                                            <Option value={6}>Sun</Option>
                                        </Select>
                                        <TimePicker
                                            format={format}
                                            style={{ marginRight: 10 }}
                                            value={moment(aa.start, format)}
                                            size="small"
                                            onChange={(e) =>
                                                dispatch(
                                                    changeTime({
                                                        name: "start",
                                                        index,
                                                        value: moment(e, format).format(format),
                                                    })
                                                )
                                            }
                                        />
                                        <TimePicker
                                            format={format}
                                            style={{ marginRight: 10 }}
                                            value={moment(aa.end, format)}
                                            size="small"
                                            onChange={(e) =>
                                                dispatch(
                                                    changeTime({
                                                        name: "end",
                                                        index,
                                                        value: moment(e, format).format(format),
                                                    })
                                                )
                                            }
                                        />
                                        <Button
                                            onClick={() => dispatch(removeBusinessTime({ index }))}
                                            size="small"
                                            danger
                                            style={{ width: 100 }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <Select
                                    style={{ marginRight: 10, width: 100 }}
                                    size="small"
                                    value={day}
                                    onChange={(e) => setDay(e)}
                                >
                                    <Option value={0}>Mon</Option>
                                    <Option value={1}>Tue</Option>
                                    <Option value={2}>Wed</Option>
                                    <Option value={3}>Thu</Option>
                                    <Option value={4}>Fri</Option>
                                    <Option value={5}>Sat</Option>
                                    <Option value={6}>Sun</Option>
                                </Select>
                                {start ? (
                                    <TimePicker
                                        format={format}
                                        style={{ marginRight: 10 }}
                                        value={moment(start, format)}
                                        size="small"
                                        onChange={(e) => setStart(moment(e, format).format(format))}
                                    />
                                ) : (
                                    <TimePicker
                                        format={format}
                                        value={undefined}
                                        size="small"
                                        style={{ marginRight: 10 }}
                                        onChange={(e) => setStart(moment(e, format).format(format))}
                                    />
                                )}
                                {end ? (
                                    <TimePicker
                                        format={format}
                                        style={{ marginRight: 10 }}
                                        value={moment(end, format)}
                                        size="small"
                                        onChange={(e) => setEnd(moment(e, format).format(format))}
                                    />
                                ) : (
                                    <TimePicker
                                        format={format}
                                        value={undefined}
                                        size="small"
                                        style={{ marginRight: 10 }}
                                        onChange={(e) => setEnd(moment(e, format).format(format))}
                                    />
                                )}
                                <Button
                                    onClick={() => addTime()}
                                    size="small"
                                    style={{ width: 100 }}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null}
                {editType === "all" || editType === "billing" ? (
                    <div>
                        <PageHeader
                            className="site-page-header"
                            title="Billing rule"
                            // breadcrumb={{ routes }}
                            // subTitle="This is a subtitle"
                        />
                        <Form.Item label="Boost amount">
                            <Input
                                type="number"
                                value={outlet.billingRule.boostAmount}
                                name="boostAmount"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Deposit">
                            <Input
                                type="number"
                                value={outlet.billingRule.deposit}
                                name="deposit"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Free time">
                            <Input
                                type="number"
                                suffix="minute"
                                value={outlet.billingRule.freeTime}
                                name="freeTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Max rental time">
                            <Input
                                type="number"
                                suffix="hour"
                                value={outlet.billingRule.maxRentalTime}
                                name="maxRentalTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input
                                type="number"
                                value={outlet.billingRule.price}
                                name="price"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Price per time">
                            <Input
                                type="number"
                                suffix="minute"
                                value={outlet.billingRule.pricePerTime}
                                name="pricePerTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Top limit">
                            <Input
                                type="number"
                                suffix="minute"
                                value={outlet.billingRule.topLimit}
                                name="topLimit"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerOutletBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                    </div>
                ) : null}
            </Form>
        </Drawer>
    );
};
export default OutletModal;
