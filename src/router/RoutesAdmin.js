import AdminLayer from "../components/AdminLayer";
import Users from "../components/admin/users";
import Outlets from "../components/admin/outlets";
import Stations from "../components/admin/stations";
import Batteries from "../components/admin/batteries";
import Orders from "../components/admin/orders";
import BasicSettings from "../components/admin/basicSettings";
import Staffs from "../components/admin/staffs";
import Merchants from "../components/admin/merchants";
import Vendors from "../components/admin/vendors";
import NotFound from "../components/NotFound";
export default [
    {
        component: AdminLayer,
        routes: [
            {
                component: Users,
                path: "/",
                exact: true,
            },
            {
                component: Users,
                path: "/users",
                exact: true,
            },
            {
                component: Outlets,
                path: "/outlets",
                exact: true,
            },
            {
                component: Stations,
                path: "/devices/stations",
                exact: true,
            },
            {
                component: Batteries,
                path: "/devices/batteries",
                exact: true,
            },
            {
                component: Orders,
                path: "/orders/:status",
                exact: true,
            },
            {
                component: BasicSettings,
                path: "/settings/:type",
                exact: true,
            },
            {
                component: Staffs,
                path: "/accounts/staffs",
                exact: true,
            },
            {
                component: Merchants,
                path: "/accounts/merchants",
                exact: true,
            },
            {
                component: Vendors,
                path: "/accounts/vendors",
                exact: true,
            },
            {
                component: NotFound,
                path: "/404",
            },
            {
                component: NotFound,
                path: "/*",
            },
        ],
    },
];
