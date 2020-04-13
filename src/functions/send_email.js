const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const SparkPost = require('sparkpost');
// Creating the client object and passing in our sparkpost id
// TODO: Add this id as an environment variable in netlify
const client = new SparkPost('1fe64dbf0643e9c5cd7bba9fb298582d15be0f39');

exports.handler = function (event, context, callback) {

  if (event.httpMethod !== "POST") {
    // If the request isn't post, return an error code and 
    callback(null, {
      statusCode: 405,
      body: "Method Not Allowed, Try POST"
    });
  }

  // Get the parameters from the event and parse them as json
  let params = JSON.parse(event.body);

  // getting the template as a JSDOM object
  JSDOM.fromFile("src/functions/template.html").then(myDom => {
    let emailHtml = formatEmail(myDom, params);
    console.log(emailHtml);
    // sendEmail(emailHtml, 'baileybrightman@gmail.com', "The Test", callback);
    
  });
  console.log('Here bud\n\n\n\n\n');

  
};

/**
 * Send the email using sparkpost
 * 
 * @param {string} bodyHtml - The body for the email as a string
 * @param {string} address - The address the email should be sent to
 * @param {string} subject - The subject line for the email
 * @param {*} callback - The callback object to send verification to the client
 */ 
function sendEmail(bodyHtml, address, subject, callback){
  // Sendiing the email using SparkPost
  client.transmissions
    .send({
      content: {
        from: 'baileybrightman@baileybrightman.ca',
        subject: subject,
        html: bodyHtml
      },
      recipients: [{
        address: address /* The address from the request*/
      }]
    }).then(data => {
      console.log('Email Sent!');
      console.log(data);
      // Success: Inform the user
      callback(null, {
        statusCode: 200,
        body: "Sent Successfully"
      });
    })
    .catch(err => {
      console.log('ERROR: Email failed\nERROR: ');
      // Faliure: Inform the user
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: "Failed to send"
      });
    });
}

/**
 * Generates the emails html body using the jsdom object and JSON data
 * 
 * @param {JSDOM} dom - The JSDOM object. This is the html file template to be the body of the email 
 * @param {JSON} params - The JSON object from the request. This holds the data to be added to the body 
 */
function formatEmail(dom, params){

  let doc = dom.window.document;
  doc.getElementById('intro-text').innerHTML = "Thank you for your interest in our services! Here is some information on the products you selected:";
  
  


  return dom.serialize();
}

/**
 * Sample Request
 * 
{
	"address": "baileybrightman@gmail.com",
	"packages": [
		{
      "name": "solution name",
      "description": "Detailed Description",
      "solutions": [
        {
          "name": "Solution",
          "description": "Solutions Description",
          "questions": [
						{
              "id": 1,
              "question": "question1",
              "description": "This Is A Description"
						},
            {
              "id": 1,
              "question": "question1",
              "description": "This Is A Description"
            }
          ]
      
        }
      ]
    }
	]
}
 */