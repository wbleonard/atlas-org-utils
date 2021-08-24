exports = function(arg){
  var collection = context.services.get("mongodb-atlas").db("clustermanager").collection("nopause");
  
  var id = BSON.ObjectId(arg);
  
  var result = collection.deleteOne({"_id":id});
  
  return result;
};