import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Spin } from "antd";
import RoutesAdmin from "./RoutesAdmin";
import RoutesMerchant from "./RoutesMerchant";
import RoutesVendor from "./RoutesVendor";
import RoutesLogin from "./RoutesLogin";
import { mainSelectors, getUserData } from "../slice/mainSlice";

const index = () => {
    const { loading, user } = useSelector(mainSelectors.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <React.Fragment>
            {loading ? (
                <Spin
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    size="large"
                />
            ) : (
                <BrowserRouter>
                    {renderRoutes(
                        user?.id
                            ? user?.role?.id === 1
                                ? RoutesAdmin
                                : user?.role?.id === 6
                                ? RoutesMerchant
                                : user?.role?.id === 5
                                ? RoutesVendor
                                : null
                            : RoutesLogin
                    )}
                </BrowserRouter>
            )}
        </React.Fragment>
    );
};
export default index;
