/**
 * Created by cloudbian on 14-4-2.
 */
var httpClient = require('HttpClient.js');
var httpsClient = require('HttpsClient.js');
var underscore = require('underscore');
var config = require('Config.js');
var crypto = require('crypto');
var qs = require('querystring');
var Alipay = function(){}
//过滤值为空的对象，传入的arrays为JSON对象的数组，数组只有2个属性，key value,Key的值必须按照alipay文档上的参数名填写
Alipay.wap.paramsFilter = function(arrays){
    var result = [];
    if(!underscore.isArray(arrays)||arrays.length<=0){
        return result;
    }
    arrays.forEach(function(obj){
        if(underscore.isEmpty(obj.value)||"sign"===obj.key||"sign_type"===obj.key){
            continue;
        }
        result.push(obj);
    });
};

//把所有元素进行排序按照GET请求的参数形式进行拼接
Alipay.wap.createLinkString = function(arrays){
    arrays.sort(function(a,b){
        return a>b;
    });
    var lnkStr = "";
    var isFirst = true;
    arrays.forEach(function(obj){
        if(isFirst){
            lnkStr = obj.key + "=" + obj.value;
            isFirst = false;
        }else{
            lnkStr = lnkStr + "&" + obj.key + "=" + obj.value;
        }
    });
    return lnkStr;
};

//固定参数排序并按照GET请求的参数形式进行拼接
Alipay.wap.createRegularLinkString = function(service,v,sec_id,notify_data){
    return "service="+service+"&v="+v+"&sec_id="+sec_id+"&notify_data="+notify_data;
};

//生成请求参数
Alipay.wap.bulidReqParam = function(arrays){
    var newParam = Alipay.wap.paramsFilter(arrays);
    var str = Alipay.wap.createLinkString(newParam);
    newParam.push({
        key:"sign",
        value:Alipay.wap.buildSign(str)
    });
    return newParam;
};

//生成签名
Alipay.wap.buildSign = function(s){
    var sign = "";
    if("MD5"===config.alipay.sign_type){
        var hasher = crypto.createHash("md5");
        hasher.update(s+config.alipay.key);
        sign = hasher.digest("hex");
    }
    return sign;
};

//授权请求
//traderNo 订单号
//subject 订单名称
Alipay.wap.reqAuth = function(tradeNo,subject,total_fee){
    var returnResult = "";
    var req_id = new Date().getTime();
    var req_dataToken = "<direct_trade_create_req><notify_url>" + config.alipay.notify_url
        + "</notify_url><call_back_url>" + config.alipay.call_back_url
        + "</call_back_url><seller_account_name>"
        + config.alipay.seller + "</seller_account_name><out_trade_no>"
        + tradeNo + "</out_trade_no><subject>" + subject
        + "</subject><total_fee>" + total_fee + "</total_fee><merchant_url>"
        + config.alipay.merchant_url + "</merchant_url></direct_trade_create_req>";
    var reqParams = [
        {
            key:"service",
            value:config.alipay.authSrv
        },{
            key:"partner",
            value:config.alipay.partner
        },{
            key:"_input_charset",
            value:config.alipay.input_charset
        },{
            key:"sec_id",
            value:config.alipay.sign_type
        },{
            key:"format",
            value:config.alipay.format
        },{
            key:"v",
            value:config.alipay.v
        },{
            key:"req_id",
            value:req_id
        },{
            key:"req_data",
            value:req_dataToken
        }
    ];
    var newParams = Alipay.wap.bulidReqParam(reqParams);
    var isFirst = true;
    var reqJson = "{";
    newParams.forEach(function(param){
        if(isFirst){
            reqJson = reqJson + param.key + ":" + param.value;
            isFirst = false;
        }else{
            reqJson = reqJson + "," + param.key + ":" + param.value;
        }
    });
    reqJson = "}";
    var opt = {
        hostname:config.alipay.alipay_gateway,
        port:config.alipay.port,
        path:config.alipay.path + "_input_charset="+config.alipay.input_charset,
        method:"POST"
    };
    new httpClient(opt).postReq(reqJson,function(err,res){
        returnResult = qs.unescape(res);
    });
    return returnResult;
};

//业务请求
Alipay.wap.reqTrade = function(reqToken){
    var reqParams = [
        {
            key:"service",
            value:config.alipay.tradSrv
        },{
            key:"partner",
            value:config.alipay.partner
        },{
            key:"_input_charset",
            value:config.alipay.input_charset
        },{
            key:"sec_id",
            value:config.alipay.sign_type
        },{
            key:"format",
            value:config.alipay.format
        },{
            key:"v",
            value:config.alipay.v
        },{
            key:"req_id",
            value:req_id
        },{
            key:"req_data",
            value:"<auth_and_execute_req><request_token>" + reqToken + "</request_token></auth_and_execute_req>"
        }
    ];
    var newParams = Alipay.wap.bulidReqParam(reqParams);
    var getParams = Alipay.wap.createLinkString(newParams);
    var opt = {
        hostname:config.alipay.alipay_gateway,
        port:config.alipay.port,
        path:config.alipay.path + "_input_charset=" + config.alipay.input_charset + "&" + getParams,
        method:"GET"
    };
    new httpClient(opt).getReq(function(err,res){
       console.log(res);
    });
};

//wap 同步回调验证
Alipay.wap.verify = function(arrays,sign){
    var verify = false;
    var params = Alipay.wap.paramsFilter(arrays);
    var str = Alipay.wap.createLinkString(params);
    var bs = Alipay.wap.buildSign(str);
    if(bs===sign){
        return true;
    }else{
        return false;
    }
}
//wap 异步回调验证
Alipay.wap.verify_notify = function(service,v,sec_id,notify_data){
    var str = Alipay.wap.createRegularLinkString(service,v,sec_id,notify_data);
    var isSign = Alipay.buildSign(str);
    var parseString = require('xml2js').parseString;
    try{
        parseString(notify_data, function (err, result) {
            var notifyId = result.notify.notify_id[0];
            var opt = {
                hostname:config.alipay.https_verify_url,
                port:config.alipay.https_port,
                path:config.alipay.https_verify_path + "partner=" + config.alipay.partner + "&notify_id=" + notifyId,
                method:"GET"
            };

                new httpsClient(opt).getReq(function(err,res){
                    if(isSign&&"true"===res){
                        return true;
                    }else{
                        return false;
                    }
                });
        });
    }catch(e){
        console.log("net work is wrong:" + e.message);
        return false;
    }
}

module.exports = Alipay;