
var Auth = function(){
    return function(req,res,next){
        if(req.session && req.session.user){
            res.locals.user={};
            res.locals.userModules = req.session.user.modules;
            res.locals.user.mobile=req.session.user.mobile;
            res.locals.user._id=req.session.user._id;
            next();
        }else{
            res.redirect('/');
        }
    }
};

var TitleConfig = function(){
   return function(req,res,next){
      var Config = require('./Config');
      res.locals.proName = Config.inf.projectName;
       if(req.path=="/welcome"){
           res.locals.modName="";
       }else{
           if(req.session.user.titleInfo[req.path]){
               res.locals.modName = req.session.user.titleInfo[req.path].name;
               console.log(req.session.user.titleInfo[req.path],res.locals.modName);
           }
       }
      next();
   }
};



exports.TitleConfig = TitleConfig;
exports.Auth = Auth;