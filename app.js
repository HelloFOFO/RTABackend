/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var http = require('http');
var path = require('path');
var log4js = require('log4js');
var Conf = require("./tools/Config");
var RedisStore = require('connect-redis')(express);

var store = new RedisStore({
            host: process.env.REDISSEVER||'172.16.0.15',
            port: process.env.REDISPORT||6379,
            db: 2,
            pass: process.env.REDISPASS||'rtadd885'
});

//log4js config
log4js.configure({ appenders : [ { type : 'console' } ], replaceConsole : true });
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

var app = express();
// all environments
app.set('port', process.env.PORT||"3457");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.favicon());
app.use(express.bodyParser({ uploadDir : './uploads' }));

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret : 'rta',
    store : store,
    cookie : { maxAge : 180000000 }
}));

app.use(log4js.connectLogger(logger, {
    level : log4js.levels.INFO
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.logger('dev'));

index(app);

app.listen(app.get("port"));

Date.prototype.Format = function (fmt) { //author: wucho
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
