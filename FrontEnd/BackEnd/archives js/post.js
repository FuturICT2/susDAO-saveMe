var http = require('http');
var qs = require('querystring');
var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';


const post_function = function (request, response) {
  if (request.method == 'POST') {
      var body = '';

      request.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
              request.connection.destroy();
      });

      request.on('end', function () {
          var post = qs.parse(body);
          console.log("Posted", post['name']);
          response.writeHead(200);
          response.end("hey");
          // use post['blah'], etc.
      });
  }
}


console_post_data = function (req, res) {
  var body = "";
  let name = '';
  req.on('data', function (chunk) {
    body += chunk;

  });
  req.on('end', function () {
    name= body.split(':');
    console.log('POSTed: ' + name[1]);
  });

  res.writeHead(200);
  res.end("MYes"+ String(chunk));
}

http.createServer(console_post_data).listen(8000); //choose to parse one of the 2 functions