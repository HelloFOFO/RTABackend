/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var Paging     = require('./../tools/Paging');
var _ = require('underscore');
var  querystring  = require('querystring');
var timeZone = ' 00:00:00 +08:00';



var productType  = 'news'
var template     = productType+'ManagementAudit'

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
    //审核页面不需要判断供应商，可以审核所有人的信息
//    otherParams.provider = req.session.user.provider._id;
    //开始日期和结束日期必须同时输入，才进行日期范围查询
    if(!_.isEmpty(req.query.searchEffect) && _.isDate(req.query.searchEffect) && !_.isEmpty(req.query.searchExpiry) && _.isDate(req.query.searchExpiry)){
        otherParams.startDate = new Date(req.query.searchEffect+timeZone).getTime();
        otherParams.endDate   = new Date(req.query.searchExpiry+timeZone).getTime();
    }if(!_.isEmpty(req.query.searchStatus)){
        otherParams.status = req.query.searchStatus;
    }
    otherParams = querystring.stringify(otherParams);
    opt.path="/news/list?page="+requestPage+'&'+otherParams;
    console.log(opt.path);
    opt.method="GET";
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            viewData = result;
//            console.log(result);
            viewData.pageInfo  = Paging.getPageInfo(req.query,result.totalPage,'newsManagementAudit/list',otherParams);
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

exports.audit = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };

    if(_.isEmpty(req.session.user._id)){
        res.json({
            error:100,
            errorMsg:'请先登录'
        });
    }if(_.isEmpty(req.params.id)){
        res.json({
            error:101,
            errorMsg:'缺少id参数'
        });
    }

    opt.path="/news/audit/"+req.params.id;
    opt.method="POST";
    var params = req.body;
    params.auditor = req.session.user._id;
    console.log('newManagementAudit Audit params',JSON.stringify(params));
    try{
        new httpClient(opt).postReq(params,function(err,response){
            res.json(response);
        });
    }catch(e){
        res.json({error:1,errMsg: e.message});
    }
};
