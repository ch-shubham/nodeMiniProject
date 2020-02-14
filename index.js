const http = require('http');
const path = require('path');
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req,res) => {
	// console.log(req.headers);  //.headers tell the additional information about who is requesting the data.

	console.log('request for ' + req.url + 'by method' + req.method);
	
	if(req.method == 'GET'){
		var fileURL;
		if(req.url == '/'){
			fileURL = "/index.html"
		}else{
			fileURL = req.url;
		}

		var filePath = path.resolve('./public' + fileURL);
		const fileExt = path.extname(filePath);

		if(fileExt == '.html'){
			fs.exists(filePath,(exists) => {
				if(!exists){
					res.statusCode = 404;
					res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
					res.end('<html> <body> <h1> Error, URL doesnt exist </h1></body></html>');
				}
				res.statusCode =200;
				res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
				fs.createReadStream(filePath).pipe(res);  //filePath me kuch na kuch data raha hoga to createReadStream us data ko read krta hai and the stream of bits me convert krta hai. and pipe will provide us the response fir data kitna b bada ho.
				//readFile lags when the file is too large so we use readStream 	
			}) 
		}
		else{
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
			res.end('<html> <body> <h1> Error, HTML file doesnt exist </h1></body></html>');
	
		}
	}
	else{
		res.statusCode = 404;
		res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
		res.end('<html> <body> <h1> Method not supported </h1></body></html>');
		
	}

	// res.statusCode = 200;
	// res.setHeader('Content-Type','text/html'); //it helps to send the type of content server will respond to client. Hum chahte hai client ko ye batana ki jo hum response send krenge vo kis type ka hoga.. 
	// res.end('<html> <body> <h1> Server success </h1></body></html>');

})

server.listen(port,hostname,() => {
	console.log(`server running at port number ${port}`);
});