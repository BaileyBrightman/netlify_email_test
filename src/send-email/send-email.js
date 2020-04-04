// import querystring from "querystring";

// const SparkPost = require('sparkpost');
// const client = new SparkPost(process.env.SPARKPOST);

// exports.handler = function(event, context, callback) {

//     if (event.httpMethod !== "POST") {
//         return { statusCode: 405, body: "Method Not Allowed, Try POST" };
//     }

//   client.transmissions
//     .send({
//       content: {
//         from: 'baileybrightman@gmail.com',
//         subject: 'Patterson Go Information',
//         html:
//         event.queryStringParameters.body
//       },
//     recipients: [{ address: 'baileybrightman@gmail.com' }]
//   }).then(data => {
//     console.log('Email Sent!');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('ERROR: Email failed\nERROR: ');
//     console.log(err);
//   });
// }

exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World"
    });
};