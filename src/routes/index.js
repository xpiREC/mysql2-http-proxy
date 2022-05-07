const ProxyController = require('../controllers/ProxyController');
const Authorization = require('../middleware/authorization');


/* TODO: Export to require */
const schemaHeaders = {
    headers: {
        type: 'object',
        properties: {
            'authorization': { type: 'string' }
        },
        required: ['authorization']
    }
}

module.exports = async (fastify, opts) => {
    fastify.post('/query', {
        schema: {
            headers: schemaHeaders,
            body: {
                type: 'object',
                properties: {
                    query: { type: 'string' }
                },
                required: ['query']
            }
        }, preHandler: [Authorization]
    }, ProxyController.query);
    fastify.post('/execute', {
        schema: {
            headers: schemaHeaders,
            body: {
                type: 'object',
                properties: {
                    query: { type: 'string' },
                    parameters: { type: 'array' }
                },
                required: ['query', 'parameters']
            }
        }, preHandler: [Authorization]
    }, ProxyController.execute);
}