//router.js 引入路由
import Vue from 'vue'
import Router from 'vue-router'
//自定义组件
//1:引入Exam01.vue 组件 39
import Login from "./components/freshEveryday/Login"
import Reg from "./components/freshEveryday/Reg"
import Home from "./components/freshEveryday/Home"
import Mine from "./components/freshEveryday/Mine"
import Cart from "./components/freshEveryday/Cart"
import Details from "./components/freshEveryday/Details"
import Address from "./components/freshEveryday/Address"
import ALL from "./views/ALL"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:ALL,children:[
      {path:'/',component:Home,meta: {
        keepAlive: true
      }},
      {path:'/Mine',component:Mine},
      {path:'/Details/:lid',component:Details,props:true},
      {path:'/Address',component:Address},
    ]},
    {path:'/Login',component:Login},
    {path:'/Reg',component:Reg},
    {path:'/Cart',component:Cart},
  ]
})
