$(document).ready(function(){
    var productType="order";

    var resetQueryForm = function(){
       $('#queryForm').get(0).reset();
    };
    resetQueryForm();
    //刷新分页以及表格数据
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
                    var html = new EJS({url:"./template/temp_"+productType+"Management.ejs"}).render(data);
                    $('#queryResult').html(html);
                }
            });
    };

    refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());

    // 点击分页信息的动作
    $('#queryResult').on('click','a',function(e){
        e.preventDefault();
        refershDataSet($(this).attr('href'));
    });

    var getProductStr=function(city,productType,productName,useDate,price,cost){
        var productStr =  '<div class="productInfoBody">'+
                                '<div class="form-group">'+
                                    '<label class="col-md-3 control-label" >产品:</label>'+
                                    '<div class="col-md-8"> <input class="form-control" type="text" value="[__CITY__]  __PRODUCTNAME__" readonly> </div>'+
                                '</div>'+
                                '<div  class="form-group">'+
                                    '<label class="col-md-3 control-label" >使用日期:</label>'+
                                    '<div class="col-md-8"> <input class="form-control" type="text" value="__USETIME__" readonly> </div>'+
                                '</div>'+
                                '<div  class="form-group">'+
                                    '<label class="col-md-3 control-label" >售价:</label>'+
                                    '<div class="col-md-2"> <input class="form-control" type="text" value="__PRICE__" readonly> </div>'+
                                    '<label class="col-md-1 control-label" >底价:</label>'+
                                    '<div class="col-md-2"> <input class="form-control" type="text" value="__COST__" readonly> </div>'+
                                '</div>'+
                           '</div>';
        productStr = productStr.replace(/__CITY__/,city)
            .replace(/__PRODUCTTYPE__/,productType)
            .replace(/__PRODUCTNAME__/,productName)
            .replace(/__USETIME__/,useDate)
            .replace(/__PRICE__/,price)
            .replace(/__COST__/,cost);
        return productStr;
    };
    //修改订单状态
    var updateOrder = function(status,orderID,opRemark){
        var data={
            status:status
            ,opRemark:opRemark
        };
        $.ajax({
            url:"/orderInput/update/"+orderID
            ,method:"POST"
            ,data:data
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

    $('#queryResult').on('click','button',function(){
        var orderID = $(this).parent().parent().attr('id');
        if($(this).html().trim()=="取消"){
            console.log('do cancel order');
            updateOrder(3,orderID,"手动取消");
            refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
            return;
        }
        $.ajax({
             url:'/orderManagement/detail'
            ,data:{orderID:orderID}
            ,method:"GET"
        }).done(function(data){
                $('#modalProductInfo').empty();
                var orderStatus = data.data.status;
                var orderProductType = data.data.product.type;
                var productStr="";
                var isWeekend = "";
                if(orderStatus==1){
                    //已支付
                    $('#updateOrder').show();
                    $('#updateOrder').html('确认订单');
                    $('#updateOrder').attr('status',"2");
                }else if(orderStatus==2){
                    //已确认
                    $('#updateOrder').show();
                    $('#updateOrder').html('退款');
                    $('#updateOrder').attr('status',"4");

                }else if(orderStatus==0 || orderStatus==3 || orderStatus==4){
                    //未支付 已取消  已退款

                    console.log('test');
                    $('#updateOrder').hide();
                }
                if(!(data.data.isWeekend === undefined)){
                    isWeekend = data.data.isWeekend?"(周末票)":"(平日票)";
                }
                //罗列子产品的信息
                $.each(data.data.subOrder,function(index,data){
                     var city        = data.product.city.name;
                     var productName = data.product.name;
                     var productType = data.product.type;
                     var price       = data.price.price;
                     var cost        = data.price.cost;
                     var useTime     = "";
                    //ticket or voture or ticketPackage
                    if( (data.product.type==1 || data.product.type==3 || data.product.type==5) && orderProductType!=4 ){
                        var startDate = data.price.startDate;
                        var endDate   = data.price.endDate;
                        if(_.isNumber(startDate) && _.isNumber(endDate)){
                            useTime = new Date(startDate).Format("yyyy-MM-dd") + "~" + new Date(endDate).Format("yyyy-MM-dd");
                        }
                        useTime += isWeekend;
                        //hotel = 2
                    }else if(data.product.type==2 || orderProductType==4 ){
                        var startDate = data.price.date;
                        if(_.isNumber(startDate)){
                            useTime = new Date(startDate).Format("yyyy-MM-dd");
                        }
                    }
                     productStr  += getProductStr(city,productType,productName,useTime,price,cost);
                });
                $('#modalProductInfo').append(productStr);
                $('#modalOrderID').val(data.data.orderID);
                $('#updateOrder').attr('order_id',data.data._id);
                $('#modalOrderDate').val(new Date(data.data.orderDate).Format("yyyy-MM-dd hh:mm"));
                $('#modalPerson').val(data.data.liveName);
                $('#modalMobile').val(data.data.contactPhone);
                $('#modalMemberName').val(data.data.member.name);
                $('#modalMemberMobile').val(data.data.member.mobile);

                if(!_.isEmpty(data.data.invoice)){
                   $('.modalInvoiceInfo').show();
                   $('#modalInvoiceStatus').attr('status',data.data.invoice.status);
                   $('#modalInvoiceType').val(data.data.invoice.types);
                   $('#modalInvoiceTitle').val(data.data.invoice.title);
                   $('#modalInvoiceAddr').val(data.data.invoice.address);
                   $('#modalInvoiceNum').val(data.data.invoice.num?data.data.invoice.num:"");
                   if(data.data.invoice.status==0 ){
                        //未开
                        $('#modalInvoiceStatus').html('开票').removeClass('btn-danger').addClass('btn-primary');
                        $('#modalInvoiceNum').prop('readonly',false);
                   }else if(data.data.invoice.status==1){
                       //已开
                       $('#modalInvoiceStatus').html('作废').removeClass('btn-primary').addClass('btn-danger');
                       $('#modalInvoiceNum').prop('readonly',true);
                   }
                }else{
                    $('.modalInvoiceInfo').hide();
                }
                $('#productOrder').modal({show:true});
            });
    });



//订单确认页中的订单确认
    $('#updateOrder').click(function(){
        var status   = $('#updateOrder').attr('status');
        var orderID  = $('#updateOrder').attr('order_id');
        var opRemark = $('#modalOperatorRemark').val();
        updateOrder(status,orderID,opRemark);
        refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    });

    $('#modalInvoiceStatus').click(function(e){
        var invoiceStatus = parseInt($(this).attr("status"));
        var order_id = $('#updateOrder').attr('order_id');
        if(invoiceStatus==0){
        //未开
            var num = $('#modalInvoiceNum').val();
            if(_.isEmpty(num)){
                alert('请填写发票号!');
                e.preventDefault();
                return;
            }
            $.ajax({
                url:'/orderManagement/invoice/update/'+order_id
                ,method:"POST"
                ,data:{status:invoiceStatus+1,num:num}
            }).done(function(data){
                    if(!data.error==0){
                        alert("保存出错！请联系管理员!");
                        console.log(data);
                    }else{
                        $('#modalInvoiceStatus').html('作废').removeClass('btn-primary').addClass('btn-danger');
                        $('#modalInvoiceNum').prop('readonly',true);
                        $('#modalInvoiceStatus').attr('status',1);
                    }
                });
        }else if(invoiceStatus==1){
            //已开
            $.ajax({
                 url:'/orderManagement/invoice/update/'+order_id
                ,method:"POST"
                ,data:{status:invoiceStatus+1}
            }).done(function(data){
                    if(!data.error==0){
                        alert("保存出错！请联系管理员!");
                        console.log(data);
                    }else{
                        $('#modalInvoiceStatus').html('开票').removeClass('btn-danger').addClass('btn-primary');
                        $('#modalInvoiceNum').prop('readonly',false);
                        $('#modalInvoiceStatus').attr('status',0);
                    }
                });
        }
        e.preventDefault();
    });

    //点击查询按钮的动作
    $('#query').click(function(e){
        e.preventDefault();
        refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    });

});