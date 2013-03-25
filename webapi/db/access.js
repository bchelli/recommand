{	var neo4j = require('neo4j');

	var db = new neo4j.GraphDatabase('http://localhost:7474');




	isNodeExist = function(key, value, callback){
		db.getIndexedNodes('node_auto_index', key, value, function(err, nodes){
				if(err){
					console.error(err);
					return callback(null); 
				}
				else 
					return callback(nodes[0]);
			}) ;
	}


	getAllPartners = function(callback){
		db.queryNodeIndex('node_auto_index', 'type:partner', function(err, nodes){
			if(err) throw err;
			var partners = nodes.map(function(result){
				return {nid: result.id, data:result.data};
			} );
			callback(partners);
		});
	}

	isApiKeyExist = function(key, callback){
		isNodeExist('apikey', key, callback);
	}

	
	module.exports.isApiKeyExist = isApiKeyExist;
	module.exports.getAllPartners = getAllPartners; }