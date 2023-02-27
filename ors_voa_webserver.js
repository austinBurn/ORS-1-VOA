//ors voa webserver 1 - catalysed 2023.02.24
// by austin burn

//js Stack
//fastify libs
const fastify = require('fastify')({
	logger: true
});
const fastifyFormbody = require('@fastify/formbody');
const fastifyStatic = require('@fastify/static');

//db driver
const arangojs = require('arangojs');

//fs driver for hosting/loading files into server
const path = require('path');

//use this to load the username:password and then destroy it
var fs = require('fs');
var credentials = fs.readFileSync('credentials.txt', 'utf-8');
var u = credentials.match(/username=(.*)/)[1];
var p = credentials.match(/password=(.*)/)[1];

//log into arangoDB
const voa_db = new arangojs.Database({
	url: 'http://localhost:8529',
	databaseName: 'ors_db', //rename this ?
	auth: {
		username: u,
		password: p
	},
});

//destroy the data?
fs, credentials, u, p = 0;
fs, credentials, u, p = "";
fs, credentials, u, p = null;

//init formbody handler
fastify.register(fastifyFormbody);

//Handling object submissions on /o
fastify.post('/o', async (request, reply) => {
	const collection = voa_db.collection('o');

	console.log("new object:\n " + Object.entries(request.body));
	console.log("checking for existing...")

	try {
		await collection.save({
			"dateModified": new Date().getTime()
		});
		reply.status(201).send({
			message: 'Object saved'
		});
	} catch (err) {
		console.error(err);
		reply.status(500).send({
			message: 'Failed to save object'
		});
	}
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public'),
	prefix: '/'
});

fastify.listen({
	port: 3000
}, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});

function create_v(creationTime = new Date().getTime(),
	v_belongsTo_o,
	v_belongsTo_a,
	v_isType_o,
	v) {

	console.log("Validating o, a existence for linkage;\n" +
		belongsTo_o + " and " + belongsTo_a + ".");

	//ensure o and a exist
	//if not create them

	//ensure v type exists as an O
	//???some complex O lookup??? based on o's v????

	//if they do
	//	add the v to v

	//make v_isType_o edge
	//make v_belongsTo_a edge
	//make v_belongsTo_o edge

	//check if o_has_v has been created
	//if not, create it

	//check if a_hasA_v has been created
	//if not, create it

	//return the id of the v
}

/* chatgpt garbage
async function create_v(creationTime, belongsTo_o, belongsTo_a, v_isType_o, v) {
  // Validate that o and a exist, and create them if they do not
  const oCollection = voa_db.collection('o');
  const aCollection = voa_db.collection('a');
  let o = await oCollection.firstExample({ _id: belongsTo_o });
  let a = await aCollection.firstExample({ _id: belongsTo_a });
  if (!o) {
    o = await oCollection.save({ type: 'o' });
    await oCollection.createEdge('o_has_a', o._id, a._id);
  }
  if (!a) {
    a = await aCollection.save({ type: 'a', name: 'default' });
    await oCollection.createEdge('o_has_a', o._id, a._id);
  }
  
  // Ensure v type exists as an O
  // Note: This part is unclear, so I will assume v_isType_o is the ID of an existing O
  const v_isType_o_doc = await oCollection.firstExample({ _id: v_isType_o });
  if (!v_isType_o_doc) {
    throw new Error(`Could not find O with ID ${v_isType_o}`);
  }

  // Add the v to the o
  const vCollection = voa_db.collection('v');
  const vDoc = { ...v, type: 'v', dateCreated: creationTime, dateModified: creationTime };
  const v_id = await vCollection.save(vDoc)._id;
  await oCollection.createEdge('o_has_v', o._id, v_id);
  await aCollection.createEdge('a_hasA_v', a._id, v_id);
  
  // Make v_isType_o edge, v_belongsTo_a edge, and v_belongsTo_o edge
  await vCollection.createEdge('v_isType_o', v_id, v_isType_o_doc._id);
  await vCollection.createEdge('v_belongsTo_a', v_id, a._id);
  await vCollection.createEdge('v_belongsTo_o', v_id, o._id);
  
  // Check if o_has_v has been created, if not, create it
  const o_has_v = await voa_db.edgeCollection('o_has_v');
  const existing_o_has_v_edge = await o_has_v.firstExample({ _from: o._id, _to: v_id });
  if (!existing_o_has_v_edge) {
    await o_has_v.save(o._id, v_id);
  }
  
  // Check if a_hasA_v has been created, if not, create it
  const a_hasA_v = await voa_db.edgeCollection('a_hasA_v');
  const existing_a_hasA_v_edge = await a_hasA_v.firstExample({ _from: a._id, _to: v_id });
  if (!existing_a_hasA_v_edge) {
    await a_hasA_v.save(a._id, v_id);
  }
  
  // Return the ID of the v
  return v_id;
}
*/

function create_o(creationTime, attributes) {
	
	//check for similar objects in the db
	
	//look for values matching attributes 
	//if any have over 3 matching attribute:value pairs in addition to the same "object type" attribute:value,
	//return the ID's and ask the user if that's what they meant to make

	
	//atributes in an array?
	//for av in attribs
	//{
	//create_a(av.name)
	//create_v(creationTime,
	//}
}

function create_a(creationTime, attributeName, type = "o/stringtypeobj?") {
	//check db for attributes with matching names
	//if no ids are returned, create a new a, v, o style  object for the attributes

}


//function create data converters a(v)_to_a(v)
//user created js functions?
//approval process