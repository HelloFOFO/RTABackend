

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


var a = { "mobile" : "18888888888", "name" : "系统", "email" : "", "tel" : "", "gender" : "", "idCard" : "", "provider" : ObjectId("5320ffb06532aa00951ff5e1"), "passwd" : "92d7ddd2a010c59511dc2905b7e14f64", "isEnable" : true, "operator" : ObjectId("5320ff9b6532aa00951ff5e0"), "_id" : ObjectId("534f9b073b4fec3f208952e0"), "signUpDate" : 1397725959101};
db.members.save(a);











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


var a={code:'ticketPrice/audit',name:'门票价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:31}
db.pro.modules.save(a);
var a={code:'ticketPackagePrice/audit',name:'套票价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:32}
db.pro.modules.save(a);
var a={code:'hotelPrice/audit',name:'酒店价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:33}
db.pro.modules.save(a);
var a={code:'voturePrice/audit',name:'优惠券价格审核',cat:'价格审核',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operator:ObjectId('5320ff9b6532aa00951ff5e0'),order:34}
db.pro.modules.save(a);

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



var a ={ "_id" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" : "江苏" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" : "浙江" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" : "安徽" }
db.provinces.insert(a);
var a ={ "_id" : ObjectId("53217589af7d5b633f3361cf"), "isEnable" : true, "name" : "上海" }
db.provinces.insert(a);


var a = {"_id" : ObjectId("5343757bd8d3efb068465b1f"),image:[],firstLetter:"n","pinyin":'ningbo',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'宁波',order:1,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b20"),image:[],firstLetter:"h","pinyin":'huzhou',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'湖州',order:1,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b21"),image:[],firstLetter:"a","pinyin":'anji',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'安吉',order:1,isHot:true}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757bd8d3efb068465b22"),image:[],firstLetter:"n","pinyin":'nanxun',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'南浔',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343757cd8d3efb068465b23"),image:[],firstLetter:"h","pinyin":'haining',"province" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'海宁',order:1,isHot:false}
db.cities.save(a);


var a = {"_id" : ObjectId("53437583d8d3efb068465b24"),image:[],firstLetter:"m","pinyin":'maanshan',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'马鞍山',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b25"),image:[],firstLetter:"c","pinyin":'chuzhou',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'滁州',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b26"),image:[],firstLetter:"x","pinyin":'xuancheng',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'宣城',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437583d8d3efb068465b27"),image:[],firstLetter:"n","pinyin":'ningguo',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'宁国',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437584d8d3efb068465b28"),image:[],firstLetter:"l","pinyin":'lingbi',"province" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'灵璧',order:1,isHot:false}
db.cities.save(a);

var a = {"_id" : ObjectId("53437589d8d3efb068465b29"),image:[],firstLetter:"s","pinyin":'suzhou',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'苏州',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2a"),image:[],firstLetter:"k","pinyin":'kunshan',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'昆山',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2b"),image:[],firstLetter:"n","pinyin":'nantong',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'南通',order:2,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("53437589d8d3efb068465b2c"),image:[],firstLetter:"h","pinyin":'haimen',"province" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'海门',order:2,isHot:false}
db.cities.save(a);

var a = {"_id" : ObjectId("5343758fd8d3efb068465b2d"),image:[],firstLetter:"s","pinyin":'shanghai',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '上海',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b2e"),image:[],firstLetter:"s","pinyin":'songjiang',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '松江',order:1,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b2f"),image:[],firstLetter:"q","pinyin":'qingpu',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '青浦',order:2,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b30"),image:[],firstLetter:"j","pinyin":'jinshan',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '金山',order:3,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b31"),image:[],firstLetter:"c","pinyin":'chongming',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '崇明',order:4,isHot:false}
db.cities.save(a);
var a = {"_id" : ObjectId("5343758fd8d3efb068465b32"),image:[],firstLetter:"j","pinyin":'jiading',"province" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '嘉定',order:5,isHot:false}
db.cities.save(a);



var a = { "name" : "后台", "_id" : ObjectId("534de2d55c5cc4b51f4e189d")}
db.sources.save(a)
var a = { "name" : "WEB", "_id" : ObjectId("534de2e3309199c11f233cf4") }
db.sources.save(a)
var a = { "name" : "WAP", "_id" : ObjectId("534de2f3bad580e91f103420") }
db.sources.save(a)
var a = { "name" : "WEIXIN","_id" : ObjectId("534de2fb2bb90df41f15c7af") }
db.sources.save(a)





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


