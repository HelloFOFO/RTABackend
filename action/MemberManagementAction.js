/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var async = require('async');
var config = require('./../tools/Config.js');
var querystring  = require('querystring');
var Paging     = require('./../tools/Paging');
var _  = require('underscore');
exports.init = function(req,res){
    try{
        res.render("memberManagement",{});
    }catch(e){
        res.redirect("/errorPage",{});
    }
};



exports.detail = function(req,res){
    try{
        var opt = {
            hostname:config.inf.host,
            port:config.inf.port,
            path:"/ent/agent/member/detail/"+req.params.id,
            method:"GET"
        };
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            if(err||result.error!=0){
                console.log(err,result);
                res.json({error:1,errorMsg:err});
            }else{
                delete result.data.passwd;
                result.data.signUpDate = new Date(result.data.signUpDate).Format("yyyy-MM-dd hh:mm");
                res.json(result);
            }
        });
    } catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

exports.list = function(req,res){
    try{
        var opt = {
            hostname:config.inf.host,
            port:config.inf.port,
            method:"GET"
        };
        var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;
        var otherParams = {
             mobile: _.isEmpty(req.query.mobile)?undefined:req.query.mobile
            ,name:_.isEmpty(req.query.searchEffect)?undefined:new Date(req.query.searchEffect+timeZone).getTime()
            ,isEnable:_.isEmpty(req.query.searchExpiry)?undefined:new Date(req.query.searchExpiry+timeZone).getTime()
            ,pageSize:config.inf.pageSize
        };
        otherParams = querystring.stringify(otherParams);
        opt.path="/member/list?page="+requestPage+'&'+otherParams;
//        opt.path="/member/list";
        var viewDate = {};
        new httpClient(opt).getReq(function(err,result){
            if( err || result.error != 0 ){
                console.log(err,result.error!=0,result.error,opt.hostname+':'+opt.port+opt.path,"aaaaa",result);
                res.json({error:1,errorMsg:""});
            }else{
                viewData = result;
                viewData.pageInfo  = Paging.getPageInfo(req.query,result.totalPage,'memberManagement/list',otherParams);
                res.json(viewData);
            }
        });
    } catch(e){
        res.json({error:1,errorMsg: e.message});
    }

};