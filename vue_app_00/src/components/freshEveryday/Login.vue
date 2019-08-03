<template>
    <div class="login_container">
        <p style="color:#ff4891;margin-left:270px;" @click="reg">
            新用户注册
        </p>
        <div class="input" style="margin-bottom:20px;">
            <mt-field placeholder="请输入用户名" 
            v-model="uname"></mt-field>
            <mt-field placeholder="请输入密码"
            v-model="upwd"></mt-field>
        </div>
        <div class="agree">
            <input type="checkbox" style="margin-left:30px;" @click="agree">
            <span style="margin-left:30px;font-size:12px;color:#969696;">我已认真阅读、理解并同意
                <a style="color:#ff4891;" href="">《每日优鲜用户协议》</a>
            </span>
            <mt-button style="margin-top:40px;background: #ff4891;color:#fff" size="large"
            @click="login" :disabled="disabled">登录</mt-button>
            <p style="margin:10px 30px;font-size:12px;color:#969696;font-weight:bold;">
                为方便您及时查询订单信息，需要验证您的手机号来登录
            </p>
        </div>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            uname:"",
            upwd:"",
            disabled: true
        }
    },
    methods:{
        agree(e){
            if(e.target.checked){
                this.disabled=false
            }else{
                this.disabled=true
            }
        },
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
                    this.$router.push("/cart")
                }
                //3.创建Home.vue组件
                //4.code:<0 交互提示框
                else{
                    this.$messagebox("提示","用户信息错误")
                }
            })
        },
        reg(){
            this.$router.push("/reg")   
        }
    },
}
</script>
<style>
    .login_container{
        background:transparent;
        padding-top:5px;
        margin-top:70px;
        }
    .input{
        margin-top:40px;
    }
</style>