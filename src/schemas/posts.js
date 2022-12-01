const getPostsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          body: { type: 'string' }
        }
      }
    }
  }
};

const getPostSchema = {
  params: {
    id: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        body: { type: 'string' }
      }
    }
  }
};

const addPostSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: { type: 'string' },
      body: { type: 'string' }
    },
  },
  response: {
    200: { type: 'string' }
  }
};

const updatePostSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: { type: 'string' },
      body: { type: 'string' }
    }
  },
  params: {
    id: { type: 'number' }
  },
  response: {
    200: { type: 'string' }
  }
};

const deletePostSchema = {
  params: {
    id: { type: 'number' }
  },
  response: {
    200: { type: 'string' }
  }
};

module.exports = {
  addPostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
  deletePostSchema
};
