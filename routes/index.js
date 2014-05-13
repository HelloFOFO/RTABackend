
/*
 * GET home page.
 */
//bianbian Part
var ProviderAction = require('./../action/ProviderAction');
var ProviderMemberAction = require('./../action/ProviderMemberAction');
var AgentAction = require('./../action/AgentAction');
var AgentMemberAction = require('./../action/AgentMemberAction');
var MemberAction = require('./../action/MemberAction');
var HotelPriceInputAction = require('./../action/HotelPriceInputAction');
var TicketPriceInputAction = require('./../action/TicketPriceInputAction');
var VoturePriceInputAction = require('./../action/VoturePriceInputAction');
var AlipayWebAction = require('./../action/AlipayWebAction');

var PackagePriceInputAction = require("./../action/PackagePriceInputAction");

var TicketPackagePriceInputAction = require('./../action/TicketPackagePriceInputAction');
var PriceAuditAction = require('./../action/PriceAuditAction');
//wuchong Part

var ChangePasswordAction = require('../action/ChangePasswordAction');

var FileUploadAction = require('../action/FileUploadAction');
var ticketManagementAction = require('./../action/TicketManagementAction');
var hotelManagementAction = require('./../action/HotelManagementAction');
var votureManagementAction = require('./../action/VotureManagementAction');
var ticketPackageManagementAction = require('./../action/TicketPackageManagementAction');
var packageManagementAction = require('./../action/PackageManagementAction');
var newsManagementAction           = require('./../action/NewsManagementAction');
var newsManagementAuditAction      = require('./../action/NewsManagementAuditAction');
var shortListAction = require('./../action/ShortListAction');
var hotelPriceQueryAction = require('./../action/HotelPriceQueryAction');
var packagePriceQueryAction = require('./../action/PackagePriceQueryAction');
var rightsManagementAction       = require('./../action/RightsManagementAction');
var orderInputAction       = require('./../action/OrderInputAction');
var orderManagement = require('./../action/OrderManagementAction');
var memberManagement = require("./../action/MemberManagementAction");

var UserAuth = require("./../tools/UserAuth");


module.exports = function(app){

    app.get('/',function(request,response){response.render("index",{});});

    app.get('/errorPage',function(req,res){
        res.render('errorPage',{errorMsg:""});
    });

    app.post('/login',MemberAction.login);

    app.all('*',UserAuth.Auth(), UserAuth.TitleConfig());

    app.get('/welcome',function(req,res){res.render("welcome",{})});

    app.get('/logout',function(req,res){req.session.user={};res.redirect("/")});

    app.post('/changePassword',ChangePasswordAction.changePassword);

    //provider
    app.get('/provider',ProviderAction.viewProviderManger);
    app.post('/provider/add',ProviderAction.addProvider);
    app.post('/provider/detail',ProviderAction.getProviderDetail);
    app.post('/provider/update/:id',ProviderAction.updateProvider);
    app.post('/provider/list',ProviderAction.getProviders);
    //providerMember
    app.get('/providerMember',ProviderMemberAction.viewProviderMemberManager);
    app.post('/providerMember/add',ProviderMemberAction.addPMember);
    app.post('/providerMember/detail',ProviderMemberAction.getProviderMember);
    app.post('/providerMember/update/:id',ProviderMemberAction.updatePMember);
    app.post('/providerMember/list',ProviderMemberAction.getProviderMembersList);

    //agent
    app.get('/agentManagement',AgentAction.viewProviderManger);
    app.post('/agentManagement/add',AgentAction.addProvider);
    app.post('/agentManagement/detail',AgentAction.getProviderDetail);
    app.post('/agentManagement/update/:id',AgentAction.updateProvider);
    app.post('/agentManagement/list',AgentAction.getProviders);
    //agentMember
    app.get('/agentMemberManagement',AgentMemberAction.viewProviderMemberManager);
    app.post('/agentMemberManagement/add',AgentMemberAction.addPMember);
    app.post('/agentMemberManagement/detail',AgentMemberAction.getProviderMember);
    app.post('/agentMemberManagement/update/:id',AgentMemberAction.updatePMember);
    app.post('/agentMemberManagement/list',AgentMemberAction.getProviderMembersList);

    //hotel price input
    app.get('/hotelPrice/:category',HotelPriceInputAction.viewHotelPriceInput);
    app.get('/getProductNames/:productType',HotelPriceInputAction.getProductNames);
    app.post('/hotelPriceInput/list',HotelPriceInputAction.getHotelPriceLogList);
    app.post('/hotelPriceInput/add',HotelPriceInputAction.addInputLog);
    //ticket price input
    app.get('/ticketPrice/:category',TicketPriceInputAction.viewTicketPriceInput);
    app.post('/ticketPriceInput/list',TicketPriceInputAction.getTicketPriceLogList);
    app.post('/ticketPriceInput/add',TicketPriceInputAction.addInputLog);
    //voture price input
    app.get('/voturePrice/:category',VoturePriceInputAction.viewVoturePriceInput);
    app.post('/voturePriceInput/list',VoturePriceInputAction.getVoturePriceLogList);
    app.post('/voturePriceInput/add',VoturePriceInputAction.addInputLog);
    //ticketPackage price input
    app.get('/ticketPackagePrice/:category',TicketPackagePriceInputAction.viewTicketPackagePriceInput);
    app.post('/ticketPackagePriceInput/list',TicketPackagePriceInputAction.getTicketPackagePriceLogList);
    app.post('/ticketPackagePriceInput/add',TicketPackagePriceInputAction.addInputLog);

    //package price input
    app.get('/packagePrice/:category',PackagePriceInputAction.init);
    app.post('/packagePriceInput/list',PackagePriceInputAction.list);
    app.post('/packagePriceInput/add',PackagePriceInputAction.add);


    //price audit
    app.post('/priceAudit/:type',PriceAuditAction.updateStatus);
    //file upload
    app.post('/file-upload', FileUploadAction.fileUpload);
    //ticketManagement
    app.get('/ticketManagement',ticketManagementAction.init);
    app.post('/ticketManagement/add',ticketManagementAction.add);
    app.post('/ticketManagement/update/:id',ticketManagementAction.update);
    app.get('/ticketManagement/detail/:id',ticketManagementAction.viewDetail);
    app.get('/ticketManagement/list',ticketManagementAction.list);
    //hotelManagement
    app.get('/hotelManagement',hotelManagementAction.init);
    app.post('/hotelManagement/add',hotelManagementAction.add);
    app.post('/hotelManagement/update/:id',hotelManagementAction.update);
    app.get('/hotelManagement/detail/:id',hotelManagementAction.viewDetail);
    app.get('/hotelManagement/list',hotelManagementAction.list);
    //votureManagement
    app.get('/votureManagement',votureManagementAction.init);
    app.post('/votureManagement/add',votureManagementAction.add);
    app.post('/votureManagement/update/:id',votureManagementAction.update);
    app.get('/votureManagement/detail/:id',votureManagementAction.viewDetail);
    app.get('/votureManagement/list',votureManagementAction.list);
    //ticketPackageManagement
    app.get('/ticketPackageManagement',ticketPackageManagementAction.init);
    app.post('/ticketPackageManagement/add',ticketPackageManagementAction.add);
    app.post('/ticketPackageManagement/update/:id',ticketPackageManagementAction.update);
    app.get('/ticketPackageManagement/detail/:id',ticketPackageManagementAction.viewDetail);
    app.get('/ticketPackageManagement/list',ticketPackageManagementAction.list);
    //packageManagement
    app.get('/packageManagement',packageManagementAction.init);
    app.post('/packageManagement/add',packageManagementAction.add);
    app.post('/packageManagement/update/:id',packageManagementAction.update);
    app.get('/packageManagement/detail/:id',packageManagementAction.viewDetail);
    app.get('/packageManagement/list',packageManagementAction.list);

    //hotelPriceQuery
    app.get('/hotelPriceQuery',hotelPriceQueryAction.init);
    app.get('/hotelPriceQuery/list',hotelPriceQueryAction.list);

    //packagePriceQuery
    app.get('/packagePriceQuery',packagePriceQueryAction.init);
    app.get('/packagePriceQuery/list',packagePriceQueryAction.list);

    //newsManagement
    app.get('/newsManagement',newsManagementAction.init);
    app.post('/newsManagement/add',newsManagementAction.add);
    app.post('/newsManagement/update/:id',newsManagementAction.update);
    app.get('/newsManagement/detail/:id',newsManagementAction.viewDetail);
    app.get('/newsManagement/list',newsManagementAction.list);

    //newsManagementAudit
    app.get('/newsManagementAudit',newsManagementAuditAction.init);
    app.get('/newsManagementAudit/detail/:id',newsManagementAction.viewDetail);
    app.get('/newsManagementAudit/list',newsManagementAuditAction.list);
    app.post('/newsManagementAudit/audit/:id',newsManagementAuditAction.audit);

// rightsManagement
    app.get('/rightsManagement',rightsManagementAction.init);
    app.post('/rightsManagement/save',rightsManagementAction.save);
    app.get('/rightsManagement/list/:id',rightsManagementAction.list);
    app.get('/listMemberByProvider/:providerID',shortListAction.getMemberByProvider);

// orderInput
    app.get('/orderInput',orderInputAction.init);
    app.get('/orderInput/listProductByCity/:cityID',orderInputAction.listProductByCity);
    app.get('/orderInput/getDateRange',orderInputAction.getPriceRange);
    //localhost:3000/orderInput/getDateSelect?productType=package&product=53461e2eb049532e14eb8aa7&effectDate=1397145600000&expiryDate=1399737600000
    app.get('/orderInput/getDateSelect',orderInputAction.getPriceSelect);
    app.post('/orderInput/saveOrder',orderInputAction.saveOrder);
    app.get('/orderInput/list',orderInputAction.list);
    app.post('/orderInput/update/:id',orderInputAction.update);
    app.get('/orderInput/orderDetail/:orderID',orderInputAction.orderDetail);

    app.get('/orderManagement',orderManagement.init);
    app.get('/orderManagement/list',orderManagement.list);
    app.get('/orderManagement/detail',orderManagement.detail);
    app.post('/orderManagement/invoice/update/:orderID',orderManagement.updateInvoice);

    app.get('/memberManagement',memberManagement.init);
    app.get('/memberManagement/list',memberManagement.list);
    app.get('/memberManagement/detail/:id',memberManagement.detail);

   //alipay
    //alipay for web
    app.get('/alipay/reqTrade/:_id/:oid',AlipayWebAction.getReqTrade);
    app.post('/alipay/notify/:id',AlipayWebAction.notify);
    app.get('/alipay/callback/:id',AlipayWebAction.callBack);

    app.all('*',function(req,res){
        res.redirect('/errorPage');
    });

};