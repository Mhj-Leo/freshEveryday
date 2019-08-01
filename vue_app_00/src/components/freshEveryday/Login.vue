<template>
    <div class="login_container">
        <div class="input">
            <p class="title">登录</p>
            <mt-field placeholder="请输入手机号" 
            v-model="uname"></mt-field>
            <mt-field placeholder="请输入验证码"
            v-model="upwd"></mt-field>
        </div>
        <div class="agree">
            <mt-button type="primary" size="large"
            @click="login">登录</mt-button>
        </div>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            uname:"",
            upwd:"",
        }
    },
    methods:{
        login(){
            //完成登录
            //1.获取用户名和密码
            var n=this.uname;
            var p=this.upwd;
            //2.创建一个正则表达式,字母数字下划线，3-12位
            var reg=/^[a-z0-9_]{3,12}$/i;
            //3.验证用户名，出错提示
            if(!reg.test(n)){
                this.$toast("用户名格式不正确");
                return;
            }
            //4.验证密码，出错提示
            if(!reg.test(p)){
                this.$toast("密码格式不正确");
                return;
            }
            //5.发送ajax请求 axios
            var url="login";//请求地址
            var obj={uname:n,upwd:p};
            this.axios.get(url,{params:obj}).then(result=>{
                console.log(result)
                //1.判断服务器返回结果
                //2.code:>0 跳转Home组件
                if(result.data.code>0){
                    this.$router.push("/")
                }
                //3.创建Home.vue组件
                //4.code:<0 交互提示框
                else{
                    this.$messagebox("提示","用户信息错误")
                }
            })
        }
    },
}
</script>
<style>
    .login_container{background:#ff4891;padding-top:5px;}
    .input{
        margin-top:40px;
    }
    .title{
        font-size:35px;
        color:#fff;
        font-weight:bold;
        margin:40px 150px;
    }
</style>