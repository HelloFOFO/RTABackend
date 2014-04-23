var httpClient = require('./../tools/HttpClient');

exports.init = function(req,res){
    var opt = {
        host:'172.16.0.15'
        ,path:'/abc'
        ,method:'GET'
    };
    try{
        var http = new httpClient(opt);
    }catch (e){
        res.json({'try1':1});
    }
    http.getReq(function(error,result){
        res.json({'test':1});
    });
};