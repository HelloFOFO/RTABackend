var HttpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var crypto = require('crypto');

exports.changePassword = function(req,res){
   try{
       var md5 = function(string) {
           var md5sum = crypto.createHash('md5');
           md5sum.update(string, 'utf8');
           return md5sum.digest('hex');
       };

       var password = req.body.password;

       password = md5(password);

       var params = { 'passwd':password,
           'mobile':req.session.user.mobile
       };

       var opt={
           hostname:config.inf.host,
           port:config.inf.port,
           path:'/member/password/change',
           method:'POST'
       };

       var http = new HttpClient(opt);

       http.postReq(params,function(error,result){
           if(error){
               res.json({error:1,errorMsg:error});
           }else{
               res.json(result);
           }
       });
   }catch(e){
        res.json({error:1,errorMsg: e.message});
   }
};