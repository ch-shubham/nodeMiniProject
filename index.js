const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
	console.log(req.headers);  //.headers tell the additional information about who is requesting the data.

	res.statusCode = 200;
	res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
	res.end('<html> <body> <h1> Server success </h1></body></html>');

})

server.listen(port,hostname,() => {
	console.log(`server running at port number ${port}`);
});