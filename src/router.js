import Vue from 'vue'
import Router from 'vue-router'
//import Index from './pages/index'
//import MyWeight from './pages/myWeight'
const Index = ()=>import('./pages/index.vue')
const MyWeight = ()=>import('./pages/myWeight.vue')

Vue.use(Router);
export default new Router({
    routes:[
        {
            path:'/',
            component:Index,
        },
        {
            path: '/myWeight',
            component: MyWeight,
        }
    ]
})