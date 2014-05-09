var UPYun = require('./../tools/upyun').UPYun;
var upyun = new UPYun("dd885", "rtaimage", "rtaimage");
var crypto = require('crypto');

var md5 = function(string) {
//    var crypto = require('crypto');
    var md5sum = crypto.createHash('md5');
    md5sum.update(string, 'utf8');
    return md5sum.digest('hex');
};

var randomObjectId = function () {
//    var crypto = require('crypto');
    return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
}

//exports.fileUploadBak = function(req, res) {
//    var gm = require('gm');
//    res.contentType('json');
//    var fs =  require('fs');
//    var fileContent = fs.readFileSync(req.files.file.path);
////    console.log('----->          '+req.files.file.path);
////    console.log('----->          '+req.files.file.name);
//    var md5Str = md5(fileContent);
//    var newFileName = randomObjectId()+'.jpg';
//    upyun.setContentMD5(md5Str);
//    upyun.writeFile('/'+newFileName, fileContent, false, function(err, data){
//        gm('./uploads/48568-2yqh8b.jpg').identify(function (err, data) {
//            console.log(data);
//        });
////        console.debug(req.files.image+"aaaaaa");
//        if (err) {
//          res.json({error:1,errorMsg:"上传失败！"});
//        }
//        fs.unlink(req.files.file.path, function(err) {
//            if (err) {
//               console.log(err);
//            }else{
//               res.json({error:0,srcFileName:req.files.file.name  ,upyunFileName:newFileName});
//            }
//
//        });
//    });
//};


exports.fileUpload = function(req, res) {
    res.contentType('json');
    var fs =  require('fs');
    var im = require('imagemagick');
    im.identify(req.files.file.path, function(err, metadata){
        if(err){
            res.json({error:1,errorMsg:"上传失败！"});
        }else{
            fs.readFile(req.files.file.path,function(err,fileContent){
                if(err){
                    res.json({error:1,errorMsg:"上传失败！"});
                }else{
                    var md5Str = md5(fileContent);
                    var newFileName = randomObjectId()+'.jpg';
                    upyun.setContentMD5(md5Str);
                    upyun.writeFile('/'+newFileName, fileContent, false, function(err, data){
//        console.debug(req.files.image+"aaaaaa");
                        if (err) {
                            res.json({error:1,errorMsg:"上传失败！"});
                        }
                        fs.unlink(req.files.file.path, function(err) {
                            if (err) {
                                console.log(err);
                            }else{
                                res.json({error:0,srcFileName:req.files.file.name  ,upyunFileName:newFileName,width:metadata.width,height:metadata.height});
                            }
                        });
                    });
                }
            });
        }
    })

}