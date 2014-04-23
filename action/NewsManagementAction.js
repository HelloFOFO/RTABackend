/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var Paging     = require('./../tools/Paging');
var _ = require('underscore');
var  querystring  = require('querystring');
var timeZone = ' 00:00:00 +08:00';


var modName      = "供应商管理"
var productType  = 'news'
var template     = productType+'Management'

//render search and modal
exports.init = function(req,res){
    var viewData = {};
    res.render(template,viewData);
};

//view list
exports.list = function(req,res){
    //init 如果传过来的有page参数,则用page参数，如果传过来没有page参数,则默认为0
    var viewData = {};
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;

    var otherParams={};
    otherParams.provider = req.session.user.provider._id;
    //开始日期和结束日期必须同时输入，才进行日期范围查询
    if(!_.isEmpty(req.query.searchEffect) && _.isDate(req.query.searchEffect) && !_.isEmpty(req.query.searchExpiry) && _.isDate(req.query.searchExpiry)){
        otherParams.startDate = new Date(req.query.searchEffect+timeZone).getTime();
        otherParams.endDate   = new Date(req.query.searchExpiry+timeZone).getTime();
    }if(!_.isEmpty(req.query.searchStatus)){
        otherParams.status = req.query.searchStatus;
    }
    otherParams = querystring.stringify(otherParams);
    opt.path="/news/list?page="+requestPage+'&'+otherParams;
//    console.log(opt.path);
    opt.method="GET";
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            viewData = result;
            viewData.pageInfo  = Paging.getPageInfo(req.query,result.totalPage,'newsManagement/list',otherParams);
//            console.log('newsManagement---step1',viewData,'providername');
            res.json(viewData);
        });
    } catch(e){
        res.json({
            error:1,
            errorMsg: e.message
        });
    }
};

exports.add = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path="/news/create";
    opt.method="POST";
    if(_.isEmpty(req.session.user.provider.name)){
        res.json({
            error:100,
            errorMsg:'请先登录'
        });
    }else if(_.isEmpty(req.body.title)){
        res.json({
            error:500,
            errorMsg:'标题未填写'
        });
    }else if(_.isEmpty(req.body.content)){
        res.json({
            error:500,
            errorMsg:'内容未填写'
        });
    }
    var params = req.body;
    params.provider = req.session.user.provider._id;
//    console.log('newManagement add params',JSON.stringify(params));
    try{
        new httpClient(opt).postReq(params,function(err,response){
            res.json(response);
        });
    } catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

exports.update = function(req,res){
    var params = req.body;
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path = "/news/update/"+req.params.id;
//    console.log(opt.path);
    opt.method = "POST"
    try{
        var http = new httpClient(opt);
//        console.log(params);
        http.postReq(params,function(err,response){
            res.json(response);
        });
    } catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

exports.viewDetail = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path = "/news/detail/"+req.params.id;
    opt.method = 'GET'
//    console.log(opt.path);
    var ret = {};
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
           res.json(result);
        });

    } catch(e){
        res.json({
            error:1,
            errorMsg: e.message
        });
    }
}