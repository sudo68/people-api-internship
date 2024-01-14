const { dbPool } = require("../config/db");

// This function returns all person from the database.
const getAllPersons = async (req, res) => {
	const dbConnection = await dbPool.getConnection();

	const query = "SELECT * FROM person;";
	try {
		const [results] = await dbConnection.query(query);
		dbConnection.release();
		return res.status(200).json(results);
	} catch (error) {
		return res.status(400).json({
			message: "Could not fetch the data",
			success: false,
		});
	}
};

// This function returns a particular person with given id.
const getOnePerson = async (req, res) => {
	const dbConnection = await dbPool.getConnection();
	const query = `SELECT * FROM person WHERE id = ${Number(
		req.params.personId
	)};`;
	try {
		const [results] = await dbConnection.query(query);
		dbConnection.release();
		return res.status(200).json(results);
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
	}
};

// This function creates a new person in the database.
const createPerson = async (req, res) => {
	const dbConnection = await dbPool.getConnection();
	const data = req.body;
	const currentDate = new Date();
	const formattedDate = currentDate
		.toISOString()
		.slice(0, 19)
		.replace("T", " ");

	const query = `INSERT INTO person(name,date_of_birth,address,gender,email_address,phone_number,blood_group,created_at) VALUES ("${data.name}","${data.dateOfBirth}","${data.address}","${data.gender}","${data.emailAddress}","${data.phoneNumber}","${data.bloodGroup}","${formattedDate}")`;

	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			return res
				.status(400)
				.json({ message: "Person Not Created", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Created!", success: true });
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
	}
};

// This function updates an existing person in the database with a particular id.
const updatePerson = async (req, res) => {
	const dbConnection = await dbPool.getConnection();
	const data = req.body;
	const query = `UPDATE person SET name="${data.name}",date_of_birth="${
		data.dateOfBirth
	}",address="${data.address}",gender="${data.gender}",email_address="${
		data.emailAddress
	}",phone_number="${data.phoneNumber}",blood_group="${
		data.bloodGroup
	}" WHERE id=${Number(req.params.personId)}`;

	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			return res
				.status(400)
				.json({ message: "Person Not Updated", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Updated!", success: true });
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
	}
};

// This function deletes an existing person in the database with a particular id.
const deletePerson = async (req, res) => {
	const dbConnection = await dbPool.getConnection();
	const query = `DELETE FROM person WHERE id=${Number(req.params.personId)}`;
	try {
		const [results] = await dbConnection.query(query);
		if (!results.affectedRows) {
			return res
				.status(400)
				.json({ message: "Person Not Deleted", success: false });
		}
		dbConnection.release();
		return res
			.status(200)
			.json({ message: "Person Deleted!", success: true });
	} catch (error) {
		return res.status(400).json({ message: error, success: false });
	}
};
module.exports = {
	getAllPersons,
	getOnePerson,
	createPerson,
	updatePerson,
	deletePerson,
};
