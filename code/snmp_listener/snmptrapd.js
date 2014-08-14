var os = require('os');
var snmp = require('snmpjs');

var bunyan = require('bunyan');

var log = new bunyan({
      name: 'snmpd',
          level: 'trace'
});

var trapd = snmp.createTrapListener({log: log});

trapd.on('trap', function(msg){
      console.log('trap detected');
});

trapd.bind({family: 'udp4', port: 162});
