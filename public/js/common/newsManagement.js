$(document).ready(function(){
    var timeZone = ' 00:00:00 +08:00';
    var images=[];
    var productType = 'news';

    $('.date').datepicker({
        "dateFormat": 'yy-mm-dd'
    } );

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
    //点击新增按钮
    $('#showCreate').click(function(){
        $('#modalType').html('新增');
        $('#title').val('');
        $('#content').val('');
    });
    //点击编辑按钮
    $('#showEdit').click(function(){
        $('#modalType').html('编辑');
        $(this).button("loading");
        var _id = $('#selectedId').val();

        if(""===_id||undefined===_id||_id.length<=0){
            alert("请选择需要修改的公告！");
            $('#showEdit').button("reset");
        }else{
            $.ajax({
                type: "get",
                url: "/"+productType+"Management/detail/"+_id,
                cache:false
            }).done(function(data, textStatus){
                    if(data.error===0){
                        //insert Data
                        //先判断这个公告能不能改，如果是已经上线就不能改了
                        if(data.data.status==2){
                            alert('此公告已上线，无法修改!');
                            return;
                        }if(data.data.status==3){
                            alert('此公告已无法修改!');
                            return;
                        }if(data.data.status==0){
                            alert('此公告已无法修改,还请重新提交!');
                            return;
                        }
                        $('#title').val(data.data.title);
                        $('#content').val(data.data.content);
//                        $('#type').val(data.data.type);
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
    $('#doCreate').click(function(e){
        var postData={};
        postData.title     = $('#title').val();
        postData.content  = $('#content').val();
        postData.type      = $('#type').val();
        postData.isEnable = true;
        postData.status    = 1;
        if($('#modalType').html()=='新增'){
            url = "/"+productType+"Management/add";
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
        return false;
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
});
