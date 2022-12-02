const {
  addPostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
  deletePostSchema
} = require('./../schemas/posts');
const headerSchema = require('./../schemas/header');
const {
  addPostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
  deletePostHandler
} = require('./../handlers/posts');

const postsOptions = {
  schema: getPostsSchema,
  handler: getPostsHandler 
};

const postOptions = {
  schema: getPostSchema,
  handler: getPostHandler
};

const addPostOptions = {
  headers: headerSchema,
  schema: addPostSchema,
  handler: addPostHandler
};

const updatePostOptions = {
  headers: headerSchema,
  schema: updatePostSchema,
  handler: updatePostHandler
};

const deletePostOptions = {
  headers: headerSchema,
  schema: deletePostSchema,
  handler: deletePostHandler
};

const postRoutes = (fastify, options, done) => {
  fastify
    .register(require('@fastify/auth'))
    .after(() => privatePostRoutes(fastify));

  done();
};

const privatePostRoutes = (fastify) => {
  fastify.get('/api/posts', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...postsOptions
  });

  fastify.get('/api/posts/:id', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...postOptions
  });

  fastify.post('/api/posts', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...addPostOptions
  });

  fastify.put('/api/posts/:id', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...updatePostOptions 
  });

  fastify.delete('/api/posts/:id', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...deletePostOptions
  });
};

module.exports = postRoutes;
