var snmp = require('snmp-native');


var current_cpu1="";
var current_cpu2="";
var current_cpu3="";
var items=[]

function query_snmp() {
    var session = new snmp.Session();
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021,10,1,3,1], host: 'localhost', community: 'public' }, function(error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            var last_cpu = current_cpu1;
            current_cpu1 = varbinds[0].value;
            var current_pct = varbinds[0].value * 100;
            send_event('cpu1', {current: current_cpu1, last: last_cpu, value: current_pct});
        }
    });
}
setInterval(query_snmp, 1000);
function query_snmp2() {
    var session = new snmp.Session();
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021,10,1,3,2], host: 'localhost', community: 'public' }, function(error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            var last_cpu = current_cpu2;
            current_cpu2 = varbinds[0].value;
            var current_pct = varbinds[0].value * 100;
            send_event('cpu2', {current: current_cpu2, last: last_cpu, value: current_pct});
        }
    });
}
setInterval(query_snmp2, 1000);
function query_snmp3() {
    var session = new snmp.Session();
    session.get({ oid: [1, 3, 6, 1, 4, 1, 2021,10,1,3,3], host: 'localhost', community: 'public' }, function(error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            var last_cpu = current_cpu3;
            current_cpu3 = varbinds[0].value;
            var current_pct = varbinds[0].value * 100;
            items.push({value:3, label: "help"});
            send_event('cpu3', {current: current_cpu3, last: last_cpu, value: current_pct});
	    send_event('messages',items);
        }
    });
}
setInterval(query_snmp3, 1000);
