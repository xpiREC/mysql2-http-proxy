const mysql = require('../database/mysql');
const handlingAsync = require('../utils/handlingAsync');

module.exports = {
    query: async (req, reply) => {

        const { query } = req.body;

        if (query === undefined) {
            return reply.code(400).send({
                message: 'Missing query'
            });
        }

        const [success, error] = await handlingAsync(mysql.query(query));
        if (error) return reply.code(500).send(error);
        return (success && success[0].length === 1) ? success[0][0] : success[0];
    },

    execute: async (req, reply) => {

        const { query } = req.body;
        const { parameters } = req.body;

        if (query === undefined || parameters === undefined) {
            return reply.code(400).send({
                message: 'Missing query or parameters'
            });
        }

        const [success, error] = await handlingAsync(mysql.execute(query, parameters));
        if (error) return reply.code(500).send(error);
        return (success && success[0].length === 1) ? success[0][0] : success[0];
    }
}