/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var underscore = require('underscore');
exports.updateStatus = function(req,res){
        try{
            var flag = true;
            if(underscore.isEmpty(req.params.type)){
                flag = false;
            }
            if(underscore.isEmpty(req.body._id)){
                flag = false;
            }
            if(underscore.isEmpty(req.body.status)){
                flag = false;
            }
            if(underscore.isEmpty(req.body.operator)){
                flag = false;
            }
            if(flag){
                var opt = {
                     hostname:config.inf.host
                    ,method:"POST"
                    ,port:config.inf.port
                    ,path:"/product/"+req.params.type+"/price/audit/"+req.body._id
                };
                console.log("/product/"+req.params.type+"/price/audit/"+req.body._id);
                var params = {status:req.body.status,
                              operator:req.body.operator};
                var http = new httpClient(opt);
                http.postReq(params,function(err,result){
                res.json({error:result.error,errMsg:result.errorMsg});
            });
            }
            else{
                res.json({error:1,errMsg: "参数不能为空"});
            }}catch(e){
                    res.json({error:1,errMsg: e.message});
                }
};