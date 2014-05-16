var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var async = require('async');
var underscore = require('underscore');
var timeZone = ' 00:00:00 +08:00';

exports.test = function(req,res){
    console.log(req.params.type,req.params.fuck);
    res.send(req.params.type+req.params.fuck);
};

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

var pageSize = config.inf.pageSize;

exports.init = function(req,res){
    var ret={};
    var productType = req.params.productType;
    async.waterfall([
        //get short providers name list
        function(cb){
            var opt = {
                hostname:config.inf.host,
                port:config.inf.port,
                path:"/ent/provider/shortList",
                method:"GET"
            };
            new httpClient(opt).getReq(function(err,result){
                if(!err && result.error===0){
                    ret.providerNames = result.data;
                    cb(null,result);
                }else{
                    console.log("get provider list error",opt.path,err,result);
                    cb('get provider list error',null);
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
                if(!err && result.error===0){
                    ret.operators = result.data;
                    cb(null,result);
                }else{
                    console.error("get member list error",opt.path,err,result);
                    cb('get member list error',null);
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
                if( !err && result.error===0 ){
                    ret.citys = result.data;
                    ret.userModules = req.session.user.modules;
                    ret.user={};
                    ret.user.mobile=req.session.user.mobile;
                    ret.user._id=req.session.user._id;
                    cb(null,ret);
                }else{
                    console.error("get city list error",opt.path,err,result);
                    cb('get city list error',null);
                }

            });
        }
    ],function(error,result){
        if(error){
            console.error('init price input error',error+","+result);
            res.redirect('/errorPage');
        }else{
            if("input"===req.params.category){
                res.render(productType+"PriceInput",result);
            }else{
                res.render(productType+"PriceAudit",result);
            }
        }
    });
};

exports.add = function(req,res){
    var params = req.body;
    var productType = req.params.productType;
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
        path:'/product/'+productType+'/price/create',
        method:"POST"
    };
    try{
        new httpClient(opt).postReq(params,function(err,response){
            res.json({error:response.error,errMsg:response.errorMsg});
        });
    } catch(e){
        console.error(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

exports.list = function(req,res){
    var params;
    var productType = req.params.productType;
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
        path:"/product/"+productType+"/priceLog/list?pageSize="+pageSize+'&'+params,
        method:"GET"
    };
    console.debug(productType + ' price list %s',opt.path);
    var ret = {};
    try{
        new httpClient(opt).getReq(function(err,result){
            console.log(result);
            if(result.error===0){
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
                res.json({error:1,errorMsg:result})
            }

        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }

};

exports.update = function(req,res){
    try{
        var flag = true;
        if(underscore.isEmpty(req.params.productType)){
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
        }        else{
            res.json({error:1,errMsg: "参数不能为空"});
        }}catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

