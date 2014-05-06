$(document).ready(function(){
    var timeZone = ' 00:00:00 +08:00';
    var images=[];
    var productType = 'member';

//    $('.date').datepicker({
//        "dateFormat": 'yy-mm-dd'
//    } );
    init = function(){
        $('#mobile').val('');
        $('#name').val('');
//        $('#isEnable').val('');
    };

    init();

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

    //点击编辑按钮
    $('#showEdit').click(function(){
        $('#modalType').html('编辑');
        $(this).button("loading");
        var _id = $('#selectedId').val();

        if(""===_id||undefined===_id||_id.length<=0){
            alert("请选择需要查看的会员！");
            $('#showEdit').button("reset");
        }else{
            $.ajax({
                type: "GET",
                url: "/"+productType+"Management/detail/"+_id,
                cache:false
            }).done(function(data, textStatus){
                    if(data.error===0){
                        $('#Modalmobile').val(data.data.mobile);
                        $('#Modalname').val(data.data.name);
                        $('#Modalgender').val(data.data.gender);
                        $('#ModalsiginUpDate').val(data.data.signUpDate);
                        $('#ModalisEnable').val(data.data.isEnable);
                        $('#ModallisencePlate').val(data.data.lisencePlate);
                        $('#Modalage').val(data.data.age);
                        $('#Modalaccompany').val(data.data.accompany);
                        $('#ModallastDestCity').val(data.data.lastDestCity);
                        $('#ModalfavDestCity').val(data.data.favDestCity);
                        $('#ModalintentCity').val(data.data.intentCity);
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

    // 点击分页信息的动作
    $('#queryResult').on('click','a',function(e){
        e.preventDefault();
        refershDataSet($(this).attr('href'));
    });
    // 点击查询按钮时候的动作
    $('#query').click(function(e){
        e.preventDefault();
        console.log("/"+productType+"Management/list",$('#queryForm').serialize());
        refershDataSet("/"+productType+"Management/list",$('#queryForm').serialize());
    });
});
