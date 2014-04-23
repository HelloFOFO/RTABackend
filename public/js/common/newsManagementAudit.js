$(document).ready(function(){
    var timeZone = ' 00:00:00 +08:00';
    var images=[];
    var productType = 'news';

    $('.date').datepicker({
        "dateFormat": 'yy-mm-dd'
    });

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
                    var html = new EJS({url:"./template/temp_"+productType+"ManagementAudit.ejs"}).render(data);
                    $('#queryResult').html(html);
                }
            });
    };
    //页面初始化的时候刷新表格
    refershDataSet("/"+productType+"ManagementAudit/list",$('#queryForm').serialize());

    //点击编辑按钮
    $('#showEdit').click(function(){
        $('#modalType').html('查看');
        $(this).button("loading");
        var _id = $('#selectedId').val();

        if(""===_id||undefined===_id||_id.length<=0){
            alert("请选择需要查看的公告！");
            $('#showEdit').button("reset");
        }else{
            $.ajax({
                type: "get",
                url: "/"+productType+"Management/detail/"+_id,
                cache:false
            }).done(function(data, textStatus){
                    if(data.error===0){
                        //insert Data
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

    // 点击分页信息的动作
    $('#queryResult').on('click','a',function(e){
        e.preventDefault();
        refershDataSet($(this).attr('href'));
    });
    // 点击查询按钮时候的动作
    $('#query').click(function(e){
        e.preventDefault();
        refershDataSet("/"+productType+"ManagementAudit/list",$('#queryForm').serialize());
    });

    $('body').on('click','#queryResult button',function(e){
        e.stopPropagation();
        var newsID = $(this).parent().parent().attr('id');
        var status = $(this).attr('status');
        $.ajax({
             url:'/newsManagementAudit/audit/'+newsID
            ,method:'POST'
            ,data:{id:newsID,status:status}
        }).done(function(data){
                refershDataSet("/"+productType+"ManagementAudit/list",$('#queryForm').serialize());
            });

        console.log(newsID,status);

    });
});
