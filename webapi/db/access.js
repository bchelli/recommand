{	var neo4j = require('neo4j');

	var db = new neo4j.GraphDatabase('http://localhost:7474');


	mapNodeToData = function(node){
		return new {id:node.id, data:node.data};
	}

	isNodeExist = function(key, value, callback){
		db.getIndexedNodes('node_auto_index', key, value, function(err, nodes){
				if(err){
					console.error(err);
					callback(null); 
				} else callback(nodes[0]);
			}) ;
	}

	getPartnerChildNode = function(partnerNodeId, relation, key, value, callback){
		var query = [
			'START partner=node('+ partnerNodeId+')',
			'MATCH (child)-[:'+ relation+']-> (partner)',
			'where child.'+ key +' = ' + value,
			'return child'].join('\n') 

		console.log(query);	
		var params = {
			
		};

		db.query(query, params, function(err, results){
			if(err) throw err;

			callback(results.map(function(result){
				return result['child'];
			}));
		})
	}


	getAllPartners = function(callback){
		db.queryNodeIndex('node_auto_index', 'type:partner', function(err, nodes){
			if(err) throw err;
			var partners = nodes.map(function(result){
				return mapNodeToData(result) ;//{nid: result.id, data:result.data};
			} );
			callback(partners);
		});
	}

	isApiKeyExist = function(key, callback){
		isNodeExist('apikey', key, callback);
	}

	isUserExist = function(key, callback){
		isNodeExist('uid', key, callback);
	}

	
	module.exports.isApiKeyExist = isApiKeyExist;
	module.exports.getPartnerChildNode = getPartnerChildNode;
	module.exports.getAllPartners = getAllPartners; }