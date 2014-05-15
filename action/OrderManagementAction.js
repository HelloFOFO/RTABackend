/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var DateTool = require('./../tools/DateTool');
var Paging     = require('./../tools/Paging');
var _ = require('underscore');
var  querystring  = require('querystring');
var timeZone = ' 00:00:00 +08:00';
var template = 'orderManagement';


//render search and modal
exports.init = function(req,res){
    try{
        var viewData = {};
        var opt = {
             hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/city/shortList'
        };
        var httpCity = new httpClient(opt);
        httpCity.getReq(function(err,result){
            if(err || result.error !=0 ){
                res.render( 'errorPage' , { error:1 , errorMsg: err } );
            }else{
                viewData.cityInfo = result.data;
                res.render(template,viewData);
            }
        });
    }catch(e){
       res.render('errorPage',{error:1,errorMsg: e.message});
    }
};

exports.detail = function(req,res){
    try{
        var orderID = req.query.orderID;
        var opt = {
            hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/order/detail/'+orderID
        };
        var http = new httpClient(opt);
        http.getReq(function(err,data){
           res.json(data);
        });
    }catch(e){
        res.json({error:1,errorMsg: e.message});
    }
};

exports.list = function(req,res){
    try{
        var viewData={};
        var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;
        var otherParams = {
//             city: _.isEmpty(req.query.searchCity)?undefined:req.query.searchCity
             member: _.isEmpty(req.query.member)?undefined:req.query.member
             ,orderID:_.isEmpty(req.query.orderID)?undefined:req.query.orderID
//            ,product: _.isEmpty(req.query.searchProduct)?undefined:req.query.searchProduct
//            ,orderDate:_.isEmpty(req.query.searchOrderDate)?undefined:new Date(req.query.searchOrderDate+timeZone).getTime()
//            ,startDate:_.isEmpty(req.query.searchStartDate)?undefined:new Date(req.query.searchStartDate+timeZone).getTime()
            ,contactPhone: _.isEmpty(req.query.contactPhone)?undefined:req.query.contactPhone
            ,status: _.isEmpty(req.query.status)?undefined:req.query.status
            ,liveName: _.isEmpty(req.query.liveName)?undefined:req.query.liveName
            ,pageSize:Config.inf.pageSize
        };
        otherParams = querystring.stringify(otherParams);
        var opt = {
            hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/order/list?page='+requestPage+'&'+otherParams
        };
        console.log(opt.path);
        var http = new httpClient(opt);
        http.getReq(function(error,data){
            if(error){
                res.json({error:1,errorMsg:error});
            }else{
                data.data.forEach(function(d){
                    //ticket and ticketPackage
                    if(d.product.type==1 || d.product.type==5 ){
                        var startDate = d.subOrder[0].price.startDate;
                        var endDate   = d.subOrder[0].price.endDate;
                        var isWeekend = "";
                        if(!(d.isWeekend === undefined)){
                            isWeekend = d.isWeekend?"(周末票)":"(平日票)";
                        }
                        if(_.isNumber(startDate) && _.isNumber(endDate)){
                            d.useDate = new Date(startDate).Format("yyyy-MM-dd") + '~' + new Date(endDate).Format("yyyy-MM-dd");
                            d.useDate += isWeekend;
                        }else{
                            d.useDate = "";
                        }
                        d.product.type = d.product.type==1?"门票":"套票";
                        //hotel = 2
                    }else if(d.product.type==2){
                        if(_.isNumber(d.startDate) && _.isNumber(d.endDate)){
                            d.useDate = new Date(startDate).Format("yyyy-MM-dd") + '~' + new Date(endDate).Format("yyyy-MM-dd");
                        }else{
                            d.useDate = "";
                        }
                        d.product.type="单酒店";
                        //package
                    }else if(d.product.type==4){
                        if(_.isNumber(d.startDate)){
                            d.useDate =  new Date(d.startDate).Format("yyyy-MM-dd");
                        }else{
                            d.useDate = "";
                        }
                        d.product.type="套餐";
                    }
                    //formate status
                    switch (d.status){
                        case 0: d.status = "未支付";d.opType="查看";break;
                        case 1: d.status = "已支付";d.opType="操作确认";break;
                        case 2: d.status = "已确认";d.opType="操作退款";break;
                        case 3: d.status = "已取消";d.opType="查看";break;
                        case 4: d.status = "已退款";d.opType="查看";break;
                    }
                    //formate orderDate
                    d.orderDate = new Date(d.orderDate).Format("yyyy-MM-dd hh:mm");
                });
                viewData=data;
                viewData.pageInfo  = Paging.getPageInfo(req.query,data.totalPage,'orderManagement/list',otherParams);
                res.json(viewData);
            }
        });
    }catch(e){
        res.json({error:1,errorMsg:""});
    }
};

exports.updateInvoice = function(req,res){
    try{
        var viewData = {};
        var orderID  = req.params.orderID;
        if(_.isEmpty(orderID)){
            res.json({error:1,errorMsg:"订单号不能为空"});
        }else{
            var opt = {
                hostname:Config.inf.host
                ,port:Config.inf.port
                ,method:"POST"
                ,path:'/order/invoice/update/'+orderID
            };
            var httpCity = new httpClient(opt);
            var params   = req.body;
            params.operator = req.session.user._id;
            httpCity.postReq(params,function(err,result){
                if(err){
                    res.json({error:1,errorMsg: err});
                }else{
                    res.json(result);
                }
            });
        }
    }catch(e){
        res.json({error:1,errorMsg: e.message});
    }
};


exports.orderExport = function(req,res){
    try{
        var opt = {
            hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/order/export'+'?product='+req.params.product
        };
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            if(err || result.error != 0 ){
                res.send("下载错误！");
            }else{
                res.set({
                    "Content-Disposition":"attachment; filename=export.csv",
                    "Content-Type": "application/text; charset=GBK"
                });
                var iconv = require('iconv-lite');
                res.send(iconv.encode(result.data, 'GBK'));
            }
        });
    }catch(e){
                res.send("下载错误！"+ e.message);
    }
};

