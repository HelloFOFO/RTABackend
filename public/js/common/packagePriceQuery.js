var priceQueryInit = function(){
    return {
        init:function(productType){
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
                            var html = new EJS({url:"./template/temp_PriceQuery.ejs"}).render(data);
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

            $('#queryResult').on('click','.priceData',function(){
//            alert($(this).attr("id"));
                var $this = $(this);
                if($this.attr('oldPrice') != 99999){
                    $('#oldCost').val($this.attr('oldCost'));
                    $('#newCost').val($this.attr('oldCost'));
                    $('#oldPrice').val($this.attr('oldPrice'));
                    $('#newPrice').val($this.attr('oldPrice'));
                    $('#oldInventory').val($this.attr('oldInventory'));
                    $('#newInventory').val($this.attr('oldInventory'));
                    $('#priceID').val($this.attr("id"))
                    $('#priceModify').modal('show');
                }
            });



            var savePrice = function(priceID,oldCost,newCost,oldPrice,newPrice,oldInventory,newInventory,fn){
                $.ajax({
                    url:'/price/update/'+priceID
                    ,method:'post'
                    ,data:{id:priceID,cost:newCost,price:newPrice,inventory:newInventory,oldCost:oldCost,oldPrice:oldPrice,oldInventory:oldInventory}
                }).done(function(data){
                        if(data.error==0){
                            fn(null,data);
                        }else{
                            fn(data.errorMsg,null);
                        }
                    }).fail(function(){
                        fn('network error',null);
                    });

            };

            $('#doCreate').click(function(){
                var priceID = $('#priceID').val();
                savePrice(priceID,$('#oldCost').val(),$('#newCost').val(),$('#oldPrice').val(),$('#newPrice').val(),$('#oldInventory').val(),$('#newInventory').val(),function(error,result){
                    if(error){
//                $('#priceModify').modal('show');
                        alert(error);
                    }else{
                        $('#priceModify').modal('hide');
                        var product    = $('#searchName').data('productID');
                        var effectDate = $('#searchEffect').val();
                        var expiryDate = $('#searchExpiry').val();
                        var queryParam = { product:product,
                            effectDate:effectDate,
                            expiryDate:expiryDate};
                        refershDataSet("/"+productType+"PriceQuery/list",queryParam);
                    }
                });
            });
        }
    };
}();

