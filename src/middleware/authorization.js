module.exports = async (req, res, next) => {
    let headers = req.headers;
    let configToken = process.env.TOKEN_AUTHORIZATION || Math.random().toString(36).substring(2, 32);
    if (!headers.authorization || headers.authorization.indexOf('Token ') === -1 || headers.authorization.split(' ')[1] !== configToken) {
        return res.status(401).send({
            message: 'Missing Authorization Header'
        });
    }

    next();
}