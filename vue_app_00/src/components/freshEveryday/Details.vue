<template>
    <div class="container">
        <div class="detail"><p>商品详情</p></div>
        <van-swipe 
        :autoplay="3000" indicator-color="white" class="swipe">
            <van-swipe-item class="swipeitem">
                <img :src="product.banner1">
            </van-swipe-item>
            <van-swipe-item class="swipeitem">
                <img :src="product.banner2"
            </van-swipe-item>
            <van-swipe-item class="swipeitem">
                <img :src="product.banner3">
            </van-swipe-item>
        </van-swipe>
        <div class="product-desc">
            <span class="subtitle-text" v-text="product.title"></span>
            <p v-text="product.subTitle"></p>
            <p class="price">￥{{product.price}}</p>
        </div>
        <van-goods-action class="goodaction">
            <van-goods-action-icon
                icon="chat-o"
                text="客服"
            />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
            />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
            />
        </van-goods-action>
    </div>
</template>
<script>
export default {
    data(){
        return{
            product:[]
        }
    },
    methods: {
        
    },
    props:["lid"],//准备接参数
	created(){
      		this.load();
  },
    methods:{
       load(){
		   //发送ajax请求 axios
            var url="details";//请求地址
			var obj={lid:this.lid}
            this.axios.get(url,{params:obj}).then(result=>{
				this.product=result.data.product;
				console.log(result)
            })
	   }
    },
	watch:{
		"$route"(){//$route=location
			this.load();
		}
	},
}
</script>
<style scoped>
    .container{height:530px;position:relative;}
    .goodaction{
        position:absolute;
        top:430px;
    }
    .detail{width:100%;}
    .detail p{
        color:#ff4891;
        width:80px;
        border-bottom:3px solid #ff4891;
        font-size:20px;
        margin:20px 40%;
    }
    .swipe{
        width:375px;
        height:249px;
    }
    .swipeitem{width:100%}
    .swipeitem img{
        width:375px;
        height:100%;
    }
    .product-desc{
        margin-top:10px;
    }
    .subtitle-text{
        font-size:18px;
        color:#474245;
        vertical-align: baseline;
        font-weight: 700;
    }
    .product-desc p:nth-child(2){
        font-size:16px;
        color:#474245;
    }
    .price{
        color:#ff4891;
        font-size:12px;
        font-weight: bold;
        margin-left:0;
    }
</style>