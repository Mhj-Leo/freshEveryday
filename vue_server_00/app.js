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
//登录用户的购物车显示
server.get("/cart",(req,res)=>{
  //1:参数(无参数)
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  //2:sql
  var sql = "SELECT id,pic,title,price,num FROM freshEveryday_cart WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
  //3:json
})

// // 功能：插入商品信息 接口
// server.get("/cart",(req,res)=>{
//   var obj=req.query;
//   console.log(obj);
//   var sql="INSERT INTO freshEveryday_cart SET ? ";
//   pool.query(sql,obj,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     if(result.affectedRows==1){
//       res.send({code:1,msg:"插入成功"});
//     }else{
//       res.send({code:-1,msg:"插入失败"});
//     }
    
//   })
// })

//功能：主页面商品分页显示
server.get("/home",(req,res)=>{
  //1.参数
  var pno = req.query.pno;
  var ps = req.query.pageSize;
  //2.设置默认值
  if(!pno){pno = 1;}
  if(!ps){ps = 4;}
  //3.创建两条sql语句执行嵌套完成
  var sql = "SELECT pid,title,price,subTitle,pic,href FROM freshEveryday_index LIMIT ?,?";
  var offset = (pno-1)*ps;
  ps = parseInt(ps);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    var obj = {code:1,msg:"查询成功",data:result};
    var sql = "SELECT count(*) AS c FROM freshEveryday_index";
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      //result[{c:43}]
      var pc = Math.ceil(result[0].c/ps);
      obj.pc=pc;
      res.send(obj);
    })
  })
  //4.返回值
  //{code:1,msg:"查询成功",data:[],pageCount:11}
});
