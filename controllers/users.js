const router = require('express').Router();
const Users = require('../models/Users');
const { generateToken } = require('../helpers/generateToken');

// Get all users
router.get('/', async (req, res) => {
	try {
		const users = await Users.find();
		const message = 'The users were found in the database.';
		res.status(200).json({ message, users });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the list of users'
		});

		throw new Error(error);
	}
});

// Get user by id
router.get('/byuser', async (req, res) => {
	try {
		const id = req.decodedJwt.subject;
		const user = await Users.findById(id);

		if (user) {
			res.status(200).json({
				message: 'The user was retrieved successfully',
				user
			});
		} else {
			res.status(404).json({
				message: 'Sorry, the user requested does not exist'
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Sorry but something went wrong while retrieving the user.'
		});

		throw new Error(error);
	}
});

// // edit user by Id
router.put('/', async (req, res) => {
	try {
		const id = req.decodedJwt.subject;

		const editedUser = await Users.update(id, req.body);
		const token = await generateToken(editedUser);

		res.status(200).json({
			message: 'The user was edited succesfully.',
			editedUser,
			token
		});
	} catch (error) {
		res.status(500).json({
			message: 'Sorry, there was an error when updating the user.'
		});
		throw new Error(error);
	}
});

// // delete user by Id
router.delete('/', async (req, res) => {
	try {
		const id = req.decodedJwt.subject;
		const user = await Users.findById(id);
		if (user) {
			await Users.remove(id);

			res.status(200).json({
				message: 'The user has been successfully removed.'
			});
		} else {
			res.status(404).json({
				message: 'Sorry, that user does not exist.'
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Sorry, there was an error deleting the user.'
		});

		throw new Error(error);
	}
});

module.exports = router;
