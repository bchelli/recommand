var express = require('express') 
  , db = require('./db/access');
 
 
var app = express();
 
// collect api call: force an apikey value and until now we still open on the query sent, we expect for this
//version uid: user id and rid: resource id
app.get('/collect/:apikey', function(req, res) {
  //extract the request params
  var apikey =  req.params.apikey;
  var uid = req.query.uid;
  var rid = req.query.rid;
  //check if uid and rid are provided ifnot return bad request
  if('undefined' === uid || 'undefined' ===  rid){
    console.log('missing params, rid or uid');
    res.send('400', 'missing params, rid or uid');
    } 
  //check if the api code exists, 
  //TODO  load in a hash table the available apikey to avoid hitting the db.

  var apiKeyNode =  db.isApiKeyExist(req.params.apikey, function(node){
    if( node == null){
      res.send("not find");
    }else{
      res.send("node find  :" + node);
    }
  });
  //console.log("from controller: " + apiKeyNode);
  
});
app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 
app.listen(3000);
console.log('Listening on port 3000...');