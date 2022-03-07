import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Input,
    Row,
    Dropdown,
    Card,
    Col,
    Button,
    PageHeader,
    Form,
    Select,
    TimePicker,
} from "antd";
import {
    getData,
    settingSelectors,
    onChangeHandlerSetting,
    onChangeHandlerSettingBilling,
    onSave,
    changeTime,
    addBusinessTime,
    removeBusinessTime,
} from "../../../slice/settingSlice";
import moment from "moment";
const { Option } = Select;

const BasicSettings = ({ match: { params }, history }) => {
    let { type } = params;
    const { data, state, saveLoading } = useSelector(settingSelectors.getList);
    const dispatch = useDispatch();
    const format = "HH:mm";
    const [day, setDay] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        if (type === "basic") {
            dispatch(getData({ type: 1 }));
        } else if (type === "billing") {
            dispatch(getData({ type: 2 }));
        } else if (type === "time") {
            dispatch(getData({ type: 3 }));
        }
    }, [type]);

    function onSubmit() {
        if (type === "billing") {
            dispatch(onSave({ data: data.defaultBillingRule, type }));
        } else if (type === "time") {
            dispatch(onSave({ data, type }));
        } else {
            dispatch(onSave({ data: { systemConfigs: data }, type }));
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
        <div style={{ width: 600, maxWidth: "100%" }}>
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                autoComplete="off"
                onFinish={() => onSubmit()}
            >
                {type === "basic" ? (
                    <div>
                        <PageHeader className="site-page-header" title="Basic Settings" />
                        <Form.Item label="Outlet Name">
                            <Input
                                type="number"
                                value={data.consumerHotline}
                                name="consumerHotline"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSetting({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Leasable electricity">
                            <Select
                                style={{ marginBottom: 10, display: "block" }}
                                value={data.leasableBatteryLevel}
                                name="leasableBatteryLevel"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSetting({
                                            name: "leasableBatteryLevel",
                                            value: e,
                                        })
                                    )
                                }
                            >
                                <Option value="0">1%</Option>
                                <Option value="1">21%</Option>
                                <Option value="2">41%</Option>
                                <Option value="3">61%</Option>
                                <Option value="4">81%</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Default language">
                            <Select
                                style={{ marginBottom: 10, display: "block" }}
                                value={data.defaultLanguage}
                                name="defaultLanguage"
                                disabled
                            >
                                <Option value="mn" disabled>
                                    MN
                                </Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Map setting">
                            <Input value={data.mapSetting} name="mapSetting" disabled />
                        </Form.Item>
                    </div>
                ) : null}
                {type === "billing" ? (
                    <div>
                        <PageHeader className="site-page-header" title="Billing rule" />
                        <Form.Item label="Boost amount">
                            <Input
                                type="number"
                                value={data.defaultBillingRule?.boostAmount}
                                name="boostAmount"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.deposit}
                                name="deposit"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.freeTime}
                                name="freeTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.maxRentalTime}
                                name="maxRentalTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.price}
                                name="price"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.pricePerTime}
                                name="pricePerTime"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
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
                                value={data.defaultBillingRule?.topLimit}
                                name="topLimit"
                                onChange={(e) =>
                                    dispatch(
                                        onChangeHandlerSettingBilling({
                                            name: e.target.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                        </Form.Item>
                    </div>
                ) : null}
                {type === "time" ? (
                    <div>
                        <PageHeader className="site-page-header" title="Business hours" />
                        <div style={{ textAlign: "center", display: "block" }}>
                            <div>
                                {data.businessHours?.map((aa, index) => (
                                    <div style={{ marginBottom: 10 }}>
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
                <Button loading={saveLoading} htmlType="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};
export default BasicSettings;
