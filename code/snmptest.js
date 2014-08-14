var snmp = require('snmp-native');
var http = require('http');

var result="";

var server = http.createServer(function (request, response) {
	  response.writeHead(200, {"Content-Type": "text/html"});
	    response.end("<html><head></head><body><h1>Last query:" + result +"</h1></body></html>");
});

server.listen(3000);

function query_snmp() {
    var session = new snmp.Session();
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021,10,1,3,1], host: 'localhost', community: 'public' }, function(error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            result = varbinds[0].value;
        }
    });
}
setInterval(query_snmp, 1000);
