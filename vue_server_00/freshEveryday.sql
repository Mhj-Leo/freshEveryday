SET NAMES UTF8;
DROP DATABASE IF EXISTS freshEveryday;
CREATE DATABASE freshEveryday CHARSET=UTF8;
USE freshEveryday;
/*****建立表格****/
CREATE TABLE freshEveryday_user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32),
  email VARCHAR(32),
  phone INT
);
/****首页商品****/
CREATE TABLE freshEveryday_index(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  pic VARCHAR(512),
  subTitle VARCHAR(512),
  price DECIMAL(10,2),
  href VARCHAR(128),
  num INT,
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT
);
CREATE TABLE freshEveryday_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(512),
  title VARCHAR(128),
  price VARCHAR(10),
  num INT,
  uid INT
);
CREATE TABLE freshEveryday_laptop(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT, 
  banner1 VARCHAR(512),
  banner2 VARCHAR(512),
  banner3 VARCHAR(512),
  title VARCHAR(128),
  subTitle VARCHAR(128),
  price DECIMAL(10,2)
);
/******写入数据******/
INSERT INTO freshEveryday_laptop VALUES
(1,1,'img/details/banner1.jpg','img/details/banner1(2).jpg',
'img/details/banner1(3).jpg','北美进口车厘子9.5行250g「新人特惠」',
'果径超大 吃过瘾','6.9'),
(2,2,'img/details/banner2.jpg','img/details/banner2(2).jpg',
'img/details/banner2(3).jpg','维多利亚青提500g「新人特惠」',
'咔嚓  就是这么脆','8.9'),
(3,3,'img/details/banner3.jpg','img/details/banner3(2).jpg',
'img/details/banner3(3).jpg','新疆西州蜜瓜1个2.5斤起「新人特惠」',
'咬一口吐鲁番风情的甜蜜香脆','16.9'),
(4,4,'img/details/banner4.jpg','img/details/banner4(2).jpg',
'img/details/banner4(3).jpg','【4-6钱】爆料麻小十三香味750g「新人特惠」',
'湖北潜江直供，活虾现做放心吃','33.9'),
(5,5,'img/details/banner5.jpg','img/details/banner5(2).jpg',
'img/details/banner5(3).jpg','无锡阳山水蜜桃2个400g起「新人特惠」',
'轻点咬 小心喷出桃汁来','6.5'),
(6,6,'img/details/banner6.jpg','img/details/banner6(2).jpg',
'img/details/banner6(3).jpg','【2盒】伊利畅轻燕麦+草莓风味发酵乳250g「新人特惠」',
'这杯酸奶太有料了 要嚼着吃','4.5'),
(7,7,'img/details/banner7.jpg','img/details/banner7(2).jpg',
'img/details/banner7(3).jpg','泰国直采  正宗金枕头品种',
'金枕榴莲1个3-4.5斤','89'),
(8,8,'img/details/banner8.jpg','img/details/banner8(2).jpg',
'img/details/banner8(3).jpg','冬枣中的冰糖心',
'陕西大荔冬枣400g/盒','12.9'),
(9,9,'img/details/banner9.jpg','img/details/banner9(2).jpg',
'img/details/banner9(3).jpg','香甜盖过当季新款香水','绿宝香瓜2个400g起「新人特惠」','9.9'),
(10,10,'img/details/banner10.jpg','img/details/banner10(2).jpg',
'img/details/banner10(3).jpg','怦然心动','怦然心动（11朵粉色玫瑰花）','4.5'),
(11,11,'img/details/banner11.jpg','img/details/banner11(2).jpg',
'img/details/banner11(3).jpg','跟鲜花一起运过来的香蕉','进口香蕉1袋500g起','4.5'),
(12,12,'img/details/banner12.jpg','img/details/banner12(2).jpg',
'img/details/banner12(3).jpg','世界再大 不过一盘番茄炒蛋','番茄450-550g','4.5'),
(13,13,'img/details/banner13.jpg','img/details/banner13(2).jpg',
'img/details/banner13(3).jpg','硒砂大西瓜1个10斤起「新人特惠」','戈壁滩上的绿巨人','16.9'),
(14,14,'img/details/banner14.jpg','img/details/banner14(2).jpg',
'img/details/banner14(3).jpg','地道重庆味 超巴适','味哒哒酸辣粉122g「新人特惠」','4.9'),
(15,15,'img/details/banner15.jpg','img/details/banner15(2).jpg',
'img/details/banner15(3).jpg','蓝月亮薰衣草洗衣液500g亮白「新人特惠」','活性物高出国家标准40%','7.9');
/**************歌单*****************/
INSERT INTO freshEveryday_cart VALUES
(null,'img/chelizi.png','北美进口车厘子9.5行250g「新人特惠」',6.9,1,1),
(null,'img/zaozi.jpg','新疆西州蜜瓜1个2.5斤起「新人特惠」',16.9,1,1),
(null,'img/xianggua.jpg','绿宝香瓜2个400g起「新人特惠」',8.9,1,1);
/************用户表*************/
INSERT INTO freshEveryday_user VALUES
(null,'tom',md5('123'),"316575809@qq.com","15152457851"),
(null,'mhj',md5('123456'),"316575809@qq.com","15152457851"),
(null,'jerry',md5('123'),"316575809@qq.com","15152457851"),
(null,'kjh',md5('123456'),"316575809@qq.com","15152457851");
/*首页*/
INSERT INTO freshEveryday_index VALUES
(NULL, '北美进口车厘子9.5行250g「新人特惠」','img/chelizi.png','果径超大 吃过瘾','6.9','Details.vue?lid=1',1,1, 1, 1),
(NULL, '维多利亚青提500g「新人特惠」',"img/putao.jpg",'咔嚓  就是这么脆','8.9','Details.vue?lid=2',1,2, 2, 2),
(NULL, '新疆西州蜜瓜1个2.5斤起「新人特惠」', 'img/longyan.jpg','咬一口吐鲁番风情的甜蜜香脆','16.9','Details.vue?lid=3',1,3, 3, 3),
(NULL, '【4-6钱】爆料麻小十三香味750g「新人特惠」','img/longxia.jpg','湖北潜江直供，活虾现做放心吃','33.9','Details.vue?lid=4',1,4, 4, 4),
(NULL, ' 无锡阳山水蜜桃2个400g起「新人特惠」', 'img/taozi.jpg','轻点咬 小心喷出桃汁来','6.5','Details.vue?lid=5',1,5, 5, 5),
(NULL, '【2盒】伊利畅轻燕麦+草莓风味发酵乳250g「新人特惠」','img/changqing.jpg','这杯酸奶太有料了 要嚼着吃','4.5','Details.vue?lid=6',1,6, 6, 6),
(NULL, '金枕榴莲1个3-4.5斤','img/liulian.jpg','泰国直采  正宗金枕头品种','21.3','Details.vue?lid=7',1,7, 7, 7),
(NULL, '【陕西大荔冬枣400g/盒','img/zaozi.jpg','冬枣中的冰糖心','26.4','Details.vue?lid=8',1,8, 8, 8),
(NULL, '绿宝香瓜2个400g起「新人特惠」','img/xianggua.jpg','芒果圈   和凯特王妃一样有名','33','Details.vue?lid=9',1,9, 9, 9),
(NULL, '倾城之恋（绣球玫瑰花粉色系）','img/flower.jpg','绣球玫瑰花粉色系','129','Details.vue?lid=10',1,10, 10, 10),
(NULL, '进口香蕉1袋500g起','img/banner.jpg','跟鲜花一起运过来的香蕉','31.2','Details.vue?lid=11',1,11, 11, 11),
(NULL, '番茄450-550g','img/xihongshi.jpg','世界再大 不过一盘番茄炒蛋','2.5','Details.vue?lid=12',1,12, 12, 12),
(NULL, '硒砂大西瓜1个10斤起「新人特惠」','img/xigua.jpg','戈壁滩上的绿巨人','16.9','Details.vue?lid=13',1,13, 13, 13),
(NULL, '味哒哒酸辣粉122g「新人特惠」','img/suanlafen.jpg','地道重庆味 超巴适','4.9','Details.vue?lid=14',1,14, 14, 14),
(NULL, '蓝月亮薰衣草洗衣液500g亮白「新人特惠」','img/lanyueliang.jpg','活性物高出国家标准40%','7.9','Details.vue?lid=15',1,15, 15, 15);
