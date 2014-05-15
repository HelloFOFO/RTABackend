$(document).ready(function(){
    var productType="weiXinFeedback";
    var resetQueryForm = function(){
        $('#queryForm').get(0).reset();
    };
    resetQueryForm();

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

    //点击查询按钮的动作
    $('#query').click(function(e){
        e.preventDefault();
        refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    });

    //点击处理维权的按钮
    $('#queryResult').on('click','button',function(e){
        var openID     = $(this).parent().parent().attr('openID');
        var feedbackID = $(this).parent().parent().attr('feedbackID');
        $.ajax({
            url:'/weiXinFeedbackManagement/update/'+feedbackID,
            method:'POST',
            data:{openID:openID}
        }).done(function(data){
                if(data.error==0){
                    refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
                }else{
                    alert("失败:"+data.errorMsg);
                }
            });
    });

});