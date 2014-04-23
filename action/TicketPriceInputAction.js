/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var async = require('async');
var underscore = require('underscore');
var timeZone = ' 00:00:00 +08:00';

var weekendConvert = function(weekend){
    var weekendStr = [];
    if(underscore.isArray(weekend)){
        weekend.forEach(function(w){
            switch(parseInt(w)){
                case 0:weekendStr.push("周日");break;
                case 1:weekendStr.push("周一");break;
                case 2:weekendStr.push("周二");break;
                case 3:weekendStr.push("周三");break;
                case 4:weekendStr.push("周四");break;
                case 5:weekendStr.push("周五");break;
                case 6:weekendStr.push("周六");break;
            }
        });
        return "["+weekendStr.join(",")+"]";
    }else{
            return "--";
    }
};

exports.viewTicketPriceInput = function(req,res){
    var ret;
        async.waterfall([
            //get list
            function(cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/product/ticket/priceLog/list?page=0&status=1",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret = result;
                        ret.currentPage = 1;
                        if(result.totalPage===0){
                            ret.totalPage++;
                        }
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }
                });
            },
            //get short providers name list
            function(r,cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/ent/provider/shortList",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret.providerNames = result.data;
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }
                });
            },
            //get short operator list
            function(r,cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/ent/provider/member/shortList?provider="+req.session.user.provider._id,
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    console.log('-----------------------');
                    if(result.error===0){
                        ret.operators = result.data;
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }
                });
            },
            //get city list
            function(r,cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/city/shortList",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret.citys = result.data;
                        if("input"===req.params.category){
                            res.render("ticketPriceInput",ret);
                        }else{
                            res.render("ticketPriceAudit",ret);
                        }
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }

                });
            }
        ],function(error,errMsg){
            if(null!=error){
                console.log(error+","+errMsg);
            }
        });
};

exports.addInputLog = function(req,res){
    var params = req.body;
    params.startDate = new Date(params.startDate+timeZone).getTime();
    params.endDate = new Date(params.endDate+timeZone).getTime();
    delete params.addCity;
    if(!underscore.isArray(params.weekend)){
        params.weekend = [params.weekend];
    }
    params.status = 1;
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/product/ticket/price/create",
        method:"POST"
    };
    try{
        new httpClient(opt).postReq(params,function(err,response){
            res.json({error:response.error,errMsg:response.errorMsg});
        });

    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};


exports.getTicketPriceLogList = function(req,res){
    var params;
    var page = 0;
    if(req.body.current&&req.body.current>0){
        page = req.body.current-1;
    }
    params = "page="+page;
    //check
    if(!underscore.isEmpty(req.body.product)){
        params += "&product="+req.body.product;
    }
    if(!underscore.isEmpty(req.body.startDate)){
        params += "&startDate="+new Date(req.body.startDate).getTime();
    }
    if(!underscore.isEmpty(req.body.endDate)){
        params += "&endDate="+new Date(req.body.endDate).getTime();
    }
    if(!underscore.isEmpty(req.body.operator)){
        params += "&operator="+req.body.operator;
    }
    if(!underscore.isEmpty(req.body.provider)){
        params += "&provider="+req.body.provider;
    }
    if(!underscore.isEmpty(req.body.status)){
        params += "&status="+req.body.status;
    }
    //req
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/product/ticket/priceLog/list?"+params,
        method:"GET"
    };
    console.log(opt.path);
    var ret = {};
    try{
        new httpClient(opt).getReq(function(err,result){
            if(result.error==0){
                ret = result;
                ret.data.forEach(function(d){
                    d.weekend = weekendConvert(d.weekend);
                });
                ret.currentPage = 1;
                if(result.totalPage===0){
                    ret.totalPage++;
                }
                res.json(ret);
            }else{
                console.log('imhere');
                res.json({error:11,errorMsg:result.errorMsg});
            }
        });
    } catch(e){
        res.json({error:1111,errorMsg:e.message});
    }

};