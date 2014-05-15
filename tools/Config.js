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
    ,webserverhost:process.env.WEBSERVERHOST||'localhost'
    ,webserverport:process.env.WEBSERVERPORT||'3000'
};

exports.errorPage= {
    page:'error'
};


exports.alipay = {
    partner : "2088601326477978",
    seller : "hj_ct@126.com",
    sign_type : "MD5",
    key : process.env.ALIPAYKEY,
    input_charset : "utf-8",
    format : "xml",
    v : "2.0",
    alipay_gateway : "wappaygw.alipay.com",
    port : 80,
    path : "/service/rest.htm?",
    https_verify_url : "mapi.alipay.com",
    https_verify_path : "/gateway.do?",
    https_port : 443,
    merchant_url : "",
    dirctSrv : "create_direct_pay_by_user",
    payment_type : "1",
//    direct_notify_url : "http://sh.dd885.com/web/notify",
//    direct_return_url : "http://sh.dd885.com/web/callback"
    //Test
    direct_notify_url : process.env.ALIPAY_WEB_NOTIFY||"http://cloud.bingdian.com/alipay/notify/",
    direct_return_url : process.env.ALIPAY_WEB_CALLBACK||"http://cloud.bingdian.com/alipay/callback/"
};
