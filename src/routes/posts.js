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
  fastify.get('/api/posts', postsOptions);
  fastify.get('/api/posts/:id', postOptions);

  fastify
    .register(require('@fastify/auth'))
    .after(() => privatePostRoutes(fastify));

  done();
};

const privatePostRoutes = (fastify) => {
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
