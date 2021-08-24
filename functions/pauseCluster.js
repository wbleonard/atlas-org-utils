/*
 * Pauses the named cluster 
 * See https://docs.atlas.mongodb.com/reference/api/clusters-modify-one/
 *
 */
exports = async function(projectID, clusterName, pause) {
  
  // Get stored credentials...
  const username = await context.values.get("AtlasPublicKey");
  const password = await context.values.get("AtlasPrivateKey");
  
  const body = {paused: pause};
  
  const arg = { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: `api/atlas/v1.0/groups/${projectID}/clusters/${clusterName}`, 
    username: username, 
    password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['bzip, deflate']}, 
    digestAuth:true,
    body: JSON.stringify(body)
  };
  
  // The response body is a BSON.Binary object. Parse it and return.
  response = await context.http.patch(arg);

  return EJSON.parse(response.body.text()); 
};