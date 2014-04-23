var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var DateTool   = require('./../tools/DateTool');
var _          = require('underscore');


var productType  = 'package'
var template     = productType+'PriceQuery'
var timeZone     = ' 00:00:00 +08:00';


exports.init = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    var viewData = {};
    try{
        opt.path = '/city/shortList';
        opt.method='GET';
        var httpCity = new httpClient(opt);
        httpCity.getReq(function(err,result){
            viewData.cityInfo = result.data;
            res.render(template,viewData);
        });
    } catch(e){
        res.render('errorPage',{error:1,errorMsg: e.message});
        console.log(e.message);
    }
};

//view
exports.list = function(req,res){
    //init 如果传过来的有page参数,则用page参数，如果传过来没有page参数,则默认为0
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    var viewData={};
    viewData.data={};
    viewData.data.priceData=[];
    var productID  = req.query.product;
    var effectDate = req.query.effectDate+timeZone;
    var expiryDate = req.query.expiryDate+timeZone;
//    var viewData = {data:{priceData:[{yearMonth:'2013-01',shift:3,days:[{price:100},{price:100},{price:100}]}]}};
    if(_.isEmpty(productID)){
            res.json({error:1,errorMsg:"未选择产品"});
    }if(_.isEmpty(effectDate)){
            res.json({error:1,errorMsg:"未选择价格开始日期"});
    }if(_.isEmpty(expiryDate)){
            res.json({error:1,errorMsg:"未选择价格截止日期"});
    }else{
        //这里做一下预处理，把effectDate处理成这个月所在的第一天
        //把expiryDate处理成这个月所在的最后一天
        effectDate = new Date(effectDate).getTime();
        expiryDate = new Date(expiryDate).getTime();
        effectDate = new Date(new Date(parseInt(effectDate)).getFullYear(),new Date(parseInt(effectDate)).getMonth(),1).getTime();
        var expiryMonthFirstDay = new Date(new Date(parseInt(expiryDate)).getFullYear(),new Date(parseInt(expiryDate)).getMonth(),1).getTime()
        expiryDate = DateTool.DateAdd('d',-1,DateTool.DateAdd('m',1,expiryMonthFirstDay));
        opt.path =  "/product/"+productType+"/price/list/"+productID;
        opt.path += '?effectDate='+effectDate.toString();
        opt.path += '&expiryDate='+expiryDate.toString();
        opt.method="GET";
        console.log(opt);
        try{
            var http = new httpClient(opt);
            http.getReq(function(err,result){
                var monthData={};
                var priceData = _.indexBy(result.data,'date');
//                console.log(priceData);
                //计算查询的时间段里有多少个月 以便按照月份查询
                var monthDiff =  DateTool.DateDiff('m',effectDate,expiryDate)+1;
                console.log('monthDiff',monthDiff,effectDate,expiryDate,new Date(effectDate));
                //第一层 按月循环
                var currentMonth        = effectDate;


                for(var i=1;i<=monthDiff;i++){
                    //初始化月份数据
                    monthData={};
                    var dayPrices = [];
                    var currentYearMonth    = new Date(currentMonth).Format("yyyy-MM");
                    //获取本月第一天是周几，如果是周一 shift=0 如果是周二 shift=1
                    var weekOfMonthFirstDay = new Date(currentMonth).getDay();//0 是周日 6是周六
                    //计算月份的第一天需要偏移多少个格子
                    var shift = DateTool.getShift(weekOfMonthFirstDay);
//                    console.log('monthData',monthData);
                    //计算本月有多少天
                    var daysOfCurrentMonth = (DateTool.DateAdd('m',1,currentMonth) - currentMonth) / 86400000;
//                    console.log('daysOfCurrentMonth',daysOfCurrentMonth);
                    //第二层 按天循环 从第一天循环到最后一天
                    console.log('currentMonth',currentMonth,'--looping--',i);
//                    console.log('priceData',priceData);
                    for(var j=1 ; j<=daysOfCurrentMonth ; j++){
                        var d = currentMonth + (j-1)*86400000;
                        d= d.toString();
//                        console.log(priceData,priceData[d],d);
                        if(_.isEmpty(priceData[d.toString()])){
                            dayPrices.push({
                                "date": d,
                                "cost": 99999,
                                "price": 99999,
                                "marketPrice": 99999,
                                "packagePrice": 99999,
                                "inventory": 99999
                            });
                        }else{
                            dayPrices.push(priceData[d.toString()]);
                        }

//                        console.log(dayPrices);
                    }
                    //一个月的数据循环完毕后，把一个月的数据推送到priceDate数组中
//                    console.log('---------',monthData);
                    monthData.days  = dayPrices;
                    monthData.shift = shift;
                    monthData.yearMonth  = currentYearMonth;

                    viewData.data.priceData.push(monthData);
//                    console.log('currentViewData',viewData);
                    //然后往后走一个月
                    currentMonth = DateTool.DateAdd('m',1,currentMonth);
                }
                viewData.error =  result.error;
                viewData.errorMsg = result.errorMsg;
                res.json(viewData);
//                console.log(viewData);
//                res.render(template,viewData);
            });
        } catch(e){
            req.json({
                error:1,
                errorMsg:e.message
            });
        }
    }
};