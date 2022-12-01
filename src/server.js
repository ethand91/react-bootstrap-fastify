const fastify = require('fastify')({ logger: true });

const { verifyToken } = require('./auth/token');

const PORT = process.env.PORT || 3001;

fastify.register(require('@fastify/swagger'), {});
fastify.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'API' },
    host: 'localhost:3001',
    basePath: '',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Posts', description: 'Posts API' },
      { name: 'Admins', description: 'Admins API' }
    ]
  }
});

fastify.decorate('verifyToken', verifyToken);
fastify.register(require('./routes/posts'));
fastify.register(require('./routes/admins'));

const startServer = async () => {
  try {
    await fastify.ready();
    fastify.swagger();
    await fastify.listen({ port: PORT });
  } catch(error) {
    fastify.log.error(error);

    process.exit(1);
  }
};

(async () => {
  await startServer();
})();
