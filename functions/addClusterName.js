/*
 * Adds a cluster to the list of clusters that should not be paused.
 */
exports = function(arg){
  console.log(arg);
  var collection = context.services.get("mongodb-atlas").db("clustermanager").collection("nopause");
  arg.whitelist_date = new Date();
  var result = collection.insertOne(arg);

  return result;
};