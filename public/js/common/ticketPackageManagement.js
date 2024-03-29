$(document).ready(function(){
    var images=[];
    var productType="ticketPackage";

    $('#isEnable').bootstrapSwitch();
    $('.date').datepicker({
        "dateFormat": 'yy-mm-dd'
    });

    var resetModal = function(){
        $('#imgintro').val('');
        $('#image').val('');//隐藏的用来读图片的文字串置空
        $('#imgPreview').empty();
        $('#name').val('');
        $('#content').val('');
        $('#intro').val('');
        $('#addr').val('');
        $('#lat').val('')+','+$('#lon').val('');
        $('#level').val('');
        $('#openTime').val('');
        $('#bookRule').val('');
        $('#useRule').val('');
        $('#cancelRule').val('');
        $('#transportation').val('');
        $('#effectDate').val('');
        $('#expiryDate').val('');
        $('#contactName').val('');
        $('#tel').val('');
        $('#fax').val('');
        $('#subType').val('');
        $('#isEnable').bootstrapSwitch('state',true);
    };

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
    //页面初始化的时候刷新表格
    refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    //读取relateProductInfo信息
    var readRelateProductInfo = function(){
        var relatedProductID = [];
        $('#relateProductInfo .subProductInfo').each(function(index,data){
            var productID   = $(this).find('.productIDInfo').attr('id');
            var day = $(this).find('.productDayInfo').attr('productDay');
            var qty = $(this).find('.productQtyInfo').attr('productQTY');
            relatedProductID.push( {'product' : productID , 'day' : day , 'qty' : qty } );
        });
        return JSON.stringify(relatedProductID);
    };
    //刷新产品信息
    var refreshProductInfo = function(){
        $('#content').val('');
        $('#intro').val('');
        $('#bookRule').val('');
        $('#useRule').val('');
        $('#cancelRule').val('');
        $('#relateProductInfo .subProductInfo').each(function(index,data){
            var productID   = $(this).find('.productIDInfo').attr('id');
            var productType = $(this).find('.productIDInfo').attr('productType');
            console.log(productID,productType);
            $.ajax({
                method:'GET'
                ,url:'/__PRODUCTTYPE__Management/detail/__ID__'.replace(/__PRODUCTTYPE__/,productType).replace(/__ID__/,productID)
                ,async:false
            }).done(function(data){
                    //insert Data
                    $('#content').val($('#content').val()+data.data.content+"\n");
                    $('#intro').val($('#intro').val()+data.data.intro+"\n");
//                    if(undefined!==data.data.city){
//                        $("#city option[value='"+data.data.city._id+"']").attr("selected",true);
//                    }
                    $('#bookRule').val($('#bookRule').val()+data.data.bookRule+"\n");
                    $('#useRule').val($('#useRule').val()+data.data.useRule+"\n");
                    $('#cancelRule').val($('#cancelRule').val()+data.data.cancelRule+"\n");
                });
        });
    };
    //刷新关联产品信息
    var resetSubProductInfo = function(){
        $('#subProductName').val('');
        $('#subProductQty').val('');
        $('#subProductName').data('subProductID','');
    };
    //重置打包产品modal中的信息
    var resetpackageProductInfo = function(){
        resetSubProductInfo();
        $('#relateProductInfo').empty();
        $('#name').val("");
        $('#content').val("");
        $('#intro').val("");
        $('#bookRule').val("");
        $('#useRule').val("");
        $('#cancelRule').val("");
        $('#isEnable').bootstrapSwitch('state',true);
    };
    //传入关联产品信息后，填充关联产品信息的表格
    var addRelatedProductInfo = function(productType,subProductName,subProductID,subProductQty,subProductDay,isEdit){
        //每点击一次做一次信息填充

        //把以上的基本信息填充到显示表格中 __DAY__ __PRODUCTTYPE__  __PRODUCTID__  __QTY__  __PRODUCTNAME__
        var str =  '<div class="subProductInfo form-group">'+
            '<label class="col-md-2 control-label col-md-offset-2 productDayInfo" productDay="__DAY__">第__DAY__天</label>' +
            '<label class="col-md-2 control-label productIDInfo" id="__PRODUCTID__" productType="__PRODUCTTYPE__">__PRODUCTNAME__</label>' +
            '<label class="col-md-2 control-label productQtyInfo" productQTY="__QTY__">__QTY__</label>' +
            '__DELETEBUTTON__'
        '</div>';
        var delButtonStr =  '<div class="col-md-1">' +
            '<button class="btn btn-danger subProductDel">删除</button>' +
            '</div>';

        str=str.replace(/__DAY__/g,subProductDay)
            .replace(/__PRODUCTNAME__/,subProductName)
            .replace(/__QTY__/g,subProductQty)
            .replace(/__PRODUCTID__/,subProductID)
            .replace(/__PRODUCTTYPE__/,productType);
        if(isEdit == true){
            str = str.replace(/__DELETEBUTTON__/,delButtonStr);
        }else{
            str = str.replace(/__DELETEBUTTON__/,"");
        }
        $('#relateProductInfo').append(str);
    };
    //点击新增按钮
    $('#showCreate').click(function(){
        $('#modalType').html('新增');
        resetModal();
    });
    //点击编辑按钮
    $('#showEdit').click(function(){
        $('#modalType').html('编辑');
        $(this).button("loading");
        var _id = $('#selectedId').val();

        if(""===_id||undefined===_id||_id.length<=0){
            alert("请选择需要编辑的产品！");
            $('#showEdit').button("reset");
        }else{
            $.ajax({
                type: "get",
                url: "/"+productType+"Management/detail/"+_id,
                cache:false
            }).done(function(data, textStatus){
                    if(data.error===0){

                        //insert Data
                        $('#name').val(data.data.name);
                        $('#isHot').prop('checked',data.data.isHot);
                        $('#content').val(data.data.content);
                        $('#intro').val(data.data.intro);
//                        $('#imgPreview').empty();
//                        $.each(data.data.image,function(index,value){
//                            addImage(value);
//                        });
                        if(undefined!==data.data.city){
                            $("#city option[value='"+data.data.city._id+"']").prop("selected",true);
                        }
//                        console.log(data.data.relatedProductID);
                        data.data.relatedProductID.forEach(function(d){
                            addRelatedProductInfo("", d.product.name, d.product._id, d.qty, d.day,false);
                            console.log('a');
                        });
                        $('#addr').val(data.data.addr);
                        $('#lat').val(data.data.gps.lat);
                        $('#lon').val(data.data.gps.lon);
                        $('#level').val(data.data.level);
                        $('#openTime').val(data.data.openTime);
                        $('#bookRule').val(data.data.bookRule);
                        $('#useRule').val(data.data.useRule);
                        $('#cancelRule').val(data.data.cancelRule);
                        $('#transportation').val(data.data.transportation);
                        var newEffectDate = new Date(data.data.effectDate).Format('yyyy-MM-dd');
                        $('#effectDate').val(newEffectDate);
                        var newExpiryDate = new Date(data.data.expiryDate).Format('yyyy-MM-dd');
                        $('#expiryDate').val(newExpiryDate);
                        $('#isEnable').bootstrapSwitch('state',data.data.isEnable);
                        $('#contactName').val(data.data.contactName);
                        $('#tel').val(data.data.tel);
                        $('#fax').val(data.data.fax);
                        $('#subType option[value="'+data.data.subType+'"]').prop("selected",true);
//                     $('#type').val(data.data.type);
//                    $('#subType').val(data.data.subType);
//                    $('#operatorName').val(data.data.operatorName);
//                    把数据填充完毕以后再显示详情
                        $('#createModal').modal("show");
//                    console.log(data);
                    }else{
                        alert("获取详情出错："+data.errMsg);
                    }
                }).fail(function(){
                    alert("网络异常，请重试！");
                }).always(function(){
                    $('#showEdit').button("reset");
                });
        }
    });

    //点击modal框中的保存按钮
    var saveProduct = function(){
        var postData={};
        postData.name     = $('#name').val();
        postData.isHot     = $('#isHot').prop('checked');
        postData.content  = $('#content').val();
        postData.intro       = $('#intro').val();
        postData.city        = $('#city option:selected').val();
        postData.addr        =$('#addr').val();
        postData.gps         =$('#lat').val()+','+$('#lon').val();
        postData.level       =$('#level').val();
        postData.openTime    =$('#openTime').val();
        postData.bookRule    =$('#bookRule').val();
        postData.useRule     =$('#useRule').val();
        postData.cancelRule  =$('#cancelRule').val();
        postData.transportation =$('#transportation').val();
        postData.effectDate       =  $('#effectDate').val();
        postData.expiryDate       = $('#expiryDate').val();
        postData.isEnable           = $('#isEnable').bootstrapSwitch('state').toString();
        postData.contactName        =$('#contactName').val();
        postData.tel                =$('#tel').val();
        postData.fax                =$('#fax').val();
        postData.subType      = $('#subType').val();
        console.log(JSON.stringify(postData));
        if($('#modalType').html()=='新增'){
            url = "/"+productType+"Management/add";
            postData.relatedProductID = readRelateProductInfo();
        }else{
            url =  "/"+productType+"Management/update/"+$('#selectedId').val();
        }
        console.log(url);
        $.ajax({
            type: "post",
            url: url,
            cache:false,
            data:postData
        }).done(function(data, textStatus){
                if(data.error!=0){
                    alert("错误："+ data.errorMsg);
                }else{
                    location.reload();
                }
            }).fail(function(){
                alert("网络异常，请重试！");
                $('#doCreate').button("reset");
            });
    };

    //点击modal框中的保存按钮
    $('#modalForm').validate({
        rules:{
            name:{ required: true  }
        },
        messages:{
            name:{required:"产品名称为必填！"}
        },
        submitHandler:function(form){
            saveProduct();
        }
    });

    //Modal中 选择产品的autocomplete逻辑
    $('#subProductName').autocomplete({
        source:function(req,res){
            $.ajax({
                method:'GET',
                url:'/getProductNames/'+$('#subProductType').val(),
                data:{city:$('#subProductCity').val(),
                    name:req.term}
            }).done(function(data){
                    res(data);
                });
        }
        ,minLength:0
        ,appendTo:'#subProductPreSelect'
        ,select:function(event,ui){
            event.preventDefault();
            $('#subProductName').val(ui.item.label);
            $('#subProductName').data( "subProductID", ui.item.value );
        }
    }).focus(function() {
            $(this).autocomplete("search", "");
        });
    //在添加关联产品的选择条件改变的时候清空产品名称和产品数量
    $('#subProductCity , #subProductType , #subProductName').change(function(){
        resetSubProductInfo();
    });
    //确认添加关联产品的逻辑
    $('#addProduct').click(function(){
        var productType    = $('#subProductType').val();
        var subProductName = $('#subProductName').val();
        var subProductID   = $('#subProductName').data('subProductID');
        var subProductQty  = $('#subProductQty').val();
        var subProductDay  = $('#subProductDay').val();
        if( _.isEmpty(subProductID) || _.isEmpty(subProductQty) ){
            alert("请填写完整!");
            return;
        }
        addRelatedProductInfo(productType,subProductName,subProductID,subProductQty,subProductDay,true);
        refreshProductInfo();
    });
    //点击删除关联产品的按钮的动作
    $('#relateProductInfo').on('click','.subProductDel',function(){
        $(this).parent().parent().remove();
        refreshProductInfo();
    });
    // 点击分页信息的动作
    $('#queryResult').on('click','a',function(e){
        e.preventDefault();
        refershDataSet($(this).attr('href'));
    });
    // 点击查询按钮时候的动作
    $('#query').click(function(e){
        e.preventDefault();
        refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    });

    //产品预览
    $('#showDetail').click(function(){
        var productID = $('#selectedId').val();
        if(productID!=""){
            window.open('http://dd885.com/productDetail/'+productID);
        }else{
            alert("请先选择要预览的产品");
        }
    });
});
