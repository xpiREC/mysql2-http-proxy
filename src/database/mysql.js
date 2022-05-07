const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTIONLIMIT || 5,
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
});


let cache = [];
pool.on('release', (connection) => {
    let index = cache.indexOf(connection.threadId);
    if (cache[index] === undefined) {
        cache.push(connection.threadId);
        setTimeout(() => {
            cache.splice(index, 1);
            console.log('Connection %d released', connection.threadId);
            connection.ping();
        }, 30000);
    }
});

module.exports = pool;