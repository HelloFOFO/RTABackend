/**
 * Created by cloudbian on 14-3-14.
 */

$('body').on('click','.myTable tbody tr',function(){
    if($(this).hasClass('selected')){
        $(this).removeClass('selected');
        $('#selectedId').val("");
    }else{
        $(this).parent().children('tr.selected').removeClass('selected');
        $(this).addClass('selected');
//        console.log($(this).attr("id"));
        $('#selectedId').val($(this).attr("id"));
    }
});


Date.prototype.Format = function (fmt) { //author: wucho
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


//nav 的逻辑
$(document).ready(function(){
    var currentPath = window.location.pathname;
//    $('a[href="__PATH__"]'.replace(/__PATH__/,currentPath)).addClass('active');
    $('a[href="__PATH__"]'.replace(/__PATH__/,currentPath)).parent().parent().addClass('in');
    $('a[href="__PATH__"]'.replace(/__PATH__/,currentPath)).parent().parent().parent().addClass('active');



    $('#changePassword').click(function(e){
//        console.log($('#modalPassword1').val(),$('#modalPassword2').val());
        if($('#modalPassword1').val()==$('#modalPassword2').val()){
            var newPassword = $('#modalPassword1').val();
            $.ajax({
                url:'/changePassword'
                ,method:"POST"
                ,data:{password:newPassword}
            }).done(function(data){
                    if(data.error==0){
                        $('#modalChangePassword').modal('toggle');
                        alert('修改密码成功！');
                    }else{
                        alert('无法修改密码,请联系管理员！');
                        console.log(data);
                    }
                });
        }else{
            $(this).button('loading');
        }
        e.preventDefault();
    });

    $('#modalPassword1,#modalPassword2').keyup(function(e){
        if($('#modalPassword1').val()==$('#modalPassword2').val()){
            $('#changePassword').button('reset');
        }
    });

    $('#changePassword').button('reset');
    $('#changePassword').prop('disabled',false);

});