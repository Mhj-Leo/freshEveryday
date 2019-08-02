<template>
    <div class="container">
        <p style="font-size:20px;color:#ff4891;margin-left:150px;">用户注册</p>
    <div class="input" style="margin-bottom:20px;margin-top:40px">
        <mt-field type="text" 
            placeholder="请输入用户名"
            id="uname"
            v-model="uname"></mt-field>
        <mt-field type="password" 
            placeholder="请输入密码"
            id="upwd"
            v-model="upwd"></mt-field>
        <mt-field type="text" 
            placeholder="请输入邮箱"
            id="email"
            v-model="email"></mt-field>
        <mt-field type="text"
            placeholder="请输入手机号"
            id="phone"
        v-model="phone"></mt-field>
        </div>
        <mt-button style="margin-top:40px;background: #ff4891;color:#fff" size="large"
        @click="reg">提交注册</mt-button>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            uname:"",
            upwd:"",
            email:"",
            phone:"",
        }
    },
    methods:{
        reg(){
            //完成登录
            //1.获取用户名和密码
            var n=this.uname;
            var p=this.upwd;
            var e=this.email;
            var ph=this.phone;
            //2.创建一个正则表达式,字母数字下划线，3-12位
            var reg1=/^[a-z0-9_]{3,12}$/i;
            var reg2=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)$/i;
            //3.验证用户名，出错提示
            if(!reg1.test(n)){
                alert("用户名格式不正确");
                return;
            }
            //4.验证密码，出错提示
            if(!reg1.test(p)){
                alert("密码格式不正确");
                return;
            }
            //验证邮箱
            if(!reg2.test(e)){
                alert("邮箱格式不正确");
                return;
            }
            //验证手机号
            if(!reg1.test(ph)){
                alert("手机号格式不正确");
                return;
            }
            //5.发送ajax请求 axios
            var url="reg";//请求地址
            var obj={uname:n,upwd:p,email:e,phone:ph};
            this.axios.get(url,{params:obj}).then(result=>{
                console.log(result)
                //1.判断服务器返回结果
                //2.code:>0 跳转Home组件
                if(result.data.code>0){
                    alert("注册成功");
                }
                //3.创建Home.vue组件
                //4.code:<0 交互提示框
                else{
                    alert("注册失败");
                }
            })
        },
        loginDirect(){
            this.$router.push("/login")
        }
    },
}
</script>
<style scoped>
    .container{
        background:transparent;
        padding-top:5px;
        margin-top:70px;
        }
     .title{
        font-size:35px;
        color:#ff4891;
        font-weight:bold;
        margin:40px 150px;
    }   
</style>