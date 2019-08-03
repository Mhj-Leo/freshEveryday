<template></template><template>
    <div class="container">
        <div class="back">
            <img @click="goback" src="../../../public/img/back.png" alt="">
            <span>返回</span>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                
        }
    },
        created(){
            
        },
        methods:{
            goback(){
                this.$router.go(-1)
            }    
        },
        
    }
</script>
<style scoped>
    .back{
        width:100%;
        height:30px;
        position:relative;
    }
    .back img{
        width:25px;
        height:25px;
    }
    .back span{
        color:#969696;
        position: absolute;
        top:1px;
    }
</style>