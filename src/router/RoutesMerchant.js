import MerchantLayer from "../components/MerchantLayer";
import Outlets from "../components/admin/outlets";
import Stations from "../components/admin/stations";
import NotFound from "../components/NotFound";
export default [
    {
        component: MerchantLayer,
        routes: [
            {
                component: Outlets,
                path: "/",
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
