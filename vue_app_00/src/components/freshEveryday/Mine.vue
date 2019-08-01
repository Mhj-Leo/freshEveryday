<template>
<div class="container">
    <div class="user-login">
  <img src="../../assets/user-login-bg.png">
  <button @click='login'>用户登录</button>
</div>
<div class="user-items">
  <div>
    <p>余额</p>
    <p>0</p>
  </div>
  <div>
    <p>红包</p>
    <p>0</p>
  </div>
  <div>
    <p>商品券</p>
    <p>0</p>
  </div>
  <div>
    <p>积分兑换</p>
  </div>
</div>
<div class="plus-text">
  <p>会员权益</p>
  <p>成为优享会员，预计1年将为你节省1121.3元</p>
</div>
<div class="plus-items">
  <div>
    <img src="../../assets/m1.png">
    <p>会员专享价</p>
  </div>
  <div>
    <img src="../../assets/m2.png">
    <p>1小时送达</p>
  </div>
  <div>
    <img src="../../assets/m3.png">
    <p>专属客服</p>
  </div>
  <div>
    <img src="../../assets/m4.png">
    <p>敬请期待</p>
  </div>
</div>
<div class="advertisement">
  <img src="../../assets/lingqian.jpg">
  <img src="../../assets/qianggou.jpg">
</div>
</div>
</template>
<script>
export default {
    data(){
            return{
                list:[],
            }
        },
        methods: {
            login(){
                this.$router.push("/Login")
            }
        },
}
</script>
<style scoped>
.user-login{
  width:100%;
  height:162px;
  position:relative;
}
.user-login img{
  width:100%;
  height:100%;
}
.user-login button{
  position:absolute;
  top:30%;
  left:40%;
  border:1px solid #ff4891;
  color:#ff4891;
  border-radius:10px;
}
.user-items{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.user-items div p{
  font-size:16px;
  color:#4d4d4d;
}
.plus-text{
  display: flex;
  flex-wrap: wrap;
  width:345px;
  height:60px;
  margin:20px auto;
}
.plus-text p:first-child{
  font-size:20px;
}
.plus-text p:nth-child(2){
  color:#4d4d4d;
  font-size:15px;
}
.plus-items{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top:40px;
}
.plus-items div{
  display: flex;
  flex-wrap: wrap;
  width:20%;
}
.plus-items div img{
  width:28px;
  height:28px;
  margin-left:12px;
}
.plus-items div p{
  font-size:12px;
  color:#4d4d4d;
}
.advertisement{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top:20px;
}
.advertisement img{
  width:49%;
  height:90px;
}
</style>