const headerSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: { type: 'string' }
  }
};

module.exports = headerSchema;
