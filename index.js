var request = require("request");
var https = require('https');

function Statsmcfly () {
	this.version = 'api';
    this.url = 'statsmcfly.com';
	this.project = '';
	return this;
}

Statsmcfly.prototype.settings = function( options ){
	this.apikey = options.apikey;
	this.project = options.project || '';
};

Statsmcfly.prototype.track = function( data, callback) {
	this.request('POST', '/api', data, callback);
};

Statsmcfly.prototype.request = function (method, url, data, callback) {
    var self = this;
    var protocole = (self.ssl == true)?'https':'http';
    // Handle params
    if (typeof callback === 'undefined') {
        callback = data;
        data = {};
    }

	
	if( self.project !== '' ){
		data.project = self.project;
	}

    // Construct headers
	var timestamp = Math.round(+new Date / 1000);
	var signature = self.SHA1(self.apikey + ' ' + data + ' ' + timestamp);

    var headers = {
		"Accept": "application/json;text/plain",
		'X-Statsmcfly-API-Key': self.apikey,
		"X-statsmcfly-API-Signature": signature,
		"X-statsmcfly-API-Timestamp": timestamp
	};

    request({
        method:     method,
        url:        'https://'+self.url + url,
        headers:    headers,
        json:       data
    }, function (err, response, body) {
        if (err) return callback(err, null);
        if (response.code < 200 || response.code > 302) return callback(body,null);
        callback(null, body);
    });
};

Statsmcfly.prototype.SHA1 = function(str) {
	var sum = require('crypto').createHash('sha1');
	sum.update(str);
	return sum.digest('hex');
}

module.exports = new Statsmcfly();
