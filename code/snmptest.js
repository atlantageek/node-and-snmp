var snmp = require('snmp-native');
var session = new snmp.Session();
session.get({ oid: [1, 3, 6, 1, 4, 1, 2021,10,1,3,1], host: 'localhost', community: 'public' }, function(error, varbinds) {
    if (error) {
        console.log('Fail :(');
    } else {
        console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
    }
});
