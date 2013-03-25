{var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');


isApiKeyExist = function(key, callback){
	db.getIndexedNodes('node_auto_index', 'apikey', key, function(err, nodes){
		if(err){
			console.error(err);
			return callback(null); 
		}
		else 
			console.log(nodes[0]);
			return callback(nodes[0]);
	}) ;
}



module.exports.isApiKeyExist = isApiKeyExist;
}