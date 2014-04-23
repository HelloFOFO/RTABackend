/**
 * Created by wucho on 14-4-2.
 */

$(document).ready(function(){

    //初始化页面
    var pageInit = function(){
        $('#searchProvider option[value=""]').prop("selected",true);
    };
    pageInit();
//修改权限
    var saveRights = function(member,module,isEnable){
        var param = {
            member:member
            ,module:module
            ,isEnable:isEnable
        };
        $.ajax({
            url:'/rightsManagement/save'
            ,method:'POST'
            ,cache:false
            ,data:param
        }).done(function(data){
                refreshResult();
            }).fail(function(){
                alert('查询出错！');
            });
    };

    //刷新权限配置表
    var refreshResult = function(){
        var memberID = $('#searchMember').val();
        if(_.isEmpty(memberID)){
            $('#queryResult').empty();
            return false;
        }
        $.ajax({
            url:'/rightsManagement/list/'+memberID
            ,method:'GET'
            ,cache:false
        }).done(function(data){
                if(data.error==0){
                    var tablestr='<table class="table table-bordered">';
                    tablestr+='<tr><th>账号</th><th>模块</th><th>开通时间</th><th>开通状态</th><th>操作</th></tr>';
                    $.each(data.data,function(index,data){
                        var tmp= '<tr><td>__MEMBERNAME__</td><td>__MODULENAME__</td><td>__CREATETIME__</td><td>__STATUS__</td><td><button memberID="__MEMBERID__" moduleID="__MODULEID__" isEnable="__ISENABLE__" class="btn __BUTTONSTATUS__">__BUTTON__</button></td></tr>';
                        tmp=tmp.replace(/__MEMBERID__/,data.member._id)
                            .replace(/__MEMBERNAME__/,data.member.name)
                            .replace(/__MODULEID__/,data.module._id)
                            .replace(/__MODULENAME__/,data.module.cat+'::'+data.module.name)
                            .replace(/__CREATETIME__/,new Date(data.createTime).Format("yyyy-MM-dd hh:mm"))
                            .replace(/__STATUS__/,data.isEnable?'有效':'无效')
                            .replace(/__ISENABLE__/,data.isEnable?false:true)
                            .replace(/__BUTTON__/,data.isEnable?'禁用':'启用')
                            .replace(/__BUTTONSTATUS__/,data.isEnable?'btn-danger':'btn-primary');
                        tablestr+=tmp;
                    });
                    tablestr+='</table>';
                    $('#queryResult').empty();
                    $('#queryResult').append(tablestr);
                }else{
                    $('#queryResult').empty();
                }
                return true;
            }).fail(function(){
                alert('查询出错！');
            });
    };

    $('#queryResult').on('click','button',function(e){
        var member  = $(this).attr('memberID');
        var module   = $(this).attr('moduleID');
        var isEnable = $(this).attr('isEnable');
        saveRights(member,module,isEnable);
        refreshResult();
    });

    $('#searchProvider').change(function(){
        $.ajax({
             url:'/listMemberByProvider/'+$('#searchProvider').val()
            ,method:'GET'
        }).done(function(data){
//                console.log(data);
                var optionStr = '<option value="__memberID__">__memberName__</option>';
                var options='<option value="">__请选择账号__</option>';
                $.each(data.data,function(index,data){
                    options+=optionStr.replace(/__memberName__/,data.name).replace(/__memberID__/,data._id);
                });
                $('#searchMember').html(options);
            });
    });

    $('#searchMember').change(function(e){
        refreshResult();
    });

    $('#query').click(function(e){
        e.preventDefault();
        var member=$('#searchMember').val();
        var module=$('#searchModule').val();
        var isEnable=true;
        saveRights(member,module,isEnable);
    });



});
