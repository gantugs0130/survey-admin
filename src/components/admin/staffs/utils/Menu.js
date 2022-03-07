import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import { toggleAccount, setStaffModal } from "../../../../slice/staffSlice";
import { mainSelectors } from "../../../../slice/mainSlice";

const MenuI = ({ record }) => {
    const { user } = useSelector(mainSelectors.getUser);
    const dispatch = useDispatch();
    return (
        <Menu>
            {user.role.id === 1 ? (
                <React.Fragment>
                    <Menu.Item
                        key="1"
                        onClick={() => {
                            dispatch(
                                toggleAccount({
                                    id: record.id,
                                })
                            );
                        }}
                    >
                        {record.isEnabled ? "Disable account" : "Enable account"}
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        onClick={() => {
                            dispatch(
                                setStaffModal({
                                    staff: record,
                                    type: "password",
                                    value: true,
                                })
                            );
                        }}
                    >
                        Change password
                    </Menu.Item>
                </React.Fragment>
            ) : null}
        </Menu>
    );
};
export default MenuI;
