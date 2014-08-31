var os = require('os');
var snmp = require('snmpjs');
var http = require('http');
var express = require('express');
var util = require('util');

var app = express();

var result=[];

app.use(express.static('public'));
app.get('/get_today_count', function(req, res) {
   console.log(result.length);
  res.send(result.length.toString());
});

var server = app.listen(3001, function() {
  console.log('Listening on port %d', server.address().port);
});


var trapd = snmp.createTrapListener();

trapd.on('trap', function(msg){
       result.push(msg);
   var now = new Date();
   console.log("Trap Received " + now);
   console.log(util.inspect(snmp.message.serializer(msg)['pdu'], false, null));
   console.log(result.length);
   });

trapd.bind({family: 'udp4', port: 162});
