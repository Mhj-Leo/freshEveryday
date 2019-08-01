<template>
    <div class="cart">
        <div class="selectAll">
        <!--全选按钮-->
            全选<input type="checkbox" @change="selectAll"/>
        </div>
        <div class="cart-item" v-for="(item,i) of list" :key="i">
        <!--商品列表-->
            <div class="leftImgText">
                <input type="checkbox" v-model="item.cb"/>
                <img :src="'http://127.0.0.1:3000/img/'+item.img_url"/>
                <div class="price">
                    <span v-text="`￥${item.price}`"></span>
                </div>
            </div>
            <mt-button type="danger" :data-id="item.id" @click="delItem">删除</mt-button>
        </div>
        
        <div>
        <!--删除选中的商品-->
            <mt-button size="large" type="danger"
            @click="delAll">
            删除选中的商品
            </mt-button>
            <h3>
                购物车数量：
                <span style="color:red">
                    {{$store.getters.getCartCount}}
                </span>
            </h3>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],
            }
        },
        created(){
            this.loadMore();
        },
        methods:{
            delItem(e){
                //1.获取当前商品id
                var id=e.target.dataset.id;
                //2.显示交互确认框
                //3.如果用户选择“确认”
                this.$messagebox.confirm("确认执行操作").then(action=>{
                //4.发送ajax请求删除数据
                var url="delItem";
                var obj={id:id}
                this.axios.get(url,{params:obj}).then(result=>{
                    //重新加载数据，等于刷新
                    this.loadMore();
                    this.$messagebox("提示","删除成功")
                })
                }).catch(err=>{
                    return;
                })
                //5.如果用户选择“取消”
            },
            delAll(){
                //删除多个商品
                //1.创建变量保存空字符串
                var str="";
                //2.遍历数组拼接字符串内容
                for(var item of this.list){
                    if(item.cb){
                        str += item.id+","
                    }
            }
                //去掉末尾的逗号
            str = str.substring(0,str.length-1);
                 //3.判断，如果用户没选商品，提示
                 if(str.length==0){
                     this.$messagebox("提示","请选择商品");
                     return;
                 }
                //4.发送ajax请求
                var url = "delAll";
                var obj = {ids:str};
                this.axios.get(url,{params:obj}).then(result=>{
                //5.重新加载数据
                    this.loadMore();
                })
            },
            selectAll(e){
                //全选按钮的状态
               var cb = e.target.checked;
                //依据状态修改列表cb
                for(var item of this.list){
                    item.cb=cb;
                }
            },
            loadMore(){
		this.$store.commit("clear");
                //1.创建url
                var url = "cart";
                //2.发送ajax请求
                this.axios.get(url).then(result=>{
                    console.log(result)
                    // this.list=result.data.data;
                    //1.获取服务器数据
                    var rows = result.data.data;
                    //2.遍历数组中每个对象,为其添加cb属性
                    //cb控制商品复选框
                    for(var item of rows){
                        //2.1添加cb属性
                        item.cb=false;
                        //2.2更新购物车的数量
                        this.$store.commit("increment");
                    }
                    //3.将新数据保存
                    this.list = rows;
                })
            }
        },
    }
</script>
<style>
    .cart-item{
        display:flex;
        justify-content:space-between;
        align-item:center;/*垂直居中*/
        border-bottom:1px solid #ccc;
    }
    .leftImgText{
        /*默认子元素水平对齐 */
        display:flex;
    }
    .leftImgText img{
        width:50px;
        height:50px;
    }
    .price{
        margin-left:40px;
        color:#7767E2;
        font-size:30px;
    }
</style>