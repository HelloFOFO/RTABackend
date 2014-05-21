//inventoryType 1.大库存 0单天库存

db.pricelogs.find({productType:4}).pretty()


//2 是已通过
db.pricelogs.find({status:2}).forEach(function(p){
   var  startDate = p.startDate;
   var  endDate   = p.endDate;
   var  pricelogs = {};
    while(startDate<=endDate){
        pricelogs.push(startDate);
        startDate+=86400000;
    }
});












