const { dbPool } = require("../config/db");

// A different file for all the request handlers that responds to their respective requests.

// This function returns all person from the database.
async function getAllPersons(req, res) {
	const dbConnection = await dbPool.getConnection(); // Opening a connection from the database pool

	const query = "SELECT * FROM person;";
	try {
		const [results] = await dbConnection.query(query); // Running a database query.
		dbConnection.release(); // Closing the database connection.
		if (!results) {
			// Checking if the results is an empty array.
			return res
				.status(404)
				.json({ message: "No persons found!", success: false });
		}
		return res.status(200).json(results); // Returing an array of persons.
	} catch (error) {
		return res.status(400).json({ message: error, success: false }); // Database error handling
	}
}

// This function returns a particular person with given id.
async function getOnePerson(req, res) {
	const dbConnection = await dbPool.getConnection(); // Opening a connection from the database pool
	const query = `SELECT * FROM person WHERE id = ${Number(
		req.params.personId
	)};`; // Accessing route parameter. Number() converts string into number (instead of parseInt)
	try {
		const [results] = await dbConnection.query(query); // Running the query.
		dbConnection.release(); // Closing the connection.
		if (!results) {
			// Checking if the results is an empty array.
			return res
				.status(404)
				.json({ message: "Person Not Found!", success: false });
		}
		return res.status(200).json(results); // Returning a person.
	} catch (error) {
		return res.status(400).json({ message: error, success: false }); // Database error handling
	}
}

// This function creates a new person in the database.
async function createPerson(req, res) {
	const dbConnection = await dbPool.getConnection();
	const data = req.body; // Accessing the data from the POST request.
	const currentDate = new Date(); // Get current date-time: Sun Jan 14 2024 17:39:49 GMT+0530 (India Standard Time)
	const formattedDate = currentDate
		.toISOString()
		.slice(0, 19)
		.replace("T", " "); // Formatting the date-time to: 2024-01-14 12:09:49

	const query = `INSERT INTO person(name,date_of_birth,address,gender,email_address,phone_number,blood_group,created_at) VALUES ("${data.name}","${data.dateOfBirth}","${data.address}","${data.gender}","${data.emailAddress}","${data.phoneNumber}","${data.bloodGroup}","${formattedDate}")`;
	// Insert query
	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			// Checking if data is not inserted and returing an error message.
			return res
				.status(400)
				.json({ message: "Person Not Created", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Created!", success: true });
		// Returning data is inserted with a success message
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
		// Handling database errors.
	}
}

// This function updates an existing person in the database with a particular id.
async function updatePerson(req, res) {
	const dbConnection = await dbPool.getConnection();
	const data = req.body; // Accessing request data.
	const query = `UPDATE person SET name="${data.name}",date_of_birth="${
		data.dateOfBirth
	}",address="${data.address}",gender="${data.gender}",email_address="${
		data.emailAddress
	}",phone_number="${data.phoneNumber}",blood_group="${
		data.bloodGroup
	}" WHERE id=${Number(req.params.personId)}`;
	// Update query.
	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			// Checking if data is not updated and sending an error message.
			return res
				.status(400)
				.json({ message: "Person Not Updated", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Updated!", success: true });
		// Returning data is updated with a success message
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
		// Handling database errors.
	}
}

// This function deletes an existing person in the database with a particular id.
async function deletePerson(req, res) {
	const dbConnection = await dbPool.getConnection();
	const query = `DELETE FROM person WHERE id=${Number(req.params.personId)}`;
	// Delete query
	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			// Checking if data is not deleted and sending an error message.
			return res
				.status(400)
				.json({ message: "Person Not Deleted", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Deleted!", success: true });
		// Returning data is deleted with a success message
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
		// Handling database errors.
	}
}
module.exports = {
	getAllPersons,
	getOnePerson,
	createPerson,
	updatePerson,
	deletePerson,
};
