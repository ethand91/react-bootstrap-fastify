const getAdminsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          email: { type: 'string' }
        }
      }
    }
  }
};

const newAdminSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    }
  },
  response: {
    200: { type: 'string' }
  }
};

const loginAdminSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      }
    }
  }
};

module.exports = {
  getAdminsSchema,
  newAdminSchema,
  loginAdminSchema
};
