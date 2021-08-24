// This function is the webhook's request handler.
exports = function(payload, response) {

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    var result = context.functions.execute('getClusters',[]);
    return  result;
};