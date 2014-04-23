/**
 * Created by wucho on 14-4-4.
 */

/**
 * Created by zzy on 3/19/14.
 */
var HttpClient = require('./../tools/HttpClient.js');
var async = require('async');
var _=require('underscore');
var config = require('./../tools/Config.js');

exports.init = function(request,response){
    try{
        var viewData = {};
        async.series([
            function(cb){
                var opt={
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:'/module/shortList',
                    method:'GET'
                };
                var http=new HttpClient(opt);
                http.getReq(function(error,result){
                    cb(null,result);
                });
            },function(cb){
                var opt={
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:'/ent/provider/shortList',
                    method:'GET'
                };
                var http=new HttpClient(opt);
                http.getReq(function(error,result){
                    cb(null,result);
                });
            }
        ],function(error,result){
            if(!_.isEmpty(error)){
                response.render('errorPage',{error:2,errorMsg: e.message});
            }else{
                    viewData.providerInfo=result[1].data;
                    viewData.moduleInfo=result[0].data;
                    response.render('rightsManagement',viewData);
            }
        });
    }catch(e){
        response.render('errorPage',{error:2,errorMsg: e.message});
    }
};

exports.list = function(request,response){
    try{
        if(!_.isEmpty(request.params.id)){
            var memberId = request.params.id;
        }else{
            response.json({error:1,errorMsg: "参数不完整"});
        }
        var viewData={};
            viewData.data=[];
        var opt={
            hostname:config.inf.host,
            port:config.inf.port,
            path:'/module/priv/list',
            method:'GET'
        };
        var http = new HttpClient(opt);
        http.getReq(function(error,result){
            if(result.error==0){
                result.data.forEach(function(p){
                    if(p.member._id==memberId){
                        viewData.data.push(p);
                    }
                });
                viewData.error=0;
                viewData.errorMsg="";
                response.json(viewData);
            }else{
                response.json({error:1,errorMsg: result.errorMsg});
            }
        });
    }catch(e){
        response.json({error:1,errorMsg: e.message});
    }
};

exports.save = function(request,response){
    try{
        var opt={
            hostname:config.inf.host,
            port:config.inf.port,
            path:'/module/priv/update',
            method:'POST'
        };
        var params = request.body;
        params.operator = request.session.user._id;
        var http = new HttpClient(opt);
       http.postReq(params,function(error,result){
          response.json(result);
       });
    }catch(e){
        response.json({error:1,errorMsg: e.message});
    }
};