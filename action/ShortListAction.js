var httpClient  = require('./../tools/HttpClient.js');
var config      = require('./../tools/Config.js');
var _ = require('underscore');
exports.getMemberByProvider = function(req,res){
    var opt = {
         hostname:config.inf.host
        ,port:config.inf.port
        ,method:"GET"
    };

    if(_.isEmpty(req.params.providerID)){
        res.json({
             error:1
            ,errorMsg:"缺少参数"
        });
    }
    opt.path="/ent/provider/member/shortList";
    opt.path+='?provider='+req.params.providerID;
    console.log('shortList getMemberByProvider',opt.path,req.params);
    var http = new httpClient(opt);
    http.getReq(function(error,result){
        console.log('sss',result);
        res.json(result);
    });
};