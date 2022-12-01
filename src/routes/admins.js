const {
  getAdminsSchema,
  newAdminSchema,
  loginAdminSchema
} = require('./../schemas/admins');
const headerSchema = require('./../schemas/header');
const {
  getAdminsHandler,
  newAdminHandler,
  loginAdminHandler
} = require('./../handlers/admins');

const getAdminsOptions = {
  header: headerSchema,
  schema: getAdminsSchema,
  handler: getAdminsHandler
};

const newAdminOptions = {
  header: headerSchema,
  schema: newAdminSchema,
  handler: newAdminHandler
};

const loginAdminOptions = {
  header: headerSchema,
  schema: loginAdminSchema,
  handler: loginAdminHandler
};

const adminRoutes = (fastify, options, done) => {
  fastify.post('/api/admins', newAdminOptions);
  fastify.post('/api/admins/login', loginAdminOptions);

  fastify
    .register(require('@fastify/auth'))
    .after(() => privateAdminRoutes(fastify));

  done();
};

const privateAdminRoutes = (fastify) => {
  fastify.get('/api/admins', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getAdminsOptions
  }); 
}

module.exports = adminRoutes;
