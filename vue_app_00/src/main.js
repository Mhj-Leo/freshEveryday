import Vue from 'vue'
import App from './App.vue'
import router from './router'
//以上三行不要动保存原来位置
//原因:引入有序
import MyHeader from './components/freshEveryday/MyHeader'
//将对象变为全局组件
Vue.component("my-header",MyHeader);
//第三方组件库在下面引入
//完整引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//1:完整引入mint-ui
import MintUI from 'mint-ui' 
//2:单引引入mint-ui样式
import 'mint-ui/lib/style.css'
//3:将mint-ui注册vue
Vue.use(MintUI);
//4:引入图标字体样式文件
import "./font/iconfont.css"
//5.引入axios.js文件
import axios from "./axios"
//6.引入vuex
import Vuex from "vuex"
//7.注册vuex组件
Vue.use(Vuex)
//8.创建vue实例

//创建一个数据仓库
const myStore = new Vuex.Store({
  //初始化状态
  state:{
    cart:[]
  },
  //获取vuex中全局共享的数据
  getters:{
    cart:function(state){
      return state.cart;
    }
  },
  //修改状态
  mutations:{
    //添加商品
    add:(state,value)=>{
      state.cart.push(value)
    },
  },
  actions:{
    
  }
});
//9.将store保存到vue实例中
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  store:myStore
}).$mount('#app')
