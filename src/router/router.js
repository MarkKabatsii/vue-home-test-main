import Vue from 'vue'
import Router from 'vue-router'

import Catalog from "@/components/Catalog";
import Product from "@/components/Product";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/catalog/get?id=:userID',
            name: 'product',
            component: Product
        }
    ]
})

export default router;