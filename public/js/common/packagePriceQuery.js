$(document).ready(function(){
    var productType = 'package';
//页面数据初始化

    $('#searchEffect').val('');
    $('#searchExpiry').val('');
    $('#searchName').val('');

    $('.date').datepicker({
        "dateFormat": 'yy-mm-dd'
    });

    //刷新分页以及表格数据
    var refershDataSet = function(url,data){
//        console.log(data);
        $.ajax(
            {  type: "GET",
                url: url,
                cache:false,
                data:data
            }
        ).done(function(data){
                console.log(data);
                if(data.error!==0){
                    console.log(data.errorMsg);
                }else{
                    var html = new EJS({url:"./template/temp_"+productType+"PriceQuery.ejs"}).render(data);
                    $('#queryResult').html(html);
                }
            });
    };

    $('#query').click(function(e){
        e.preventDefault();
        var product    = $('#searchName').data('productID');
        var effectDate = $('#searchEffect').val();
        var expiryDate = $('#searchExpiry').val();
        var queryParam = { product:product,
                           effectDate:effectDate,
                           expiryDate:expiryDate};
        refershDataSet("/"+productType+"PriceQuery/list",queryParam);
    });

    $('#searchName').autocomplete({
        source:function(req,res){
            $.ajax({
                method:'GET',
                url:'/getProductNames/'+productType,
                data:{city:$('#searchCity').val(),
                    name:req.term}
            }).done(function(data){
                    res(data);
                });
        }
        ,minLength:0
//        ,appendTo:'#subProductPreSelect'
        ,select:function(event,ui){
            event.preventDefault();
            $('#searchName').val(ui.item.label);
            $('#searchName').data( "productID", ui.item.value );
        }
    }).focus(function(){
            $(this).autocomplete("search", "");
        });

    $('#queryResult').on('click','',function(){

    });
});