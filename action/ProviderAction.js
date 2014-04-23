/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var _ = require('underscore');
//view
exports.viewProviderManger = function(req,res){
    //init
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/list?page=0",
        method:"GET"
    };

    var viewData = {};
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            viewData = result;
            viewData.currentPage =1;
//            console.log(req.session.user.modules);
            if(result.totalPage===0){
                viewData.totalPage++;
            }
            res.render("providerManagement",viewData);
        });
    } catch(e){
        res.render("errorPage",{error:1,errorMsg: e.message});
    }


};

exports.addProvider = function(req,res){
    var params = req.body;
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/create",
        method:"POST"
    };
    try{
        new httpClient(opt).postReq(params,function(err,response){
//                    console.log("save provider finish..."+err+","+response);
            res.json({error:response.error,errMsg:response.errorMsg});
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

//detail
exports.getProviderDetail = function(req,res){
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/detail/"+req.body.id,
        method:"GET"
    };
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            res.json(result);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

exports.updateProvider = function(req,res){
    var params = req.body;
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/update/"+req.params.id,
        method:"POST"
    };
    try{
        var http = new httpClient(opt);
        http.postReq(params,function(err,result){
            res.json(result);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

exports.getProviders = function(req,res){
    var page = 0;
    if(req.body.current&&req.body.current>0){
        page = req.body.current-1;
    }
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/list?page="+page,
        method:"GET"
    };
    var ret = {};
    try{
        new httpClient(opt).getReq(function(err,result){
            ret = result;
            ret.currentPage = page+1;
            if(result.totalPage===0){
                ret.totalPage++;
            }
            res.json(ret);
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }
};