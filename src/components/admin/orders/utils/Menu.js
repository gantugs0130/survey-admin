import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Popconfirm } from "antd";
import { cancelOrder } from "../../../../slice/orderSlice";

const MenuI = ({ record, history }) => {
    const dispatch = useDispatch();
    return (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => history.push("/outlets", { outletId: record.rentalOutlet?.id })}
            >
                Outlet information
            </Menu.Item>
            <Popconfirm
                title="Are you sure to Delete the Order ?"
                onConfirm={() => {
                    dispatch(
                        cancelOrder({
                            id: record.id,
                        })
                    );
                }}
                disabled={record.orderStatus === "CANCELED_ORDER" || record.loading}
                okText="Yes"
                cancelText="No"
            >
                <Menu.Item
                    disabled={record.orderStatus === "CANCELED_ORDER" || record.loading}
                    key="3"
                >
                    Cancel order
                </Menu.Item>
            </Popconfirm>
        </Menu>
    );
};
export default MenuI;
