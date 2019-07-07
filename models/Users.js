const db = require('../data/dbconfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
};

// create user
async function add(user) {
	const [id] = await db('users')
		.insert(user)
		.returning('id');

	return findById(id);
}

// get all users
function find() {
	return db('users');
}

// get users by ID
function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

// get user by filter
function findBy(filter) {
	return db('users').where(filter);
}

// update user
async function update(id, user) {
	const edited = await db('users')
		.where({ id })
		.update(user);
	return findById(id);
}

// delete user
function remove(id) {
	return db('users')
		.where({ id })
		.del();
}
