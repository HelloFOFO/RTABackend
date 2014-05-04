/**
 * Created by wucho on 14-3-19.
 */

exports.inf = {
     host:process.env.APISERVER||'172.16.0.15'
    ,port:process.env.APIPORT||3333
    ,pageSize:10
    ,projectName:'RTA后台管理--'
    ,adminMobile:'18616365242'
    ,welcome:"欢迎页"
};

exports.errorPage= {
    page:'error'
};


exports.wx = {
    appID:"wx190214d55eec21df",
    appsecret:"74ed5cffe3f1bf576d0d3fc9cab2d370",
    wxhost : "api.weixin.qq.com",
    wxport : 443
};

exports.alipay = {
    partner : "",
    seller : "",
    sign_type : "MD5",
    key : "",
    input_charset : "utf-8",
    format : "xml",
    v : "2.0",
    alipay_gateway : "wappaygw.alipay.com",
    port : 80,
    path : "/service/rest.htm?",
    https_verify_url : "mapi.alipay.com",
    https_verify_path : "/gateway.do?service=notify_verify&",
    https_port : 443,
    notify_url : "",
    call_back_url : "",
    merchant_url : "",
    authSrv : "alipay.wap.trade.create.direct",
    tradSrv : "alipay.wap.auth.authAndExecute"
};
