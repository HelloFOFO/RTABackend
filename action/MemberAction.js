/**
 * Created by zzy on 3/19/14.
 */
var HttpClient = require('./../tools/HttpClient.js');
var async = require('async');
var config = require('./../tools/Config.js');
var _ = require('underscore');
exports.login = function(request,response){
    async.waterfall([
        function(cb){
            var client = new HttpClient({
                hostname:config.inf.host,
                port:config.inf.port,
                path:'/member/login',
                method:'POST'
            });
            client.postReq({
                'mobile':request.body.mobile,
                'passwd':request.body.passwd
            },function(error,result){
                if(error){
                    cb(error,error);
                }else{
                    if(result.error==0){
                        cb(null,result);
                    }else{
                        cb(result.error,result.errorMsg);
                    }
                }
            });
        },
        function(member,cb){
            var opt={
                 hostname:config.inf.host
                ,port:config.inf.port
                ,method:'GET'
            };
//            console.log(member);
            //如果是内定的管理员，会无视权限管理，否则要判权限
            if(member.data.mobile==config.inf.adminMobile){
                opt.path='/module/shortList';
            }else{
                opt.path='/module/shortList?member='+member.data._id
            }
            var client = new HttpClient(opt);
            client.getReq(function(err,res){
                if(member.data!=null&&res.data!=null){
                    request.session.user = member.data;
                    cb(null,res);
                } else {
                    cb('用户名或密码错误！',null)
                }
            });
        }
    ],function(err,res){
        if(err){
            response.redirect('/');
        } else {
            if(res.data.length==0){
                response.redirect('/');
            }else{
                request.session.user.modules   = _.groupBy( res.data,function(o){return o.cat;});
                request.session.user.titleInfo = _.indexBy( res.data,function(o){return '/'+o.code;});
                response.redirect("/welcome");
            }
        }
    });
};