<template>
<div class="container">
  <div class="top" style="margin-top:20px;margin-bottom:20px;">
      <img style="width:55px;height:14px;" 
      src="../../../public/img/logo.png" alt="">
      <span style="width:180px;" @click="jumpAddress">秦淮区人...</span>
      <img style="width:20px;height:20px;" 
      src="../../../public/img/下拉.png" alt="">
      <input type="text" placeholder="请输入关键词" class="search">
  </div>
<div class="nav">
  <span>热销爆品</span>
  <span>0元菜场</span>
  <span>新鲜蔬菜</span>
  <span>时令水果</span>
</div>
<div class="picNav">
  <div>
    <img src="../../assets/1.png">
    <p>邀请有礼</p>
  </div>
  <div>
    <img src="../../assets/2.png">
    <p>吃什么</p>
  </div>
  <div>
    <img src="../../assets/3.png">
    <p>超值会员</p>
  </div>
  <div>
    <img src="../../assets/4.png">
    <p>签到有礼</p>
  </div>
  <div>
    <img src="../../assets/5.png">
    <p>储值有礼</p>
  </div>
</div>
<div class="centerPic">
  <img src="../../assets/jicard.png">
  <img src="../../assets/market.png">
</div>
<img class="advertisement" src="../../assets/advertisement.png">
<div v-for="(item,index) of productList" :key="index" class="product-item">
  <div class="product-item-img">
    <router-link :to="`/details/${item.href.split('=')[1]}`"><img :src="item.pic"></router-link>
  </div>
  <div class="item-detail">
    <p v-text="item.title"></p>
    <p v-text="item.subTitle"></p>
    <div class="price">
      <p v-text="`￥${item.price}`"></p>
      <a href="#"><img :data-index="index"
        @click="pushIntoCart" src="../../assets/cart.png" class='cart'></a>
    </div>
  </div>
</div>
<button @click="loadMore" 
 style="width:100%;height:45px;background:#ff4891;color:#fff;
 border:none;">加载更多</button>
</div>
</template>
<script>
export default {
    data(){
        return{
            pno:0,//页码
            ps:5,//页大小
            value:'',
            selected:true,
            productList:[],
            currentIndex:[
                    {isSelect:true},
                    {isSelect:false},
                    {isSelect:false},
                    {isSelect:false},
                ]
        }
    },
    created(){
      		//发送ajax请求 axios
            var url="/";//请求地址
            this.axios.get(url).then(result=>{
				    this.productList=result.data;
            }),
            //再次调用，重新请求数据
            this.loadMore()
  },
    methods:{
      loadMore(){//加载更多主页面商品的数据
            var url = "home";
            //当前页码加一
            this.pno++;
            //创建一个参数对象
            var obj = {pno:this.pno,pageSize:this.ps};
            this.axios.get(url,{params:obj}).then(result=>{
                // console.log(result.data.data);
                //数据的覆盖
                //this.list = result.data.data;
                //数据的追加
                var rows = this.productList.concat (result.data.data);
                this.productList = rows;
                // console.log(this.productList)
            })
        },
          pushIntoCart(e){
            //将商品添加进购物车
            //定义一个空的购物车
            var idx = e.target.dataset.index
            // console.log(idx)
            var cart = []
            for(var i=0;i<this.productList.length;i++){
              //遍历请求回来的购物车列表
              var cart1 = {}
              //将图片，价格，数量，标题加入定义的空购物车
              cart1.pic=this.productList[idx].pic;
              cart1.price=this.productList[idx].price;
              cart1.num=this.productList[idx].num;
              cart1.title=this.productList[idx].title;
            }
            // 放入购物车数组
            cart.push(cart1);
            // console.log(cart)
            // 将购物车数组转为JSON字符串str
            var str=JSON.stringify(cart);
            // 将str放入sessionStorage中
            sessionStorage.setItem("cart",str);
          // console.log(sessionStorage.cart);
          // 跳转到购物车界面
            this.$router.push("/cart");
          },
          changeState(n){
                    //n为当前按钮下标
                    //创建循环数据
                    for(var i=0;i<this.currentIndex.length;i++){
                        if(n==i){
                            this.currentIndex[i].isSelect=true;
                        }else{
                            this.currentIndex[i].isSelect=false;
                        }
                    }
                },
                jumpAddress(){
                  this.$router.push("/Address")
                }
                
    },
}
</script>
<style scoped>
  .top{
    line-height:50px;
    position: relative;
  }
.search{
    width:150px;
    height:28px;
    position:absolute;
    top:10px;
    left:140px;
    border-radius:15px;
    margin-left:70px;
    border:1px solid #eee;
    background: url("../../assets/search.png") no-repeat;
    background-position: 120px;
    background-size:contain;
}
.nav{
  display:flex;
  justify-content: space-around;
  flex-wrap:nowrap;
}
.nav span{
  height:30px;
  width:22%;
  font-size:12px;
  text-align:center;
  line-height:30px;
}
.nav span:hover{
  color:#ff4891;
  border-bottom:2px solid #ff4891;
}
.picNav{
  display:flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top:20px;
}
.picNav div{
  width:14%;
  height:50px;
}
.picNav div img{
  width:35px;
  height:35px;
}
.picNav div p{
  font-size:11px;
}
.centerPic{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top:18px;
}
.centerPic img{
  width:48%;
  height:100px;
}
.advertisement{
  width:100%;
  height:95.5px;
}
.product-item{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.product-item-img{
  width:120px;
  height:126px;
}
.product-item-img img{
  width:120px;
  height:120px;
}
.item-detail{
  width:207.5px;
  height:132px;
}
.cart{
  width:45px;
  height:45px;
  margin-top:-10px;
}
.price{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  color:#ff4891;
  margin-top:30px;
}
.item-detail p:first-child{
    font-size:16px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.item-detail p:nth-child(2){
  color:#969696;
  font-size:14px;
}
.price p{
    margin-top:0px;
}
</style>