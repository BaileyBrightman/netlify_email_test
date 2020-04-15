// // const contentful = require('contentful');
// const nf = require('node-fetch');
// const SparkPost = require('sparkpost');
// // Creating the client object and passing in our sparkpost id
// // TODO: Add this id as an environment variable in netlify
// const client = new SparkPost('1fe64dbf0643e9c5cd7bba9fb298582d15be0f39');

import querystring from "querystring";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.name || "World";

  return {
    statusCode: 200,
    body: `Hello, ${name}`
  };
};


// exports.handler = function (event, context, callback) {

//   if (event.httpMethod !== "POST") {
//     // If the request isn't post, return an error code and 
//     callback(null, {
//       statusCode: 405,
//       body: "Method Not Allowed, Try POST"
//     });
//   }

//   //TODO: Use environment variales for these keys instead of hard-coding them in
//   // let client = contentful.createClient({
//   //   space: '9y0shzjynubp',
//   //   accessToken: 'KhpA-U25moFH668brEy06bE_hibzynHiaeE5MADe30U'
//   // });
  
//   // Get the parameters from the event and parse them as json
//   let params = JSON.parse(event.body);
//   params = params.data;
  
//   // Get the content for the email from contentful then format the emal and send it  
//   let emailContent = {};
//   // client.getEntries({
//   //   'content_type': 'email'
//   // }).then(function (entries){
//   //   emailContent = entries.items[0].fields;
//   //   emailContent.headerImage = emailContent.headerImage.fields;
//   //   console.log(emailContent.headerImage);

//   //   // Format the email and return the html as a string
//   //   let emailHtml = formatEmail(params, emailContent);
//   //   // console.log(emailHtml);
//   //   sendEmail(emailHtml, params.address, emailContent.emailSubjectLine, callback);

//   // });

   
//   console.log('Here bud\n\n\n\n\n');

  
// };

// /**
//  * Send the email using sparkpost
//  * 
//  * @param {string} bodyHtml - The body for the email as a string
//  * @param {string} address - The address the email should be sent to
//  * @param {string} subject - The subject line for the email
//  * @param {*} callback - The callback object to send verification to the client
//  */ 
// function sendEmail(bodyHtml, address, subject, callback){
//   // Sendiing the email using SparkPost
//   client.transmissions
//     .send({
//       content: {
//         from: 'baileybrightman@baileybrightman.ca',
//         subject: subject,
//         html: bodyHtml
//       },
//       recipients: [{
//         address: address /* The address from the request*/
//       }]
//     }).then(data => {
//       console.log('Email Sent!');
//       console.log(data);
//       // Success: Inform the user
//       callback(null, {
//         statusCode: 200,
//         body: "Sent Successfully"
//       });
//     })
//     .catch(err => {
//       console.log('ERROR: Email failed\nERROR: ');
//       // Faliure: Inform the user
//       console.log(err);
//       callback(null, {
//         statusCode: 500,
//         body: "Failed to send"
//       });
//     });
// }

// /**
//  * Generates the emails html body using string concatonation and JSON data
//  * 
//  * @param {JSON} params - A holding the data to be added to the body 
//  * @param {JSON} emailContent - A JSON Object holding the non-dynamiccally generated content.  
//  */
// function formatEmail(params, emailContent){

//   // Createing the package section to be added into the body later
//   let packageText = "";
//   params.packages.forEach(element => {
//     packageText +=
//     "<div style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'><h3 style='margin:0em;padding:0em;border:0em;'>"+element.title+"</h3>"+
//     "<p style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'>"+element.summary+"</p><ol style='margin:0em;padding:0em;border:0em;padding-left:4%;text-align:justify;'>";
//     // Loop through and display all questions relating to selected package
//     element.questions.forEach(q =>{
//       packageText +=  " <li style='margin:0em;padding:0em;border:0em;'>"+q.questionText+" | "+q.questionInfo+"</li>";
//     });
//     packageText += "</ol><!-- End Questions --></div><!--End Package-->";
//   });
  
//   // Createing the solution section to be added into the body later
//   let solutionText = "";
//   params.solutions.forEach(element => {
//     solutionText += "<div style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'><h3 style='margin:0em;padding:0em;border:0em;'>"+element.title+"</h3>"+
//      "<p style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'>"+element.summary+"</p><ol style='margin:0em;padding:0em;border:0em;padding-left:4%;text-align:justify;'>";
//      // Loop through and display all questions relating to selected solution
//      element.questions.forEach(q =>{
//       solutionText += " <li style='margin:0em;padding:0em;border:0em;'>"+q.questionText+" | "+q.questionInfo+"</li>";
//      })
//      solutionText += "</ol><!-- End Questions --></div><!--End Solution-->";
//    });

//   //Add the start of our html template
//   let emailString = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
//   "<link href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap' rel='stylesheet'></head>"+
//   // Add the body of our document
//   "<body style='margin:0em;padding:0em;border:0em;background-color:#F1F4F4;font-family:Quicksand, sans-serif;font-size:18px;max-width:800px;margin:0 auto;padding:2%;color:565859;'>"+
//   "<div id='wrapper' style='margin:0em;padding:0em;border:0em;background-color:white;margin:0 auto;'>"+
    
//   "<!-- Header Section -->"+
  
//   "<header style='margin:0em;padding:0em;border:0em;'>"+
//       "<div id='logo' style='margin:0em;padding:0em;border:0em;float:left;margin:2% 0 0 5%;'>"+
//         "<img src='http://www.pattersonlaw.ca/Portals/_default/Skins/PattersonLaw/images/img-logo.png' alt='Patterson Law Logo' style='margin:0em;padding:0em;border:0em;max-width:100%;'>"+
//       "</div><!-- End Logo -->"+
//       "<div id='callout' style='margin:0em;padding:0em;border:0em;float:right;margin:3% 2% 2% 0;height:auto;overflow:hidden;'>"+
//         "<ul class='social' style='margin:0em;padding:0em;border:0em;list-style:none;margin-top:4%;padding:0;'>"+
//           "<li style='margin:0em;padding:0em;border:0em;display:inline;'><a href='https://www.facebook.com/PattersonLawNovaScotia/?ref=aymt_homepage_panel' target='_blank' style='margin:0em;padding:0em;border:0em;'><img src='http://www.pattersonlaw.ca/Portals/0/images/Facebook-icon..png' alt='Facebook Link' style='margin:0em;padding:0em;border:0em;max-width:100%;height:30px;width:30px;'></a></li>"+
//           "<li style='margin:0em;padding:0em;border:0em;display:inline;'><a href='https://www.linkedin.com/company/patterson-law/?trk=top_nav_home&originalSubdomain=ca' target='_blank' style='margin:0em;padding:0em;border:0em;'><img src='http://www.pattersonlaw.ca/Portals/0/images/linkedin-icon.png' alt='linkedin Link' style='margin:0em;padding:0em;border:0em;max-width:100%;height:30px;width:30px;'></a></li>"+
//           "<li style='margin:0em;padding:0em;border:0em;display:inline;'><a href='https://twitter.com/PattersonLawNS' target='_blank' style='margin:0em;padding:0em;border:0em;'><img src='http://www.pattersonlaw.ca/Portals/0/images/Twitter-icon.jpg' alt='Twitter Link' style='margin:0em;padding:0em;border:0em;max-width:100%;height:30px;width:30px;'></a></li>"+
//         "</ul><!--Social--></div><!-- Callout End -->"+
//     "</header><!-- Header End -->"+

//   "<!-- Banner Section -->"+
//     "<div class='banner' style='margin:0em;padding:0em;border:0em;margin-bottom:3%;'>"+
//       "<img src='https:"+ emailContent.headerImage.file.url +"' alt='Banner Background Image' style='margin:0em;padding:0em;border:0em;max-width:100%;'>"+
//       "</div><!-- Banner End -->"+

//     "<!-- Body Section-->"+
//     "<h2 style='margin:0em;padding:0em;border:0em;letter-spacing:1%;padding-left:2%;font-weight:500;'>Patterson Go Prep Questions</h2>"+
//     "<p style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'>"+
//       emailContent.introductionText+
//       "</p>"+

// "<div id='packages' style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'>"+packageText+

//     "</div><!--End Package-->"+ 

// "<div id='solution' style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;'>"+ solutionText +

//       "</div><!--End Solution-->"+
    

//     "<!-- Footer Section -->"+
//     "<div class='line' style='margin:0em;padding:0em;border:0em;clear:both;margin:4% auto;width:90%;height:2px;background-color:#E3E9E9;'></div>"+
//     "<!--End Line-->"+
//     "<p class='contact' style='margin:0em;padding:0em;border:0em;padding:2%;text-align:justify;text-align:center;margin-bottom:4%;'>"+
//       "Patterson Law <br style='margin:0em;padding:0em;border:0em;'>"+
//       emailContent.phoneNumber+"<br style='margin:0em;padding:0em;border:0em;'>"+
//       emailContent.address+"<br style='margin:0em;padding:0em;border:0em;'>"+
//       emailContent.email+
//       "</p>"+
//       "</div>"+
//   "<!--Wrapper End-->"+
// "</body>"+
// "</html>";
  


//   return emailString;
// }


// /**
//  * Sample Request
//  * 
// {
//     "address": "[email]",
//     "packages": [{
//                 "title": "Package name",
//                 "summary": "Detailed Description",
//                 "questions": [{
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     },
//                     {
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     }
                    
//                 ]
//             },
//             {
//                 "title": "Package 2",
//                 "summary": "Detailed Description",
//                 "questions": [{
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     },
//                     {
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     }
//                 ]
//             }
//         ],
//     "solutions": [{
//                 "title": "Solution",
//                 "summary": "Solutions Description",
//                 "questions": [{
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     },
//                     {
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     }
//                 ]

//             },
//             {
//                 "title": "Solution 2",
//                 "summary": "Solutions Description",
//                 "questions": [{
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     },
//                     {
//                         "id": 1,
//                         "questionText": "question1",
//                         "questionInfo": "This Is A Description"
//                     }
//                 ]

//         }
//     ]
// }
//  */