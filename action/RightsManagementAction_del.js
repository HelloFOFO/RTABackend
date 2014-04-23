/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient  = require('./../tools/HttpClient.js');
var config      = require('./../tools/Config.js');

exports.init = function(req,res){
    var viewData = {};
    viewData.userModules = req.session.user.modules;
    viewData.user={};
    viewData.user.mobile=req.session.user.mobile;
    viewData.user._id=req.session.user._id;
    var opt = {
        hostname:config.inf.host
        ,port:config.inf.port
        ,path:"/provider/shortList"
        ,method:"GET"
    };
    var http = new httpClient(opt);
    http.getReq(function(error,result){
        viewData = result;
        res.render('rightsManagement',viewData);
    });
};



exports.update = function(req,res){
    var params = req.body;
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/member/update/"+req.params.id,
        method:"POST"
    };
    try{
        var http = new httpClient(opt);
        http.postReq(params,function(err,result){
            res.json(result);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};



exports.getProviderMembersList = function(req,res){
    var params;
    var page = 0;
    if(req.body.current&&req.body.current>0){
        page = req.body.current-1;
    }
    params = "page="+page;
    //check
    if(req.body.searchMobile&&null!==req.body.searchMobile&&""!==req.body.searchMobile){
        params += "&mobile="+req.body.searchMobile;
    }
    if(req.body.searchName&&null!==req.body.searchName&&""!==req.body.searchName){
        params += "&name="+req.body.searchName;
    }
    if(req.body.searchEmail&&null!==req.body.searchEmail&&""!==req.body.searchEmail){
        params += "&email="+req.body.searchEmail;
    }
    if(req.body.searchProvider&&null!==req.body.searchProvider&&""!==req.body.searchProvider){
        params += "&provider="+req.body.searchProvider;
    }
    if(req.body.searchisEnable&&null!==req.body.searchisEnable&&""!==req.body.searchisEnable){
        params += "&isEnable="+req.body.searchisEnable;
    }
    //req
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/ent/provider/member/list?"+params,
        method:"GET"
    };
    console.log(params);
    var ret = {};
    try{
        new httpClient(opt).getReq(function(err,result){
            ret = result;
            ret.currentPage = page+1;
            if(result.totalPage===0){
                ret.totalPage++;
            }
            res.json(ret);
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }

};