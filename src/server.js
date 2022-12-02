const fastify = require('fastify')({ logger: true });
const path = require('path');
const cors = require('@fastify/cors');

const { verifyToken } = require('./auth/token');

const PORT = process.env.PORT || 3000;

fastify.register(require('@fastify/swagger'), {});
fastify.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'API' },
    host: 'localhost:3000',
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

fastify.register(cors, {
  origin: '*' 
});
fastify.decorate('verifyToken', verifyToken);
fastify.register(require('./routes/posts'));
fastify.register(require('./routes/admins'));
fastify.register(require('./routes/callback'));

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../app/build/'),
  prefix: '/',
  wildcard: false
});

fastify.setNotFoundHandler(function (req, res) {
  res.sendFile('index.html');
});

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
