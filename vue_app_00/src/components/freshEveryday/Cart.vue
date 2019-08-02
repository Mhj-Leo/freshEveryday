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
                        <button @click="decrease(index)">-</button>
                        <span class="num">{{item.num}}</span>
                        <button @click="increse(index)">+</button>
                      </div>
                    </div>
                    <div class="bottom">
                            <span>合计：</span>
                            <span class="total" v-text="`￥${(item.price*item.num).toFixed(2)}`"></span>
                            <a href="https://www.alipay.com/" class="submit">提交订单</a>
                        </div>
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
            var url = "cart";
                //2.发送ajax请求
                this.axios.get(url).then(result=>{
                    console.log(result)
                    this.list=result.data.data;
                    console.log(this.list)
                })
        },
        methods:{
                increse(index){
                    this.list[index].num++
                },
                decrease(index){
                    if(this.list[index].num===1)return
                    this.list[index].num--
                },
        },
        computed:{
                total(){
                    var sum=0;
                    this.products.forEach(function(item){
                        sum+=item.price*item.num;
                    })
                    return sum;
                }
            },
    }
</script>
<style scoped>
    .container{
        height:550px;
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
    top:600px;
    line-height: 60px;
}
.submit{
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