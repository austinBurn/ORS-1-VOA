//ors voa webserver 1 - catalysed 2023.02.24
// by austin burn


//js Stack
//fastify libs
const fastify         = require('fastify')({ logger: true });
const fastifyFormbody = require('@fastify/formbody');
const fastifyStatic   = require('@fastify/static');

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
fs,credentials,u,p = 0;
fs,credentials,u,p = "";
fs,credentials,u,p = null;

//init formbody handler
fastify.register(fastifyFormbody);

//Handling object submissions on /o
fastify.post('/o', async (request, reply) => {
  const collection = voa_db.collection('o');
  
  console.log("new object:\n "+Object.entries(request.body));
  console.log("checking for existing...")

  try {
    await collection.save({"dateModified":new Date().getTime()});
    reply.status(201).send({ message: 'Object saved' });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ message: 'Failed to save object' });
  }
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/'
});

fastify.listen({port: 3000}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

function create_v(creationTime=new Date().getTime(),
				  v_belongsTo_o, 
				  v_belongsTo_a, 
				  v_isType_o,
				  v){
	
	console.log("Validating o, a existence for linkage;\n"
	+belongsTo_o+" and "+belongsTo_a+".");
	
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

function create_o(creationTime, attributes){
	
	//atributes in an array?
	//for av in attribs
	//{
		//create_a(av.name)
		//create_v(creationTime,
	//}
}

function create_a(creationTime, attributeName, type="o/stringtypeobj?"){
	//check db for attributes with matching names
	//if no ids are returned, create a new a, v, o style  object for the attributes
	
}