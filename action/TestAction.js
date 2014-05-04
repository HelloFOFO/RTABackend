var httpClient = require('./../tools/HttpClient');

exports.init = function(req,res){
//    var opt = {
//        host:'172.16.0.15'
//        ,path:'/abcasdfasdfasdf'
//        ,method:'GET'
//    };
//    try{
//        var http = new httpClient(opt);
//            http.getReq(function(error,result){
//        res.json({'test':result});
//    });
//    }catch (e){
//        res.json({'try1':1});
//    }
res.render("test",{a:'<input type="button">'});
};