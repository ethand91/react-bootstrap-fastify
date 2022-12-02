const headerSchema = require('./../schemas/header');
const { getCallbackHandler } = require('./../handlers/callback'); 

const callbackOptions = {
  header: headerSchema,
  handler: getCallbackHandler
}

const callbackRoutes = (fastify, options, done) => {
  fastify.get('/api/callback', callbackOptions);

  done();
};

module.exports = callbackRoutes;
