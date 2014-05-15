var httpClient = require('./../tools/HttpClient.js');
var async = require('async');
var Paging     = require('./../tools/Paging');
var config = require('./../tools/Config.js');
var  querystring  = require('querystring');
var _ = require('underscore');

exports.init = function(req,res){
    res.render('weiXinFeedbackManagement',{});
};

//**GET  /weiXinFeedbackManagement/list
exports.list = function(req,res){
    try{
        var viewData = {};
        var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;
        var otherParams = {
            msgType: _.isEmpty(req.query.msgType)?undefined:req.query.msgType
            ,pageSize:config.inf.pageSize
        };
        otherParams = querystring.stringify(otherParams);
        var opt = {
            hostname:config.inf.host,
            port:config.inf.port,
            path:"/weixin/feedback/list?page="+requestPage+'&'+otherParams,
            method:"GET"
        };
        console.debug("weixinfeedback list",opt.path);
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            if(err || result.error != 0){
                res.json({error:1,errorMsg:result});
            }else{
                viewData = result;
                viewData.pageInfo  = Paging.getPageInfo(req.query , result.totalPage , 'weiXinFeedbackManagement/list',otherParams);
                res.json(viewData);
            }
        });
    }catch(e){
        res.json({error:11,errorMsg: e.message});
    }
};

//**POST  /weiXinFeedbackManagement/update/:feedback
exports.update = function(req,res){
    var feedbackID = req.params.feedbackID;
    var openID     = req.body.openID;
    var msgType    = "dealed";
    async.waterfall([function(cb){
        var opt = {
            hostname:config.inf.webserverhost,
            port:config.inf.webserverport,
            path:"/weixin/feedback?openid="+openID+'&feedbackid='+feedbackID,
            method:"GET"
        };
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            if(err || result.error !=0){
                console.error('WeiXinFeedBackAction.update failed',result,err,opt.hostname,opt.port);
                cb('weixin side rejected!',null);
            }else{
                cb(null,null);
            }
        });
    },function(result,cb){
        var opt = {
            hostname:config.inf.host,
            port:config.inf.port,
            path:"/weixin/feedback/update/"+feedbackID,
            method:"POST"
        };
        var http = new httpClient(opt);
        http.postReq({msgType:msgType},function(err,result){
            if( err || result.error != 0 ){
                console.error('weixin feedback action update',err,result);
                cb('update failed',null);
            }else{
                cb(null,null);
            }
        });
    }],function(err,result){
           if(err){
               res.json({error:1,errorMsg:err});
           }else{
               res.json({error:0})
           }
    });
};

