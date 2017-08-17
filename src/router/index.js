import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import List from '@/components/List'
import Info from '@/components/Info'
import About from '@/components/About'
import Detail from '@/components/Detail'
import Regist from '@/components/Regist'
import Cart from '@/components/Cart'
import Order from '@/components/Order'
import Steps from '@/components/Steps'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }, {
        path: '/list',
        name: 'List',
        component: List
    }, {
        path: '/info',
        name: 'Info',
        component: Info
    }, {
        path: '/about',
        name: 'About',
        component: About
    }, {
        path: '/detail/:drug_id',
        name: 'Detail',
        component: Detail
    },{
        path: '/regist',
        name: 'Regist',
        component: Regist
    },{
        path: '/cart',
        name: 'Cart',
        component: Cart
    },{
        path: '/order',
        name: 'Order',
        component: Order
    },{
        path: '/steps',
        name: 'Steps',
        component: Steps        
    }]
})
