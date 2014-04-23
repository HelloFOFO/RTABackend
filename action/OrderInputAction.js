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
var template = 'orderInput';

//获取产品列表
var getProductListByCity = function(city,cb){
    var opt = {
         hostname:Config.inf.host
        ,port:Config.inf.port
        ,method:"GET"
        ,path:'/web/product/webList/'+city
    };
    var http = new httpClient(opt);
    http.getReq(function(err,result){
        if(result){
            if(result.error==0){
                cb(null,result.data);
            }else{
                cb(null,[]);
            }
        }else{
            cb(null,[]);
        }
    });
};

//render search and modal
exports.init = function(req,res){
  try{
    var viewData = {};
    if(_.isEmpty(req.session.user.modules) || _.isEmpty(req.session.user.mobile) || _.isEmpty(req.session.user._id) ){
        res.render("index",{error:1,errorMsg:"无法读取模块列表！"});
    }else{
        var opt = {
            hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/city/shortList'
        };
        var httpCity = new httpClient(opt);
        httpCity.getReq(function(err,result){
            viewData.cityInfo = result.data;
            getProductListByCity("5343758fd8d3efb068465b2d",function(err,r){
                viewData.productInfo = r;
                res.render(template,viewData);
            });//上海
//            console.log(viewData);

        });
    }
    }catch(e){
        var ret={};
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        console.log(ret);
    }
};

exports.listProductByCity =  function(req,res){
    if(_.isEmpty(req.params.cityID)){
        res.json({error:1,errorMsg:"必须选择城市！"});
    }else{
        var city = req.params.cityID;
        getProductListByCity(city,function(err,result){
            res.json({error:0,data:result});
        });
    }
};

//这个方法只有在门票和套票的时候用得上，因为只有门票和套票是选择有效期的
exports.getPriceRange = function(req,res){
    try{
        var productType = req.query.productType;
        var product     = req.query.product;
        var opt = {
             hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/product/'+productType+'/priceLog/list?pageSize=100&status=2&product='+product //status=2 means 已通过
        };
        var http = new httpClient(opt);
        http.getReq(function(error,result){
            var newData = [];
            result.data.forEach(function(d){
                var obj       = {};
                if(d.inventory>0){
                    obj.productID   = d.product._id;
                    obj.startDate   = d.startDate;
                    obj.endDate         = d.endDate;
                    obj.price           = d.price;
                    obj.priceWeekend    = d.priceWeekend;
                    obj.weekend         = d.weekend;
                    obj.priceLog        = d._id;
                    newData.push(obj);
                }
            });
            result.data=newData;
            res.json(result);
        });
    }catch (e){
    }
};

exports.getPriceSelect = function(req,res){
    try{
        var productType = req.query.productType;
        var product     = req.query.product;
        var effectDate  = DateTool.DateAdd('d',-1,new Date().getTime());
        var expiryDate  = DateTool.DateAdd('d',45,new Date().getTime());
        var opt = {
            hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/product/'+productType+'/price/list/'+product+'?effectDate='+effectDate+'&expiryDate='+expiryDate  //status=2 means 已通过
        };
        var http = new httpClient(opt);
        http.getReq(function(error,result){
            var newData = [];
            result.data.forEach(function(d){
                var obj       = {};
                if(d.inventory>0){
                    obj.date   = d.date;//new Date(d.date).Format('yyyy-MM-dd');
                    obj.price  = d.price;
                    newData.push(obj);
                }
            });
            delete result.data;
            result.priceInfo = _.indexBy(newData,'date');
            res.json(result);
        });
    }catch (e){
    }
};

exports.saveOrder = function(req,res){
    try{
        var opt = {
             hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"POST"
            ,path:'/order/save'
        };
        var params      = req.body;
        params.member   = req.session.user._id;
        params.source   = "534de2d55c5cc4b51f4e189d";
        params.operator = req.session.user._id;
        console.log(params);
        var http = new httpClient(opt);
        http.postReq(params,function(error,data){
           if(error){
               res.json({error:1,errorMsg:error});
           }else{
               res.json(data);
           }
        });
    }catch(e){
        res.json({error:1,errorMsg:""});
    }
};

exports.list = function(req,res){
    try{
        var viewData={};
        var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;
        var otherParams = {
//             city: _.isEmpty(req.query.searchCity)?undefined:req.query.searchCity
             member:req.session.user._id
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
                        case 0: d.status = "未支付";d.opType='<button class="btn" status="-1">查看</button> <button class="btn btn-primary" status="1">支付</button> <button class="btn btn-danger"  status="3">取消</button>';break;
                        case 1: d.status = "已支付";d.opType='<button class="btn" status="-1">查看</button>';break;
                        case 2: d.status = "已确认";d.opType='<button class="btn" status="-1">查看</button>';break;
                        case 3: d.status = "已取消";d.opType='<button class="btn" status="-1">查看</button>';break;
                        case 4: d.status = "已退款";d.opType='<button class="btn" status="-1">查看</button>';break;
                    }
                    //formate orderDate
                    d.orderDate = new Date(d.orderDate).Format("yyyy-MM-dd hh:mm");
                });
                viewData=data;
                viewData.pageInfo  = Paging.getPageInfo(req.query,data.totalPage,'orderInput/list',otherParams);
                res.json(viewData);
            }
        });
    }catch(e){
        res.json({error:1,errorMsg:""});
    }
};

exports.update = function(req,res){
    try{
        var orderID = req.params.id;
        if(_.isEmpty(orderID)){
            res.json({error:1,errorMsg:"订单号不能为空！"});
        }else{
            var opt = {
                 hostname:Config.inf.host
                ,port:Config.inf.port
                ,method:"POST"
                ,path:'/order/update/'+orderID
            };
            var params=req.body;
            var http = new httpClient(opt);
            http.postReq(params,function(error,data){
               if(error){
                   res.json({error:1,errorMsg:error});
               }else{
                   res.json(data);
               }
            });
        }
    }catch(e){
        res.json({error:1,errorMsg:""});
    }
};

exports.orderDetail = function(req,res){
    try{
        var orderID = req.params.orderID;
        var opt = {
             hostname:Config.inf.host
            ,port:Config.inf.port
            ,method:"GET"
            ,path:'/order/detail/'+orderID
        };
        var http = new httpClient(opt);

        http.getReq(function(err,d){
            if(err==null){
                if(d.error==0){
                    if(d.data.product.type==1 || d.data.product.type==5 ){
                        //ticket ==1
                        var startDate = d.data.startDate;
                        var endDate   = d.data.endDate;
                        var isWeekend = "";
                        if(!(d.data.isWeekend === undefined)){
                            isWeekend = d.data.isWeekend?"(周末票)":"(平日票)";
                        }
                        if(_.isNumber(startDate) && _.isNumber(endDate)){
                            d.data.useDate = new Date(startDate).Format("yyyy-MM-dd") + '~' + new Date(endDate).Format("yyyy-MM-dd");
                            d.data.useDate += isWeekend;
                        }else{
                            d.data.useDate = "";
                        }
                        d.data.product.type = d.data.product.type==1?"门票":"套票";
                        //hotel = 2
                    }else if(d.data.product.type==2){
                        if(_.isNumber(d.data.startDate) && _.isNumber(d.data.endDate)){
                            d.data.useDate = new Date(startDate).Format("yyyy-MM-dd") + '~' + new Date(endDate).Format("yyyy-MM-dd");
                        }else{
                            d.data.useDate = "";
                        }
                        d.data.product.type="单酒店";
                        //package
                    }else if(d.data.product.type==4){
                        if(_.isNumber(d.data.startDate)){
                            d.data.useDate =  new Date(d.data.startDate).Format("yyyy-MM-dd");
                        }else{
                            d.data.useDate = "";
                        }
                        d.data.product.type="套餐";
                    }
                    res.json(d);
                }else{
                    res.json({error:99,errorMsg:d.errorMsg});
                }
            }else{
                res.json({error:1,errorMsg:err});
            }
        });
    }catch(e){
        res.json({error:1,errorMsg: e.message});
    }
};

