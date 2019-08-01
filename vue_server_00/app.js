//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
//2:配置第三方模块
 //2.1:配置连接池
 var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   database:"freshEveryday",
   connectionLimit:15
 })
 //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true
 }))
 //2.3:session
 server.use(session({
   secret:"128位字符串",//自定义字符串，用于加密数据使用
   resave:true,//每次请求更新数据
   saveUninitialized:true//保存初始化的数据
 }))
 //2.9指定静态目录
 server.use(express.static("public"));
 server.listen(3000);
//3:完成第一个功能用户登录
server.get("/login",(req,res)=>{
  //1:参数
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  //1.1:正则表达式验证用户名或密码
  //2:sql
var sql = "SELECT id FROM ";
sql +=" freshEveryday_user WHERE uname = ?";
sql +=" AND upwd = md5(?)";
  //3:json
  pool.query(sql,[uname,upwd],(err,result)=>{
      if(err)throw err;
      if(result.length==0){
         res.send({code:-1,msg:"用户名或密码有误"});
      }else{
         //把当前登录用户的uid保存到session对象
          req.session.uid=result[0].id;
         res.send({code:1,msg:"登录成功"});
      }
  })
})
//4:完成第二个功能用户注册
server.get("/reg",(req,res)=>{
  //1:参数
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  var email = req.query.email;
  var phone = req.query.phone;
  //1.1:正则表达式验证用户名或密码
  //2:sql
var sql = "INSERT INTO freshEveryday_user VALUES (?,?,?,?,?)";
  //3:json
  pool.query(sql,[null,uname,upwd,email,phone],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"注册成功"});
      }else{
         res.send({code:-1,msg:"注册失败"});
      }
  })
})
//完成第三个功能：主页面数据获取
server.get("/",(req,res)=>{
  //1:参数
  //2:sql
  var sql=`SELECT * FROM freshEveryday_index where seq_recommended!=0 ORDER BY seq_recommended`;
  //3:json
  pool.query(sql,[],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:0});
    }else{
      res.send(result);
    }
  })
})
//详情页
server.get("/details",(req,res)=>{
  var lid=req.query.lid;
  var output={
    product:{},
    pics:[]
  }
  if(lid!==undefined){
    var sql1=`select * from freshEveryday_laptop where lid=?`;
    pool.query(sql1,[lid],(err,result)=>{
      if(err) console.log(err);
      output.product=result[0];
      var family_id=output.product["family_id"];
      var sql2=`select banner1,banner2,banner3,title,subTitle,price,lid from freshEveryday_laptop where family_id=?`;
      pool.query(sql2,[family_id],(err,result)=>{
        if(err) console.log(err);
        output.pics=result;
          res.send(output);
        })
      })
  }else{
    res.send(output);
  }
})
//购物车
server.get("/cart",(req,res)=>{
  //1:参数(无参数)
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  //2:sql
  var sql = "SELECT id,deviceName,price,num FROM freshEveryday_cart WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
  //3:json
})
//删除购物车中商品
server.get("/delItem",(req,res)=>{
  //1:参数购物车id
  var id = req.query.id;
  //2:sql 删除指定数据
  var sql = "DELETE FROM freshEveryday_cart WHERE id = ?";
  //3:json
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    console.log(result);
    if(result.affectedRows>0){
    res.send({code:1,msg:"删除成功"});
  }else{
    res.send({code:-1,msg:"删除失败"});
  }
  })
});