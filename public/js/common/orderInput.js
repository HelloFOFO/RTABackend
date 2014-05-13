$(document).ready(function(){

//    var defaultCity = "5343758fd8d3efb068465b2d";
    //初始化默认城市为空
    $('#modalCity option[value=""]').prop('selected',true);

    $('#IsWeekend').prop('checked',true);

    $('.date').datepicker({
        "dateFormat": 'yy-mm-dd'
    });

    //用来储藏套票和打包产品的价格信息 结构如下:
    /***
     * { 2012-01-01 : 200,
     *   2012-02-01 :300,
     *   ...
     *   ...}
     * */
    var priceInfo={};
    var globalModalProductType="";//未选择
    var globalWeekendDef=[];


    var refershDataSet = function(url,data){
        $.ajax(
            {  type: "GET",
                url: url,
                cache:false,
                data:data
            }
        ).done(function(data){
                if(data.error!==0){
                    console.log(data);
                    alert("查询出错！");
                }else{
                    var html = new EJS({url:"./template/temp_orderInput.ejs"}).render(data);
                    $('#queryResult').html(html);
                }
            });
    };

    refershDataSet("/orderInput/list",$('#queryForm').serialize());

    // 点击分页信息的动作
    $('#queryResult').on('click','a',function(e){
        e.preventDefault();
        refershDataSet($(this).attr('href'));
    });


    var resetTicketModal = function(){
        //通用的Reset过程
        $('#modalProduct').empty();
        $('#modalProductName').val('');
        $('#modalAddress').val('');
        $('#modalPrice').val('');
        $('#modalQuantity').val(1);
        $('#modalTotalQuantity').val('');
        $('#modalTotalPrice').val('');
        $('#modalPerson').val('');
        $('#modalMobile').val('');
        $('#modalRemark').val('');

        //把三类产品的日期选择都清空
        $('#modalDateRange').empty;
        $('#modalHotelCheckInDate').val('');
        $('#modalHotelCheckOutDate').val('');
        $('#modalPackageStartDate').val('');
        $('#IsWeekend').prop('checked',true);
        //初始化显示的时候显示门票购买的页面
        $('#ticketDateSelect').show();
        $('#modalIsWeekend').show();
        $('#hotelDateSelect').hide();
        $('#packageDateSelect').hide();
        $('#modalWeekendDef').empty();
    };

    //页面初始化的时候同时也初始化modal
    resetTicketModal();

    var refreshProductList = function(city){
        resetTicketModal();
        if(city!=""){
            $.ajax({
                url:'/orderInput/listProductByCity/'+city
                ,method:'GET'
            }).done(function(data){
                    if(data.error==0){
                        var tableContentStr = "<option value=''>请选择产品</option>";
                        var trStr = "<option value='__productID__|__productType__'>__productName__(__price__)</option>";
                        $.each(data.data,function(index,obj){
                            tableContentStr += trStr.replace(/__productID__/,obj._id).replace(/__productName__/,obj.name).replace(/__price__/,obj.price).replace(/__productType__/,obj.type);
                        });
                        $('#modalProduct').empty().html(tableContentStr);
                    }else{

                    }
                });
        }
    };

    var refreshProductInfo = function(product,productType){
        $.ajax({
            url:'/'+productType+'Management/detail/'+product
            ,method:'GET'
        }).done(function(data){
                $('#modalProductName').val(data.data.name);
                $('#modalAddress').val(data.data.addr);
                $('#modalPrice').val('');
            });
    };

    var refreshTicketDateSelect = function(product,productType){
        $.ajax({
            url:'/orderInput/getDateRange'
            ,method:"GET"
            ,data:{product:product,productType:productType}
        }).done(function(data){
                var tableContentStr = '<option value="|">请选择有效期</option>';
                var trStr = "<option value='__startDate__|__endDate__|__price__|__priceWeekend__|__priceLog__|__weekend__'>__startDate__~__endDate__</option>";
                $.each(data.data,function(index,obj){
                    tableContentStr += trStr.replace(/__startDate__/,obj.startDate)
                        .replace(/__startDate__/,new Date(obj.startDate).Format('yyyy-MM-dd'))
                        .replace(/__endDate__/,obj.endDate)
                        .replace(/__endDate__/,new Date(obj.endDate).Format('yyyy-MM-dd'))
                        .replace(/__price__/,obj.price)
                        .replace(/__priceWeekend__/,obj.priceWeekend)
                        .replace(/__priceLog__/,obj.priceLog)
                        .replace(/__weekend__/,JSON.stringify(obj.weekend));
                });
                $('#modalDateRange').empty().html(tableContentStr);
                console.log(data);
            });
    };

    var refreshHotelDateSelect = function(product,productType){
        //重新初始化priceInfo
        priceInfo={};
        $.ajax({
            url:'/orderInput/getDateSelect'
            ,method:"GET"
            ,data:{product:product,productType:productType}
        }).done(function(data){
                priceInfo = data.priceInfo;
            });
    };

    var refreshPackageDateSelect = refreshHotelDateSelect;

    var getWeekendDef = function(weekend){
        var weekendStr=[];
        if(_.isArray(weekend)){
            $.each(weekend,function(index,data){
                switch (parseInt(data)){
                    case 0:weekendStr.push("周日"); break;
                    case 1:weekendStr.push("周一"); break;
                    case 2:weekendStr.push("周二"); break;
                    case 3:weekendStr.push("周三"); break;
                    case 4:weekendStr.push("周四"); break;
                    case 5:weekendStr.push("周五"); break;
                    case 6:weekendStr.push("周六"); break;
                }
            });
        }
        console.log(weekendStr.join(","));
        return "("+weekendStr.join(",")+")";
    };

    //重新选择日期（$('#modalDateRange').change） 以及 调整产品数量的时候（$('.add,.minus').click） 都会重新计算价格
    var reCalculatePrice = function(productType){
        var quantity  = parseInt($('#modalQuantity').val());
        if(productType=='ticket'||productType=='ticketPackage'){
            var startDate    = $('#modalDateRange').val().split('|')[0];
            var endDate      = $('#modalDateRange').val().split('|')[1];
            var price        = parseInt($('#modalDateRange').val().split('|')[2]);
            var priceWeekend = parseInt($('#modalDateRange').val().split('|')[3]);
            var isWeekend  = $('#IsWeekend').prop('checked');
            if(isWeekend){
                price = priceWeekend;
            }
        }else if(productType=='hotel'){
            var startDate = $('#modalHotelCheckInDate').val();
            var endDate   = $('#modalHotelCheckOutDate').val();
            var price     = -1;
            if( !_.isEmpty(startDate) && !_.isEmpty(endDate) ){
                startDate = new Date(startDate).getTime()-28800000;
                endDate   = new Date(endDate).getTime()-28800000;
                console.log(startDate,endDate);
                while(startDate<endDate){
                    if( priceInfo[startDate] && parseInt(priceInfo[startDate].price)>0){
                        price+=parseInt(priceInfo[startDate].price);
                    }else{
                        price=-1;
                        break;
                    }
                    startDate+=86400000;
                }
            }
        }else if(productType=='package'){
            var price=-1;
            var startDate = $('#modalPackageStartDate').val();
            if(!_.isEmpty(startDate)){
                startDate = new Date($('#modalPackageStartDate').val()).getTime()-28800000;
            }else{
                startDate = 0;
            }
            console.log(startDate,priceInfo,new Date(startDate).getTime());
            if(priceInfo[startDate]){
               if(parseInt(priceInfo[startDate].price)>0){
                   price = priceInfo[startDate].price;
               }
            }
        }

        if(price!=-1){
            $('#modalPrice').val(price);
            $('#modalTotalPrice').val(price*quantity);
        }else{
            $('#modalPrice').val('暂无报价');
            $('#modalTotalPrice').val('暂无报价');
        }
    };

    var saveOrder = function(params){
        $.ajax({
             url:'/orderInput/saveOrder'
            ,method:"POST"
            ,data:params
        }).done(function(data){
                window.location.reload();
            });
    };

    $('#modalCity').change(function(){
        var cityID = $(this).val();
        globalModalProductType="";
        refreshProductList(cityID);
    });

    $('#modalProduct').change(function(){
        //step1 如果是门票，套票，则刷新有效期列表 否则给出日历框
        //step2 给出产品详情
        //reset
        $('#modalPrice').val('');
        $('#modalQuantity').val(1);
        $('#modalTotalPrice').val('');
        $('#modalProductName').val('');
        $('#modalAddress').val('');
        if($(this).val()!=""){
            var product     = $(this).val().split('|')[0];
            var productType = '';
            switch (parseInt($(this).val().split('|')[1])){
                case 1:productType='ticket';break;
                case 2:productType='hotel';break;
                case 4:productType='package';break;
                case 5:productType='ticketPackage';break;
                default : break;
            }
            //设置全局productType
            globalModalProductType = productType;
            //刷新产品基本信息
            refreshProductInfo(product,productType);
            //门票和套票的逻辑
            if(productType=='ticket'||productType=='ticketPackage'){
                $('#ticketDateSelect').show();
                $('#modalIsWeekend').show();
                $('#modalAddressInfo').show();
                $('#hotelDateSelect').hide();
                $('#packageDateSelect').hide();
                $('#modalDateRange').empty();
                console.log(product+'----'+productType);
                //刷新价格有效期信息，并把价格储藏在价格有效期中
                refreshTicketDateSelect(product,productType);
                //酒店的逻辑
            }else if(productType=='hotel'){
                $('#ticketDateSelect').hide();
                $('#modalAddressInfo').show();
                $('#modalIsWeekend').hide();
                $('#hotelDateSelect').show();
                $('#packageDateSelect').hide();
                refreshHotelDateSelect(product,productType);

                //打包产品的逻辑
            }else if(productType=='package'){
                $('#ticketDateSelect').hide();
                $('#modalAddressInfo').hide();
                $('#modalIsWeekend').hide();
                $('#hotelDateSelect').hide();
                $('#packageDateSelect').show();
                refreshPackageDateSelect(product,productType);
            }
        }
    });
    //门票和套票的有效期一旦变动则重新计算价格
    $('#modalDateRange').change(function(){
        if($(this).val()=='|'){
            $('#modalPrice').val('');
            $('#modalQuantity').val(1);
            $('#modalTotalPrice').val('');
            $('#modalWeekendDef').empty();
        }else{
            var weekend = JSON.parse($('#modalDateRange').val().split('|')[5]);
            $('#modalWeekendDef').html(getWeekendDef(weekend));
            reCalculatePrice(globalModalProductType);
        }
    });

    //门票和套票的类型一旦发生变动，也需要重新计算价格
    $('[type=radio]').click(function(){
        reCalculatePrice(globalModalProductType);
    });

    //打包产品的使用日期一旦发生变动
    $('#modalPackageStartDate').change(function(){
        var packageStartDate = $(this).val();
        if(packageStartDate){
            reCalculatePrice(globalModalProductType);
        }else{
            $('#modalPrice').val('');
            $('#modalQuantity').val(1);
            $('#modalTotalPrice').val('');
        }
    });

    //酒店的入住离店日期一旦发生变动
    $('#modalHotelCheckInDate,#modalHotelCheckOutDate').change(function(){
        var hotelCheckInDate  = $('#modalHotelCheckInDate').val();
        var hotelCheckOutDate = $('#modalHotelCheckOutDate').val();
        if(!_.isEmpty(hotelCheckInDate) && !_.isEmpty(hotelCheckOutDate)){
            reCalculatePrice(globalModalProductType);
        }else{
            $('#modalPrice').val('');
            $('#modalQuantity').val(1);
            $('#modalTotalPrice').val('');
        }
    });

    $('.add,.minus').click(function(){
        //如果价格还没有选定，则不能进行数量的筛选
        if(_.isEmpty($('#modalPrice').val())){return;}
        if(globalModalProductType=='ticket'||globalModalProductType=='ticketPackage'){
            var isAdd = $(this).hasClass('add');
            var quantity = parseInt($('#modalQuantity').val());
            if(isAdd){
                if(quantity<100){
                    quantity++;
                }
            }else{
                if(quantity>1){
                    quantity--;
                }
            }
            $('#modalQuantity').val(quantity);
            reCalculatePrice(globalModalProductType);
        }else if(globalModalProductType=='hotel'){

        }else if(globalModalProductType=='package'){

        }
    });

    $('#submitOrder').click(function(){
        if(globalModalProductType==""){alert("请选择产品!");return;}
        if(globalModalProductType=='ticket'||globalModalProductType=='ticketPackage'){
            var product     = $('#modalProduct').val().split('|')[0];
            var productType = $('#modalProduct').val().split('|')[1];
            var startDate   = $('#modalDateRange').val().split('|')[0];
            var endDate     = $('#modalDateRange').val().split('|')[1];
            var payWay      = 1;//单结
            var quantity    =  $('#modalQuantity').val();
            var remark      =  $('#modalRemark').val();
            var liveName    =  $('#modalPerson').val();
            var contactPhone = $('#modalMobile').val();
            var priceLog     = $('#modalDateRange').val().split('|')[4];
            var isWeekend    = $('#IsWeekend').prop('checked');
            var modalTotalPrice = $('#modalTotalPrice').val();
            if(product.length!=24){
                alert('请选择产品');
                return;
            }else if(quantity<0){
                retrun;
            }else if(liveName.length<2){
                alert("请填写完整联系人姓名！");
                return;
            }else if(!contactPhone.match(/\d{11,11}/) || contactPhone.length!=11){
                alert("请填写正确的联系人手机号");
                return;
            }else if(_.isEmpty(modalTotalPrice) || modalTotalPrice=='暂无报价'){
                alert("请选择有效的出行日期！");
                return;
            }
            var params = {
                 product:product
                ,productType:productType
                ,startDate:startDate
                ,endDate:endDate
                ,quantity:quantity
                ,payWay:payWay
                ,remark:remark
                ,liveName:liveName
                ,contactPhone:contactPhone
                ,priceLog:priceLog
                ,isWeekend:isWeekend
            };
            saveOrder(params);

        }else if(globalModalProductType=='hotel'){
            var product     = $('#modalProduct').val().split('|')[0];
            var productType = $('#modalProduct').val().split('|')[1];
            var startDate   = $('#modalHotelCheckInDate').val();
            var endDate     = $('#modalHotelCheckOutDate').val();
            var payWay      = 1;//单结
            var quantity    =  $('#modalQuantity').val();
            var remark      =  $('#modalRemark').val();
            var liveName    =  $('#modalPerson').val();
            var contactPhone = $('#modalMobile').val();
            var priceLog     = $('#modalDateRange').val().split('|')[4];
            var isWeekend    = $('#IsWeekend').prop('checked');
            var modalTotalPrice = $('#modalTotalPrice').val();
            if(product.length!=24){
                alert('请选择产品');
                return;
            }else if(quantity<0){
                return;
            }else if(_.isEmpty(startDate)){
                alert('请选择入住日期！');
                return;
            }else if(_.isEmpty(endDate)){
                alert('请选择离店日期！');
                return;
            }else if(liveName.length<2){
                alert("请填写完整联系人姓名！");
                return;
            }else if(!contactPhone.match(/\d{11,11}/) || contactPhone.length!=11){
                alert("请填写正确的联系人手机号");
                return;
            }else if(_.isEmpty(modalTotalPrice) || modalTotalPrice=='暂无报价'){
                alert("请选择有效的出行日期！");
                return;
            }
            var params = {
                 product:product
                ,productType:productType
                ,startDate:startDate
                ,endDate:endDate
                ,quantity:quantity
                ,payWay:payWay
                ,remark:remark
                ,liveName:liveName
                ,contactPhone:contactPhone
            };
            saveOrder(params);
        }else if(globalModalProductType=='package'){
            var product     = $('#modalProduct').val().split('|')[0];
            var productType = $('#modalProduct').val().split('|')[1];
            var startDate   = $('#modalPackageStartDate').val();
            var endDate     = 0;
            var payWay      = 1;//单结
            var quantity    =  $('#modalQuantity').val();
            var remark      =  $('#modalRemark').val();
            var liveName    =  $('#modalPerson').val();
            var contactPhone = $('#modalMobile').val();
            var modalTotalPrice = $('#modalTotalPrice').val();
            if(product.length!=24){
                alert('请选择产品');
                return;
            }else if(_.isEmpty(startDate)){
                alert('请选择使用日期！');
                return;
            }else if(quantity<0){
                return;
            }else if(liveName.length<2){
                alert("请填写完整联系人姓名！");
                return;
            }else if(!contactPhone.match(/\d{11,11}/) || contactPhone.length!=11){
                alert("请填写正确的联系人手机号");
                return;
            }else if(_.isEmpty(modalTotalPrice) || modalTotalPrice=='暂无报价'){
                alert("请选择有效的出行日期！");
                return;
            }
            var params = {
                 product:product
                ,productType:productType
                ,startDate:startDate
                ,quantity:quantity
                ,payWay:payWay
                ,remark:remark
                ,liveName:liveName
                ,contactPhone:contactPhone
            };
            saveOrder(params);
        }
    });


    //更新订单状态
    var updateOrderStatus = function(orderID,status){
        $.ajax({
            url:"/orderInput/update/"+orderID
            ,method:"POST"
            ,data:{status:status}
        }).done(function(data){
                if(data.error==0){
                    return true;
                }else{
                    console.log(data);
                    return false;
                }
            }).fail(function(data){
                console.log(data);
                return false;
            });
    };

    var viewOrder = function(orderID){
        $.ajax({
             url:'/orderInput/orderDetail/'+orderID
            ,method:'GET'
        }).done(function(data){
                if(data.error==0){
                    $('#modalViewCity').val(data.data.product.city.name);
                    $('#modalViewProductName').val("["+data.data.product.type+"] "+data.data.product.name);
                    $('#modalViewAddress').val(data.data.product.address);
                    $('#modalViewUseDate').val(data.data.useDate);
                    $('#modalViewQuantity').val(data.data.quantity);
                    $('#modalViewTotalPrice').val(data.data.totalPrice);
                    $('#modalViewPerson').val(data.data.liveName);
                    $('#modalViewMobile').val(data.data.contactPhone);
                    $('#modalViewRemark').val(data.data.remark);
                    $('#productViewOrder').modal({show:true});
                    console.log(data.data.useDate);
                }else{
                    console.log(data);
                }
            }).fail(function(data){
                console.log(data);
            });



    };

    //更新订单状态
    $('#queryResult').on('click','button',function(e){
        var status  = parseInt($(this).attr('status'));
        var orderID = $(this).parent().parent().attr('id');
        if(status==1){
            //进行支付
            var oid = $(this).parent().parent().find('td').first().text().trim();
            window.open('/alipay/reqTrade/'+orderID+'/'+oid);
        }else if(status==3){
            //进行取消
            updateOrderStatus(orderID,status);
            location.reload();
        }else if(status==-1){
            //进行查看
            viewOrder(orderID);
        }
    });

    //订单查询
    $('#query').click(function(e){
        e.preventDefault();
        refershDataSet("/orderInput/list",$('#queryForm').serialize());
    });





});
