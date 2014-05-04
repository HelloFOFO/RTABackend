$(document).ready(function(){
    var images=[];
    var productType = 'ticket';
    //清空页面
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
                    alert("查询出错！");
                }else{
                    var html = new EJS({url:"./template/temp_"+productType+"Management.ejs"}).render(data);
                    $('#queryResult').html(html);
                }
            });
    };
    //页面初始化的时候刷新表格
    refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    //添加图片的逻辑
    var addImage = function(imgObj){
        var intro = imgObj.intro;
        var url = imgObj.url;
        var str = '<li class="col-md-4">' +
            '<div class="titleBar">__srcFileName__</div>'+
            '<a id="__upyunFileName__" href="http://dd885.b0.upaiyun.com/__upyunFileName__">' +
            '<img src="http://dd885.b0.upaiyun.com/__upyunFileName__!preview" class="" alt="__srcFileName__">' +
            '</a>' +
            '<div class="deleteBar">删除</div>'
        '</li>';//__srcFileName__
        str = str.replace(/__upyunFileName__/g,url).replace(/__srcFileName__/,intro);
        $('#imgPreview').append(str);
    };
    //读取图片的逻辑
    var readImage = function(){
        var imageStr = [];
        $('#imgPreview > li').each(function(){
            var imgName = $(this).find('.titleBar').html();
            var imgId   = $(this).find('a').attr('id');
            imgName = imgName.replace(/:/,'').replace(/,/,'');
            imgId   = imgId.replace(/:/,'').replace(/,/,'');
            imageStr.push(imgId+':'+imgName);
        });
        return imageStr==[]?"":imageStr.join(',');

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
                        $('#imgPreview').empty();
                        $.each(data.data.image,function(index,value){
                            addImage(value);
                        });
                        if(undefined!==data.data.city){
                            $("#city option[value='"+data.data.city._id+"']").prop("selected",true);
                        }
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
                        $('#type').val(data.data.type);
                        if(undefined!==data.data.subType){
                            $('#subType option[value="'+data.data.subType+'"]').prop("selected",true);
                        }
//                    把数据填充完毕以后再显示详情
                        $('#createModal').modal("show");
                    console.log(data.data.subType);
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
    //点击modal框中的图片上传
    $('#doUpload').click(function(e){
        e.preventDefault();
        var formData = new FormData($('#fileuploadform')[0]);
        var picName  = $('#imgintro').val();
        $.ajax({
            url: '/file-upload',  //server script to process data
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data){
                if(data.error==0){
                    picName = (picName==""?data.srcFileName:picName);
                    addImage({intro:picName,url:data.upyunFileName});
                }else{
                    console.log("上传失败！");
                    alert("上传失败！");
                }
            });
    });
    //点击modal框中的删除图片按钮
    $('#imgPreview').on('click','.deleteBar',function(e){
        $(this).parent().remove();
    });


//    $('#doCreate').click(function(e){
//        var postData={};
//        postData.name     = $('#name').val();
//        postData.content  = $('#content').val();
//        postData.intro       = $('#intro').val();
//        postData.image       = readImage();
//        postData.city        = $('#city option:selected').val();
//        postData.addr        =$('#addr').val();
//        postData.gps         =$('#lat').val()+','+$('#lon').val();
//        postData.level       =$('#level').val();
//        postData.openTime    =$('#openTime').val();
//        postData.bookRule    =$('#bookRule').val();
//        postData.useRule     =$('#useRule').val();
//        postData.cancelRule  =$('#cancelRule').val();
//        postData.transportation =$('#transportation').val();
//        postData.effectDate     =  $('#effectDate').val();
//        postData.expiryDate     =  $('#expiryDate').val();
//        postData.isEnable           = $('#isEnable').bootstrapSwitch('state').toString();
//        postData.contactName        =$('#contactName').val();
//        postData.tel                =$('#tel').val();
//        postData.fax                =$('#fax').val();
//        postData.subType      = $('#subType').val();
//        console.log(JSON.stringify(postData));
//        if($('#modalType').html()=='新增'){
//            url = "/"+productType+"Management/add";
//        }else{
//            url =  "/"+productType+"Management/update/"+$('#selectedId').val();
//        }
//        $.ajax({
//            type: "post",
//            url: url,
//            cache:false,
//            data:postData
//        }).done(function(data, textStatus){
//                if(data.error!=0){
//                    alert("错误："+ data.errorMsg);
//                }else{
//                    location.reload();
//                }
//            }).fail(function(){
//                alert("网络异常，请重试！");
//                $('#doCreate').button("reset");
//            });
//    });

    //保存门票信息
    var saveProduct = function(){
        var postData={};
        postData.name     = $('#name').val();
        postData.isHot     = $('#isHot').prop('checked');
        postData.content  = $('#content').val();
        postData.intro       = $('#intro').val();
        postData.image       = readImage();
        postData.city        = $('#city option:selected').val();
        postData.addr        =$('#addr').val();
        postData.gps         =$('#lat').val()+','+$('#lon').val();
        postData.level       =$('#level').val();
        postData.openTime    =$('#openTime').val();
        postData.bookRule    =$('#bookRule').val();
        postData.useRule     =$('#useRule').val();
        postData.cancelRule  =$('#cancelRule').val();
        postData.transportation =$('#transportation').val();
        postData.effectDate     =  $('#effectDate').val();
        postData.expiryDate     =  $('#expiryDate').val();
        postData.isEnable           = $('#isEnable').bootstrapSwitch('state').toString();
        postData.contactName        =$('#contactName').val();
        postData.tel                =$('#tel').val();
        postData.fax                =$('#fax').val();
        postData.subType      = $('#subType').val();
        console.log(JSON.stringify(postData));
        if($('#modalType').html()=='新增'){
            url = "/"+productType+"Management/add";
        }else{
            url =  "/"+productType+"Management/update/"+$('#selectedId').val();
        }
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
            ,lat:{number:true}
            ,lon:{number:true}
            ,level:{number:true}
        },
        messages:{
            name:{required:"产品名称为必填！"}
            ,lat:{number:"必须为数字"}
            ,lon:{number:"必须为数字"}
            ,level:{number:"必须为数字"}
        },
        submitHandler:function(form){
            saveProduct();
        }
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
       var productID = $('selectedId').val();
       window.open('http://dd885.com/productDetail/'+productID);
    });
});
