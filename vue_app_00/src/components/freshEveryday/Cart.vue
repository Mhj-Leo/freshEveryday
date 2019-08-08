<template>
    <div class="container">
            <div v-for="(item,index) of list" :key="index" class="product-item">
                    <div class="product-item-img">
                      <img :src="item.pic">
                    </div>
                    <div class="item-detail">
                      <p v-text="item.title"></p>
                      <div class="price">
                        <p v-text="`￥${item.price}`"></p>
                        <button :data-index="index" class="delItem" @click="delItem">删除</button>
                      </div>
                    </div>
                  </div>
                  <p class="empty" :class="bClass">空空如也</p>
                  <button class="goToAdd" :class="bClass"
                  @click="goToAdd">赶紧去添加！</button>
                  <div class="bottom">
                    <button class="pay" @click="pay">前往支付</button>
                </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],
                bClass:{
                    hide:true
                }
        }
    },
        created(){
            this.load()
                
        },
        methods:{
            load(){
                    var url="/cart";
                    this.axios.get(url,{param:{}}).then(result=>{
                    // 如果查到数据，显示列表
                    this.list=result.data.data;
                    // console.log(this.list)
                    })
                },
                pay(){
                    this.$router.push("/Submit")
                },
                goToAdd(){
                    this.$router.push("/")
                },
                delItem(e){
                //1.获取当前商品id
                var idx=e.target.dataset.index;
                console.log(idx)
                //2.显示交互确认框
                //3.如果用户选择“确认”
                this.$messagebox.confirm("确认执行操作").then(action=>{
                // //4.发送ajax请求删除数据
                // var url="delItem";
                // var obj={id:id}
                // this.axios.get(url,{params:obj}).then(result=>{
                    //从页面上删除商品
                    this.list.splice(idx,1)
                    if(this.list.length==0){
                        this.$toast('您的购物车空啦！')
                        this.bClass.hide=!this.bClass.hide;
                    }
                    //重新加载数据，等于刷新
                    // this.load();
                    this.$messagebox("提示","删除成功")
                // })
                }).catch(err=>{
                    return;
                })
            },
        },
        computed:{

            },
    }
</script>
<style scoped>
    .hide{
        display:none
    }
    .container{
        height:900px;
        position:relative;
    }
    .empty{
        position: absolute;
        top:100px;
        left:50px;
        color:#eee;
        font-family:'微软雅黑';
        font-weight:bold;
        font-size:70px;
    }
    .goToAdd{
        background:#ff4891;
        color:#fff;
        border:none;
        width:110px;
        position:absolute;
        top:200px;
        left:130px;
        height:30px;
        line-height: 30px;
    }
    .delItem{
        background:#ff4891;
        color:#fff;
        border:none;
        width:50px;
        height:30px;
        line-height: 30px;
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
    border:none;
    position:absolute;
    top:900px;
    left:220px;
    line-height: 60px;
}
.pay{
    background:#ff4891;
    color:#fff;
    border:none;
    width:130px;
    height:48px;
    text-align:center;
    line-height: 48px;
    margin-top:5px;
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