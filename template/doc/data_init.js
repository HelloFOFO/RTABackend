

//密码是md5加密 nicai
var a ={
    mobile:'18616365242'
    ,name:'管理员'
    ,passwd:'529faef522e1b7f8ce1387406caf9394'
    ,email:'admin@justpayyou.com'
    ,tel:''
    ,gender:'男'
    ,birthYear:'1982'
    ,favouriteCity:''
    ,lastDestCity:''
    ,lisencePlate:''
    ,intentCity:''
    ,idCard:''
    ,postAddr:''
    ,signupDate:1394671086295
    ,provider:ObjectId("533ca827857c17cc25f88f08")
    ,isEnable:true
    ,operator:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.members.save(a)


var a={
    _id:ObjectId("533ca827857c17cc25f88f08")
    ,name:'万车游网'
    ,contactName:'管理员'
    ,contactEmail:'admin@justpayyou.com'
    ,contactPhone:'18616365242'
    ,proCode:'RTA'
    ,remark:''
    ,isEnable:true
    ,type:2
    ,balanceType:''
    ,returnType:''
    ,createTime:1394671086295
    ,updateTime:1394671086295
    ,operator:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.ents.save(a)

var a={
    _id:ObjectId("533ca82c857c17cc25f88f09")
    ,name:'wap'
    ,contactName:'管理员'
    ,contactEmail:'admin@justpayyou.com'
    ,contactPhone:'18616365242'
    ,proCode:'RTA'
    ,remark:''
    ,isEnable:true
    ,type:2
    ,balanceType:''
    ,returnType:''
    ,createTime:1394671086295
    ,updateTime:1394671086295
    ,operator:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.ents.save(a)

var a={
    _id:ObjectId("533ca831857c17cc25f88f0a")
    ,name:'web'
    ,contactName:'管理员'
    ,contactEmail:'admin@justpayyou.com'
    ,contactPhone:'18616365242'
    ,proCode:'RTA'
    ,remark:''
    ,isEnable:true
    ,type:2
    ,balanceType:''
    ,returnType:''
    ,createTime:1394671086295
    ,updateTime:1394671086295
    ,operator:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.ents.save(a)




var a = { "_id" : ObjectId("5407e451e11a629878d24718"),"mobile" : "18888888880", "name" : "网站支付宝", "email" : "", "tel" : "", "gender" : "", "idCard" : "", "provider" : ObjectId("533ca827857c17cc25f88f08"), "passwd" : "92d7ddd2a010c59511dc2905b7e14f64", "isEnable" : false, "operator" : ObjectId("5320ff9b6532aa00951ff5e0"), "signUpDate" : 1397725959101};
db.members.save(a);

var a = { "_id" : ObjectId("5407e453e11a629878d2471a"), "mobile" : "18888888881", "name" : "微信微支付", "email" : "", "tel" : "", "gender" : "", "idCard" : "", "provider" : ObjectId("533ca827857c17cc25f88f08"), "passwd" : "92d7ddd2a010c59511dc2905b7e14f64", "isEnable" : false, "operator" : ObjectId("5320ff9b6532aa00951ff5e0"),  "signUpDate" : 1397725959101};
db.members.save(a);

var a = { "_id" : ObjectId("5407e452e11a629878d24719"), "mobile" : "18888888882", "name" : "手机支付宝", "email" : "", "tel" : "", "gender" : "", "idCard" : "", "provider" : ObjectId("533ca827857c17cc25f88f08"), "passwd" : "92d7ddd2a010c59511dc2905b7e14f64", "isEnable" : false, "operator" : ObjectId("5320ff9b6532aa00951ff5e0"), "signUpDate" : 1397725959101};
db.members.save(a);


db.members.findOne({mobile:'18888888880'},{_id:1})  //{ "_id" : ObjectId("5407e451e11a629878d24718") }  网站支付宝
db.members.findOne({mobile:'18888888882'},{_id:1})  //{ "_id" : ObjectId("5407e453e11a629878d2471a") }  手机支付宝
db.members.findOne({mobile:'18888888881'},{_id:1})  //{ "_id" : ObjectId("5407e452e11a629878d24719") }  微信微支付

















var a= {code:'provider',name:'供应商开通',cat:'供应商管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:1}
db.pro.modules.save(a);
var a={code:'providerMember',name:'供应商账号开通',cat:'供应商管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:2}
db.pro.modules.save(a);
var a={code:'rightsManagement',name:'权限管理',cat:'供应商管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:3}
db.pro.modules.save(a);

var a= {code:'agentManagement',name:'分销商开通',cat:'分销商管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:4}
db.pro.modules.save(a);
var a={code:'agentMemberManagement',name:'分销商账号开通',cat:'分销商管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:5}
db.pro.modules.save(a);


var a={code:'ticketManagement',name:'门票产品上架',cat:'产品上架',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:10}
db.pro.modules.save(a);
var a={code:'ticketPackageManagement',name:'套票产品上架',cat:'产品上架',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:11}
db.pro.modules.save(a);
var a={code:'packageManagement',name:'打包产品上架',cat:'产品上架',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:12}
db.pro.modules.save(a);
var a={code:'hotelManagement',name:'酒店产品上架',cat:'产品上架',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:13}
db.pro.modules.save(a);
var a={code:'votureManagement',name:'优惠券产品上架',cat:'产品上架',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:14}
db.pro.modules.save(a);

var a={code:'ticketPrice/input',name:'门票价格录入',cat:'价格录入',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:21}
db.pro.modules.save(a);
var a={code:'ticketPackagePrice/input',name:'套票价格录入',cat:'价格录入',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:22}
db.pro.modules.save(a);
var a={code:'hotelPrice/input',name:'酒店价格录入',cat:'价格录入',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:23}
db.pro.modules.save(a);
var a={code:'voturePrice/input',name:'优惠券价格录入',cat:'价格录入',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:24}
db.pro.modules.save(a);
var a={code:'packagePrice/input',name:'打包产品价格录入',cat:'价格录入',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:25}
db.pro.modules.save(a);

var a={code:'ticketPrice/audit',name:'门票价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:31}
db.pro.modules.save(a);
var a={code:'ticketPackagePrice/audit',name:'套票价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:32}
db.pro.modules.save(a);
var a={code:'hotelPrice/audit',name:'酒店价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:33}
db.pro.modules.save(a);
var a={code:'voturePrice/audit',name:'优惠券价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:34}
db.pro.modules.save(a);
var a={code:'packagePrice/audit',name:'打包产品价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:35}
db.pro.modules.save(a);

db.pro.modules.update({code:'ticketPrice/input'},{$set:{code:'priceInit/ticket/input'}});
db.pro.modules.update({code:'ticketPackagePrice/input'},{$set:{code:'priceInit/ticketPackage/input'}});
db.pro.modules.update({code:'hotelPrice/input'},{$set:{code:'priceInit/hotel/input'}});
db.pro.modules.update({code:'voturePrice/input'},{$set:{code:'priceInit/voture/input'}});
db.pro.modules.update({code:'packagePrice/input'},{$set:{code:'priceInit/package/input'}});

db.pro.modules.update({code:'ticketPrice/audit'},{$set:{code:'priceInit/ticket/audit'}});
db.pro.modules.update({code:'ticketPackagePrice/audit'},{$set:{code:'priceInit/ticketPackage/audit'}});
db.pro.modules.update({code:'hotelPrice/audit'},{$set:{code:'priceInit/hotel/audit'}});
db.pro.modules.update({code:'voturePrice/audit'},{$set:{code:'priceInit/voture/audit'}});
db.pro.modules.update({code:'packagePrice/audit'},{$set:{code:'priceInit/package/audit'}});

//var a={code:'ticketPriceQuery',name:'门票价格查询',cat:'价格查询',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:41}
//db.pro.modules.save(a);
//var a={code:'ticketPackagePriceQuery',name:'套票价格查询',cat:'价格查询',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:42}
//db.pro.modules.save(a);
var a={code:'hotelPriceQuery',name:'酒店价格查询',cat:'价格查询',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:43}
db.pro.modules.save(a);
//var a={code:'voturePriceQuery',name:'优惠券价格查询',cat:'价格查询',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:44}
//db.pro.modules.save(a);
var a={code:'packagePriceQuery',name:'打包产品价格查询',cat:'价格查询',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:45}
db.pro.modules.save(a);

var a={code:'newsManagement',name:'公告发布',cat:'公告管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:54}
db.pro.modules.save(a);
var a={code:'newsManagementAudit',name:'公告审核',cat:'公告管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:55}
db.pro.modules.save(a);


var a={code:'orderManagement',name:'订单处理',cat:'订单管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:64}
db.pro.modules.save(a);
var a={code:'orderInput',name:'分销商下单',cat:'订单管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:65}
db.pro.modules.save(a);

var a={code:'memberManagement',name:'会员资料管理',cat:'会员管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:74}
db.pro.modules.save(a);

var a={code:'weiXinFeedbackManagement',name:'微信维权处理',cat:'微信管理',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:91}
db.pro.modules.save(a);


var a={code:'coupon/add',name:'新增优惠券',cat:'优惠券',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:101}
db.pro.modules.save(a);


var a ={ "_id" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" : "江苏" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" : "浙江" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" : "安徽" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217589af7d5b633f3361cf"), "isEnable" : true, "name" : "上海" }
db.provinces.insert(a);


var a = {"_id" : ObjectId("5343757bd8d3efb068465b1f"),image:[],firstLetter:"n","pinyin":'ningbo',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : false, "name" :'宁波',order:100,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b20"),image:[],firstLetter:"h","pinyin":'huzhou',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : false, "name" :'湖州',order:110,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b21"),image:[],firstLetter:"a","pinyin":'anji',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : false, "name" :'安吉',order:120,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b22"),image:[],firstLetter:"n","pinyin":'nanxun',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : false, "name" :'南浔',order:130,isHot:false}
db.cities.save(a);


var a = {"_id" : ObjectId("537313bd573f6bf5bf46877c"),image:[],firstLetter:"y","pinyin":'yuyao',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'余姚',order:160,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("537313be573f6bf5bf46877d"),image:[],firstLetter:"z","pinyin":'zhenhai',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'镇海',order:170,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("537313bf573f6bf5bf46877e"),image:[],firstLetter:"x","pinyin":'xiangshan',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'象山',order:180,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("537313bf573f6bf5bf46877f"),image:[],firstLetter:"n","pinyin":'ninghai',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'宁海',order:190,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("537f0b27f8a93ae912a041fc"),image:[],firstLetter:"z","pinyin":'zhuji',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'诸暨',order:200,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("537313c0573f6bf5bf468780"),image:[],firstLetter:"s","pinyin":'shangyu',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'上虞',order:210,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757cd8d3efb068465b23"),image:[],firstLetter:"h","pinyin":'haining',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'海宁',order:220,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53c617905d97f1ae764e1d22"),image:[],firstLetter:"c","pinyin":'cixi',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'慈溪',order:230,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5407c74dd97a9be2523e683f"),image:[],firstLetter:"n","pinyin":'ningbo',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'宁波',order:240,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5407d0d06013585d522af12e"),image:[],firstLetter:"f","pinyin":'fenghua',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'奉化',order:250,isHot:false}
db.cities.save(a);


var a = {"_id" : ObjectId("53437589d8d3efb068465b29"),image:[],firstLetter:"s","pinyin":'suzhou',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'苏州',order:300,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2a"),image:[],firstLetter:"k","pinyin":'kunshan',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : false, "name" :'昆山',order:310,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2b"),image:[],firstLetter:"n","pinyin":'nantong',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : false, "name" :'南通',order:320,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2c"),image:[],firstLetter:"h","pinyin":'haimen',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'海门',order:330,isHot:true}
db.cities.save(a);

var a = {"_id" : ObjectId("53437583d8d3efb068465b24"),image:[],firstLetter:"m","pinyin":'maanshan',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'马鞍山',order:500,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b25"),image:[],firstLetter:"c","pinyin":'chuzhou',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'滁州',order:510,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b26"),image:[],firstLetter:"x","pinyin":'xuancheng',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : false, "name" :'宣城',order:520,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b27"),image:[],firstLetter:"n","pinyin":'ningguo',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : false, "name" :'宁国',order:530,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437584d8d3efb068465b28"),image:[],firstLetter:"l","pinyin":'lingbi',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : false, "name" :'灵璧',order:540,isHot:false}
db.cities.save(a);


var a = {"_id" : ObjectId("5343758fd8d3efb068465b2d"),image:[],firstLetter:"s","pinyin":'shanghai',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : false, "name" : '上海',order:1000,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b2e"),image:[],firstLetter:"s","pinyin":'songjiang',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '松江',order:1010,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b2f"),image:[],firstLetter:"q","pinyin":'qingpu',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '青浦',order:1020,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b30"),image:[],firstLetter:"j","pinyin":'jinshan',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '金山',order:1030,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b31"),image:[],firstLetter:"c","pinyin":'chongming',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '崇明',order:1040,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b32"),image:[],firstLetter:"j","pinyin":'jiading',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : false, "name" : '嘉定',order:1050,isHot:false}
db.cities.save(a);





var a = { "name" : "后台", "_id" : ObjectId("534de2d55c5cc4b51f4e189d")}
db.sources.save(a)
var a = { "name" : "WEB", "_id" : ObjectId("534de2e3309199c11f233cf4") }
db.sources.save(a)
var a = { "name" : "WAP", "_id" : ObjectId("534de2f3bad580e91f103420") }
db.sources.save(a)
var a = { "name" : "WEIXIN","_id" : ObjectId("534de2fb2bb90df41f15c7af") }
db.sources.save(a)


//图片初始化
var c = db.cities.findOne(ObjectId("5343757bd8d3efb068465b1f"));
c.image=[{url:"b7b43815ff17767109e8a733.jpg",intro:"镇海旅游"},{url:"70f71fb9f7f4f28ef4d19cf1.jpg",intro:"百年老外滩"},{url:"975f6a15492b20abdfc788f9.jpg",intro:"宁波三江口"},{url:"56646815b5143fd36733b149.jpg",intro:"镇海招宝山大桥"}]
db.cities.save(c);

var c = db.cities.findOne({name:'海宁'});
c.image=[{"url":"4004a31eda9fb792b497e314.jpg","intro":"海宁潮"},{"url":"35bd435dc2401f911376eab0.jpg","intro":"海宁一线潮"},{"url":"ec4398d1bd1579b0a018a403.jpg","intro":"皮革城"},{"url":"a4ebce25e873d5aca6d30585.jpg","intro":"盐官古城"},{"url":"c747c3b423d9fcf9447711b2.jpg","intro":"自驾游车辆在海宁皮革城广场拼字"}];
db.cities.save(c);

db.pricelogs.find().forEach(function(p){
   if(!p.product){
       db.pricelogs.remove({_id: p._id});
   }else{
       var i = db.products.findOne({_id: p.product});
       if(!i){
           db.pricelogs.remove({_id: p._id});
       }
   }
});




var a = {
    "_id" : ObjectId("5396aa513657776675013856"),
    "__v" : 0,
    "code" : "1235654",
    "effectDate" : 1402382929855,
    "expiryDate" : 1402558293396,
    "member" : ObjectId("53840b4e8cd2f52e1bc65571"),
    "minValue" : 0,
    "name" : "50元优惠券",
    "product" : [ ],
    "status" : 0,
    "type" : 0,
    "value" : 50
}

db.coupons.save(a)


var a = {
    "__v" : 0,
    "code" : "111111",
    "effectDate" : 1402382929855,
    "expiryDate" : 1402558293396,
    "member" : ObjectId("5365d83f0cae76019c9b8ca7"),
    "minValue" : 0,
    "name" : "50元优惠券",
    "product" : [ ],
    "status" : 0,
    "type" : 0,
    "value" : 50
};
db.coupons.save(a)

db.coupons.update({},{$set:{status:1}},false,true)
db.coupons.update({},{$set:{status:0}},false,true)


//生成coupon的代码


for(var i=0;i<10000;i++){
    db.couponcodes.save({code:getRandString(10),isUsed:false});
}

var getRandChar = function(){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charArray = chars.split('');
    var rand = Math.round(Math.random()*10000,0);
    var isChar = Math.round(Math.random()*10,0)>4?true:false;
    if(isChar){
        var pos = rand%26;
        result = chars[pos];
    }else{
        var pos = rand%10;
        result = pos.toString();
    }
    return result;
}

var getRandString = function(len){
    var result = "";
    for(var i=0;i<len;i++){
        result += getRandChar();
    }
    return result;
}