const { config } = require("dotenv");
// Load the dotenv config.
config();

const fastify = require('fastify')({
    logger: true
});

fastify.addHook('onRequest', require('./middleware/cros'));
fastify.register(require('./routes/index'));

module.exports = fastify;