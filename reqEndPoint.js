var request = require('request');

var options;

exports.request = function(method, baseurl, path, query, formdata){
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


    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}
