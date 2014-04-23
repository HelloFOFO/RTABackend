/**
 * Created by cloudbian on 14-3-14.
 */
//save or update provider
$(document).ready(function() {
    $('#isEnable').bootstrapSwitch();
    $('#selectedId').val("");

    $('#providerForm').validate({
        rules:{
            name:{ required: true }
        },
        messages:{
            name:{ required: "分销商名称为必填！" }
        },
        submitHandler:function(form){
            addProvider();
        }
    });

    var addProvider = function(){
        var url;
        $('#createProvider').button("loading");
        if("save"===$('#tabActive').val()){
            url = "/agentManagement/add";
        }else{
            url =  "/agentManagement/update/"+$('#selectedId').val();
        }
        var params = $('#providerForm').serialize();
        params+='&isEnable='+$('#isEnable').bootstrapSwitch('state').toString();
        $.ajax({
            type: "post",
            url: url,
            cache:false,
            data:params
        }).done(function(data, textStatus){
                if(data.error!==0){
                    alert("保存分销商错误："+data.errMsg);
                }else{
                    $('#createProviderModal').modal("toggle");
                    refreshTable(1);
                }
            }).always(function(XMLHttpRequest, textStatus){
                $('#createProvider').button("reset");
            }).fail(function(){
                alert("网络异常，请重试！");
            });
    };

//show create dailog
    $('#showCreate').click(function(e){
        $('#tabActive').val("save");
        $('#modifyType').empty().html('新增');
        $('#providerForm')[0].reset();
        $('#operatorName').val($('#uName').val());
//    $('#isEnable').bootstrapSwitch('state',true);
    });

//show edit dailog
    $('#showEdit').click(function(e){
        $('#tabActive').val("update");
        $('#modifyType').empty().html('编辑');
        $(this).button("loading");
        $('#createProviderModal').modal("hide");
        var _id = $('#selectedId').val();
        if(""===_id||undefined===_id||_id.length<=0){
            alert("请选择需要编辑的分销商！");
            $('#showEdit').button("reset");
        }else{
            $.ajax({
                type: "post",
                url: "/agentManagement/detail",
                cache:false,
//            dataType:"json",
                data:{id:_id},
                success: function(data, textStatus){
                    if(data.error===0){
                        $('#name').val(data.data.name);
                        $('#contactName').val(data.data.contactName);
                        $('#contactEmail').val(data.data.contactEmail);
                        $('#contactPhone').val(data.data.contactPhone);
                        $('#proCode').val(data.data.proCode);
                        $('#balanceType').val(data.data.balanceType);
                        $('#returnType').val(data.data.returnType);
                        $('#remark').val(data.data.remark);
                        $('#isEnable').bootstrapSwitch('state',data.data.isEnable);
                        $('#operatorName').val($('#uName').val());
                    }else{
                        alert("获取详情出错："+data.errMsg);
                    }
                },
                complete: function(XMLHttpRequest, textStatus){
                    //HideLoading();
                    $('#createProviderModal').modal("show");
                    $('#showEdit').button("reset");
                },
                error: function(){
                    //请求出错处理
                    alert("网络异常，请重试！");
                }
            });
        }
    });

//refresh paginator
    function refreshPaginator(currentPage,totalPage){
        var opt = {
            //paginator
            bootstrapMajorVersion:3,
            currentPage:currentPage,
            totalPages:totalPage,
            size:"normal",
            alignment:"left",
            onPageClicked:function(event, originalEvent, type, page){
                refreshTable(page);
            }
        };
        $('#pageDiv').bootstrapPaginator(opt);
    }

//refresh table and paginator
    function refreshTable(currentPage){
        //refresh table
        $.ajax({
            type: "post",
            url: "/agentManagement/list",
            cache:false,
//            dataType:"json",
            data:{current:currentPage},
            success: function(data, textStatus){
                var html = new EJS({url:"./template/temp_agentManagement.ejs"}).render(data);
                $('#tblcontent').html(html);
                refreshPaginator(data.currentPage,data.totalPage);
            },
            complete: function(XMLHttpRequest, textStatus){
                //HideLoading();
            },
            error: function(e){
                //请求出错处理
                alert("网络异常，请重试！");
            }
        });
    }
    } );

