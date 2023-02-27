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
	url: 'http://localhost:330',
	databaseName: 'ors_db1_voa', //rename this ?
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
	console.log("checking for similar objects's... NOT REALLY");

	//if it doesn't exist.

  try {
    const newDoc = await collection.save({
      "dateCreated": new Date().getTime(),
      "dateModified": new Date().getTime(),
      "p": 0,
      "n": 0,
    });

    reply.status(201).send({
      message: 'Object saved with id ' + newDoc._id
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

/* ChatGPT has attempted to make these below, use w/ caustion.
async function mklnk_a_hasName_v(  a_id, v_id)// - a link to the name of the attribute. Always in lower case letters. Multilink for synonym.
async function mklnk_o_has_v(      o_id, ...v_id)// - (a) link(s) to an objects attribute values.
async function mklnk_v_belongsTo_a(v_id, a_id)// - a link to the associated attribute.
async function mklnk_v_belongsTo_o(v_id, o_id)// - a link to the associated object.
async function mklnk_v_isType_o(   v_id, o_id)// - a link to the type of data. Will be used for processing later.
*/
async function mklnk_a_hasName_v(a_id, v_id) {
  const collection = voa_db.collection('a_hasName_v');
  try {
    await collection.save({
      "_from": a_id,
      "_to": v_id,
    });
    console.log(`Created a_hasName_v link between ${a_id} and ${v_id}`);
  } catch (err) {
    console.error(`Failed to create a_hasName_v link between ${a_id} and ${v_id}: ${err}`);
  }
}

async function mklnk_o_has_v(o_id, ...v_ids) {
  const collection = voa_db.collection('o_has_v');
  try {
    const edges = v_ids.map(v_id => ({ "_from": o_id, "_to": v_id }));
    await collection.import(edges);
    console.log(`Created o_has_v link(s) for ${o_id}`);
  } catch (err) {
    console.error(`Failed to create o_has_v link(s) for ${o_id}: ${err}`);
  }
}

async function mklnk_v_belongsTo_a(v_id, a_id) {
  const collection = voa_db.collection('v_belongsTo_a');
  try {
    await collection.save({
      "_from": v_id,
      "_to": a_id,
    });
    console.log(`Created v_belongsTo_a link between ${v_id} and ${a_id}`);
  } catch (err) {
    console.error(`Failed to create v_belongsTo_a link between ${v_id} and ${a_id}: ${err}`);
  }
}

async function mklnk_v_belongsTo_o(v_id, o_id) {
  const collection = voa_db.collection('v_belongsTo_o');
  try {
    await collection.save({
      "_from": v_id,
      "_to": o_id,
    });
    console.log(`Created v_belongsTo_o link between ${v_id} and ${o_id}`);
  } catch (err) {
    console.error(`Failed to create v_belongsTo_o link between ${v_id} and ${o_id}: ${err}`);
  }
}

async function mklnk_v_isType_o(v_id, o_id) {
  const collection = voa_db.collection('v_isType_o');
  try {
    await collection.save({
      "_from": v_id,
      "_to": o_id,
    });
    console.log(`Created v_isType_o link between ${v_id} and ${o_id}`);
  } catch (err) {
    console.error(`Failed to create v_isType_o link between ${v_id} and ${o_id}: ${err}`);
  }
}


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

async function create_o(...attributes) {
	
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
	
	
	
	const collection = voa_db.collection('o');

	console.log("new object:\n " + Object.entries(request.body));
	console.log("checking for similar objects's... NOT REALLY");

	//if it doesn't exist.

	try {
		await collection.save({
			"dateCreated": new Date().getTime(),
			"dateModified": new Date().getTime(),
			"p":0,
			"n":0,
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
}

function create_a(creationTime, attributeName, type = "o/stringtypeobj?") {
	//check db for attributes with matching names
	//if no ids are returned, create a new a, v, o style  object for the attributes

}


//function create data converters a(v)_to_a(v)
//user created js functions?
//approval process