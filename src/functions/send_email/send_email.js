// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = function(event, context, callback) {
  callback(null, {
      statusCode: 200,
      body: "Hello, World"
  });
};