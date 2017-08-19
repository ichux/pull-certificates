var request = require('request');
var pemHeader = "CERTIFICATE";
var extraPart = pemHeader + "-----\r\n";


// if you give it non secure site, be sure to see an error
var get_response = request({url: 'https://pycon.ng/'});
get_response.on('response', function (response_in) {
    certificateDetails = response_in.req.connection.getPeerCertificate(true);
    console.log(certificateDetails);

    // The certificate object has a raw field which contains the certificate data you
    // want in byte form. To get it in X509 format, just convert it to base64
    dataB64 = certificateDetails.raw.toString('base64');
    var pemBody = dataB64.replace(/(.{64})/g, "$1\r\n");
    pemBody = pemBody.replace(/\r\n$/, '');
    console.log("\n-----BEGIN " + extraPart + pemBody + "\r\n-----END " + extraPart);
});
