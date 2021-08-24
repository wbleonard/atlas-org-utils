// This function is the webhook's request handler.
exports = function(payload, response) {
    var collection = context.services.get("mongodb-atlas").db("netmon").collection("ping");
    const body = payload.body;
    console.log("Request body:", body.text());
    var data = body.text().split("\n");
    var datapoint = {
      "time":new Date(),
      "target":data[0],
      "result":[]
    }
    for(var i = 0; i < data.length; i++){
      if(i > 0 && i < 5){
        datapoint.result.push(data[i]);
      }
      if(i == 8){
        datapoint.transmissionStats = data[i];
      }
      if(i == 9){
        datapoint.latency = data[i];
      }
    }
    
    return collection.insertOne(datapoint);
};