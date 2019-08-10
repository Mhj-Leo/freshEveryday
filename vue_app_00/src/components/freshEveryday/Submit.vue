<template>
    <div class="container">
            <div v-for="(item,index) of list" :key="index" class="product-item">
                    <div class="product-item-img">
                      <img :src="item.pic">
                    </div>
                    <div class="item-detail">
                      <p v-text="item.title"></p>
                      <p></p>
                      <div class="price">
                        <p v-text="`￥${item.price}`"></p>
                        <button @click="decrease" :data-index="index">-</button>
                        <span class="num">{{item.num}}</span>
                        <button @click="increse" :data-index="index">+</button>
                      </div>
                    </div>
                  </div>
                  <div class="bottom">
                    <span>合计：</span>
                    <span class="total" v-text="`￥${total.toFixed(2)}`"></span>
                    <button class="continue" @click="continueAdd">继续添加</button>
                    <button class="submit" @click="submitOrder">添加购物车</button>
                </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                // list:[],
        }
    },
        created(){
            // this.list=this.$store.getters.cart
            console.log(this.list)
        },
        methods:{
                increse(e){
                    /*获取点击的按钮下标*/
                    var idx=e.target.dataset.index;
                    /*将对应商品的个数加一*/
                    this.list[idx].num++;
                },
                decrease(e){
                    /*获取点击的按钮下标*/
                    var idx=e.target.dataset.index;
                    if(this.list[idx].num===1)return
                    /*将对应商品的个数减一*/
                    this.list[idx].num--
                },
                continueAdd(){
                    //继续添加商品
                    this.$router.push("/")
                },
                submitOrder(){
                    //将vuex中的购物车内容插入到数据库中
                    this.$messagebox.confirm("确认添加？")
                    .then(action=>{
                        for(var elem of this.list){
                            var p=elem.pic;
                            var pr=elem.price;
                            var t=elem.title;
                            var n=elem.num;
                            var uid = sessionStorage.getItem("uid");
                            console.log(uid)
                            var obj = {pic:p,price:pr,title:t,num:n,uid:uid}
                            this.axios.get("submit",{params:obj})
                            .then(result=>{
                                this.$toast('添加成功')
                                this.$router.push("cart")
                            });
                        }
                    }).catch(err=>{
                        
                    })
                }
        },
        computed:{
            list(){
                //获取共享仓库中的cart数据放入list中
                return this.$store.getters.cart;
            },
            /*计算商品总计并返回结果到页面*/
                total(){
                    var sum=0;
                    this.list.forEach(function(item){
                        sum+=item.price*item.num;
                    })
                    return sum;
                }
            },
    }
</script>
<style scoped>
    .hide{display:none}
    .container{
        height:1000px;
        position:relative;
    }
    .product-item{
        display: flex;
        position:relative;
        justify-content: space-around;
        flex-wrap: nowrap;
        width:375px;
        height:114px;
        margin-top:20px;
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;
}
.bottom{
    width:100%;
    height:60px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border:1px solid #eee;
    position:absolute;
    top:1000px;
    line-height: 60px;
}
.submit,.continue{
    background:#ff4891;
    color:#fff;
    border:none;
    width:130px;
    height:48px;
    text-align:center;
    line-height: 48px;
    margin-top:5px;
}
.total{
    color:#ff4891;
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
.price button{
    background:#ff4891;
    color:#fff;
    border:none;
    width:40px;
    height:30px;
    line-height: 30px;
}
.price span{
    margin-top:5px;
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