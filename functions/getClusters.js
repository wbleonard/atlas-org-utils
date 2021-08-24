/* 
 * Returns an array of clusters that should not be paused.
 *
 */
exports = function(arg){
  return new Promise((resolve, reject) => {
    var collection = context.services.get("mongodb-atlas").db("clustermanager").collection("nopause");
    collection.updateMany({projectName:"SA-SHARED-DEMO"},{$set:{"whitelist_date": new Date()}}).then((updateResult) => {
    console.log(JSON.stringify(updateResult));
    collection.find().toArray().then((clusters) => {
      console.log(JSON.stringify(clusters));
      resolve(clusters);
    });
  })
  })
  
};