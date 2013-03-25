var express = require('express') 
  , db = require('./db/access');
 
 
var app = express();
 
//initialisation
//load all partners ids
app.configure(function(){
    db.getAllPartners(function(partners){
      //set in the local cache the existing partners
      //key partner_{id}
      partners.forEach(function(p){ app.set("partner_"+p.data.apikey,p)});
    });
})

// collect api call: force an apikey value and until now we still open on the query sent, we expect for this
//version uid: user id and rid: resource id
  app.get('/collect/:apikey', function(req, res) {


    getPartnerChildNode('3','resource','rid', '1', function(result){
      result.forEach(function(item){
        console.log(item);
      })
    } )

    //extract the request params
    var apikey =  req.params.apikey;
    var uid = req.query.uid;
    var rid = req.query.rid;
    var sc = req.query.sc;

    //check if uid and rid are provided ifnot return bad request
    if('undefined' === uid || 'undefined' ===  rid){
      console.log('missing params, rid or uid');
      res.send('400', 'missing params, rid or uid'); 
    }else{
      //check if api key is valid
      var partner = app.get("partner_" + apikey);
      if(!partner) {
        res.send('400', 'invalid api key')
      } else{
        console.log(partner);
        console.log('coucou');

      }
    }
  });
app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 

app.listen(3000);
console.log('Listening on port 3000...');