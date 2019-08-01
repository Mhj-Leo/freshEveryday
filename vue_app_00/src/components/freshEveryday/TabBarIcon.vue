<template>
    <div class="container">
    <mt-tabbar class="tabbar" v-model="selected">
  <mt-tab-item id="首页" @click.native="changeState(0)">
    <img slot="icon" src="../../assets/首页-未选中.png"
    :focused="currentIndex[0].isSelect" @click="jumpHome">
    首页
  </mt-tab-item>
  <mt-tab-item id="分类" @click.native="changeState(1)">
    <img slot="icon" src="../../assets/分类-未选中.png"
    :focused="currentIndex[0].isSelect" @click="jumpSort">
    分类
  </mt-tab-item>
  <mt-tab-item id="发现" @click.native="changeState(2)">
    <img slot="icon" src="../../assets/发现-未选中.png"
    :focused="currentIndex[0].isSelect">
    发现
  </mt-tab-item>
  <mt-tab-item id="购物车" @click.native="changeState(3)">
    <img slot="icon" src="../../assets/购物车-未选中.png"
    :focused="currentIndex[0].isSelect">
    购物车
  </mt-tab-item>
  <mt-tab-item id="我的" @click.native="changeState(4)">
    <img slot="icon" src="../../assets/我的-未选中.png"
    :focused="currentIndex[0].isSelect" @click="jumpMine">
    我的
  </mt-tab-item>
</mt-tabbar>
</div>
</template>
<script>
export default {
    data(){
        return{
            value:'',
            selected:true,
            currentIndex:[
                    {isSelect:true},
                    {isSelect:false},
                    {isSelect:false},
                    {isSelect:false},
                ]
        }
    },
    methods:{
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
                jumpHome(){
                     this.$router.push("/")
                },
                jumpMine(){
                     this.$router.push("/Mine")
                },
                jumpSort(){
                    this.$router.push("/Sort")
                }
    },
}
</script>
<style scoped>
.container{position:relative;}
.mint-tabbar>.mint-tab-item.is-selected{
        color:#ff4891;
    }
.tabbar{
    position:absolute;
    top:55px;
    width:375px;
    height:60px;
}
</style>