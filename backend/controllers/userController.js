const mongoose = require('mongoose');
const User = mongoose.model('User');
const okCode = 200;
const created = 201;
const unprocessable = 422;
const serverError = 500;

exports.getAllUsers = async (request, response) => { //get all users
	try {
		const method = request.method;
		if(method === 'GET') {
			const allUsers  = await User.find(); //Getting users from the database
			return response.status(okCode).json({ //http code 200 (OK)
				allUsers
			});
		}
	}
	catch(error) { //Catching errors

		if(error) {
			return response.status(serverError).json({ //http error code 500 (Internal Server error)
				message: error.message
			});
		}
	}
}

exports.getUserById = async (request, response) => { //Get a user by _id 
	try {
		const method = request.method;
		const url = request.url;

		if(method === 'GET' && url.startsWith('/')) {

			const id = request.params.id; //Request parameters
			const userId = await User.findById(id); 
			return response.status(okCode).json({ //http code 200 (OK)
			userId
			}); 
		}
	}
	catch(error) {
		if(error) {
			return response.json({
				message: error.message
			});
		}
	}
}

exports.getUsername = async (request, response) => { //Get user by username
	try {
		const method = request.method; 

		if(method === 'GET') {

			const body = request.body; //Getting the username
			const userName = await User.findOne().where('username').equals(body); //searches for users using the provided username 
			return response.status(okCode).json({ //http code 200 (OK)
			userName
			}); 
		}
	}
	catch(error) {
		if(error) {
			return response.status(serverError).json({ 
				message: error.message
			});
		}
	}
}

exports.registerUser = async (request, response) => { //Create a new user
	try {
		const method = request.method;

		//Getting signup information from user
		const {username, email, password} = request.body;

		if (!username || !email || !password ) { //Verifying that all information is present. Can this be written better?
			return response.status(unprocessable).json({ //http error code 422 (Unprocessable entity). Is this the correct code to use for missing parameters?
				message: 'Not enough information provided'
			});
		}

		if(method === 'POST') {

			const newUser = new User({username, email, password});
			await newUser.save(); //Saving new user to database

			return response.status(created).json({ //http code 201 (Created)
				newUser,
				createdAt: Date.now()
			});
		}
	}
	
	catch(error) {

		if(error) {
			return console.error(error);
		}
	}
}

exports.editUser = async (request, response) => {
	try {
		const method = request.method;
		const id = request.params.id;

		if(!isNaN(id)) { //Tests if id is a number. not(not-a-number)
			return response.status(serverError).json({ //http error code 500 (Internal server error). Generic
				message: 'ID invalid'
			});
		}

		if(method === 'PATCH') {
			const updateUser = await User.findByIdAndUpdate(id, request.body); //Finds user by id and then updates with content of request body.
			return response.status(okCode).json({ //http code 200 (OK)
				updateUser, updatedAt: Date.now()
			});
		}
	}
	catch(error) {
		if(error) {
			return response.status(serverError).json({ 
				message: error.message
			});
		}
	}
}

exports.deleteAllUsers = async (request, response) => {
	try {

		const method = request.method;
		if(method === 'DELETE') {

			await User.deleteMany(); // Delete all users from database

			return response.status(okCode).json({ //http code 200 (OK)
				message: 'All users successfully deleted',
				deletedAt: Date.now()
			});
		}
	}
	catch(error) {
		if(error) {
			return response.status(serverError).json({ 
				message: error.message
			});
		}
	}
}

exports.deleteUserById = async (request, response) => { //Delete a user by id
	try {
		const method = request.method;
		const id = request.params.id;
		if(method === 'DELETE') {
			await User.findByIdAndDelete(id);
			return response.status(200).json({ //http code 200 (OK)
				message: 'User deleted successfully',
				deletedAt: Date.now()
			});
		}
	}
	catch(error) {
		if(error) {
			return response.status(500).json({ 
				message: error.message
			});
		}
	}
}