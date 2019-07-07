const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        user = user.id
    }
    const options = {
        expiresIn: '7d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = {
    generateToken
}