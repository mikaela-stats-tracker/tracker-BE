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
	const [id] = await db('user')
		.insert(user)
		.returning('id');

	return findById(id);
}

// get all user
function find() {
	return db('user');
}

// get user by ID
function findById(id) {
	return db('user')
		.where({ id })
		.first();
}

// get user by filter
function findBy(filter) {
	return db('user').where(filter);
}

// update user
async function update(id, user) {
	const edited = await db('user')
		.where({ id })
		.update(user);
	return findById(id);
}

// delete user
function remove(id) {
	return db('user')
		.where({ id })
		.del();
}
