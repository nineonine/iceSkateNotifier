let AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let https = require("https");

let MSG = "Skate Drop In Available!";

let smsParams = require('./params.js').sms(MSG);
let emailParams = require('./params.js').email(MSG);
let BODY = require('./params.js').requestBody();

let HOST = "anc.ca.apm.activecommunities.com"
let PATH =  "/cityofportcoquitlam/rest/activities/list"
let OPTS = {
    host: HOST,
    port: 443,
    path: PATH,
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(BODY).length
    }
};

let mkApiCall = function() {
    return new Promise((resolve, reject) => {
        let req = https.request(OPTS, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                resolve(JSON.parse(chunk).body.activity_items.filter(function(i) { i.urgent_message.status_description != "Full"}));
            });
        });
        req.on('error', function(e) {
            console.error(e);
        });
        req.write(JSON.stringify(BODY));
        req.end();
    })
}

exports.handler = async (event) => {
    let items = await mkApiCall();
    if (items && items.length != 0) {
        console.log("Ice Skating Drop-In Available!");
        await new AWS.SNS().publish(smsParams).promise();
        await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(emailParams).promise();
    } else {
        console.log("Ice Skating Drop-In NOT Available");
    }
};
