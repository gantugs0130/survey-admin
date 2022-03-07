import VendorLayer from "../components/VendorLayer";
import Orders from "../components/admin/orders";
import NotFound from "../components/NotFound";
export default [
    {
        component: VendorLayer,
        routes: [
            {
                component: Orders,
                path: "/orders/:status",
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
