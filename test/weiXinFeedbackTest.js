//创建一个含openID的member
var a ={
    "_id" : ObjectId("5365d83f0cae76019c9b8ca7"),
    "accompany" : "sss",
    "birthYear" : "ffffs",
    "email" : "admin@justpayyou.com",
    "favouriteCity" : "ccc",
    "gender" : "F",
    "idCard" : "",
    "intentCity" : "333",
    "isEnable" : true,
    "lastDestCity" : "ffffff",
    "lisencePlate" : "33333",
    "mobile" : "18616365242",
    "name" : "管理员222",
    "openID" : "o84mpt5l78GbXgNiXBeGC2mtrnrA",
    "operator" : ObjectId("5320ff9b6532aa00951ff5e0"),
    "passwd" : "698d51a19d8a121ce581499d7b701668",
    "postAddr" : "",
    "provider" : ObjectId("533ca827857c17cc25f88f08"),
    "signupDate" : 1394671086295,
    "tel" : ""
};
db.members.save(a);

var a = {
    "__v" : 0,
    "_id" : ObjectId("53706cf1df6a3fd3123e644d"),
    "contactPhone" : "11111111111",
    "liveName" : "dfsdf",
    "member" : ObjectId("5365d83f0cae76019c9b8ca7"),
    "orderDate" : 1399876849730,
    "orderID" : "132835",
    "payWay" : "1",
    "product" : ObjectId("5368a0afe51d1c367163f33c"),
    "quantity" : 1,
    "remark" : "",
    "source" : ObjectId("534de2e3309199c11f233cf4"),
    "startDate" : 1400083200000,
    "status" : 1,
    "subOrder" : [
    ObjectId("53706cf1df6a3fd3123e644c")
],
    "totalPrice" : 123,
    transID : "testTransID"
};
db.orders.save(a);

//** /weixin/feedback/create

var a={
    'openID':'o84mpt5l78GbXgNiXBeGC2mtrnrA',
    'feedbackID':'feedbackTest1',
    'transID':"testTransID",
    'msgType':"request",
    'reason':"give me a reason",
    'solution':"give me a solution",
    'extInfo':"give me a kick",
}
//以上最好通过接口创建数据，否则无法获取订单号

