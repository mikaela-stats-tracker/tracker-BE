require('dotenv').config();
const express = require('express');

const middleware = require('./middleware/config');

const server = express();

middleware(server);

server.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: 'Your server is running, better go catch it' });
});

if (require.main == module) {
	server.listen(process.env.PORT, () => {
		console.log(
			`🚀 Server is running at http://localhost:${process.env.PORT}/`
		);
	});
} else {
	module.exports = server;
}
