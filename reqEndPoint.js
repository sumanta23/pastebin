var Promise = require('bluebird');
var request = require("request-promise");
var options;

exports.request = function(method, baseurl, path, formdata){
    if(method === 'post'){

        options = { method   : 'POST',
            url              : baseurl + path,
            headers          : { 'content-type' : 'application/x-www-form-urlencoded' },
            form             : formdata 
        };
    }
    else if(method === 'get'){
        options = { 
            method : 'GET',
            url    : baseurl + path
        };

    }


    return request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return body;
    });
}
