//var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle['/'] = requestHandlers.iniciar;
handle['/iniciar'] = requestHandlers.iniciar;
handle['/subir'] = requestHandlers.subir;


var http = require("http");
var url = require("url");


function iniciar(route, handle) {
	function onRequest(request, response) {
		var dataPosteada = "";
		var pathname = url.parse(request.url).pathname;
		
		console.log("Peticion para " + pathname + " recibida.");
		request.setEncoding("utf8");
		request.addListener("data", function(trozoPosteado) {
		
		dataPosteada += trozoPosteado;
		
		console.log("Recibido trozo POST '" + trozoPosteado + "'.");
		});
		
		request.addListener("end", function() {
		
		route(handle, pathname, response, dataPosteada);
		
		});
	}
	
	http.createServer(onRequest).listen(8080);
	console.log("Servidor Iniciado");
	}

iniciar(router.route, handle);

