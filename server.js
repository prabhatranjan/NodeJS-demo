var http = require("http");

function start(){
	http.createServer(function(request,response) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Prabhat");
		response.end();
	}).listen(3000);

console.log("server has started on port 3000...");
}

exports.start = start;