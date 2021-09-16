import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        "path": "/",
        redirect: "/Login"
    },
    {
        "path": "/regis",
        component: () => import("@/pages/regis.vue")
    },
    {
        "path": "/login",
        component: () => import("@/pages/Login.vue")
    },
    {
        "path": "/main",
        component: () => import("@/pages/Main.vue"),
        children: [
            {
                "path": "/bikeList",
                component: () => import("@/components/BikeList.vue")
            },
            {
                "path": "/bikeQuery",
                component: () => import("@/components/BikeQuery.vue")
            },
            {
                "path": "/messages",
                component: () => import("@/components/Messages.vue")
            },
            {
                "path": "/aboutUs",
                component: () => import("@/components/AboutUs.vue")
            }
        ],
        redirect: "/bikeList"
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
