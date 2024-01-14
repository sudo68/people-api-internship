const express = require("express");
const {
	getAllPersons,
	getOnePerson,
	createPerson,
	updatePerson,
	deletePerson,
} = require("../handlers/personHandler");
// Creating a new router only for products resource.
const personRouter = express.Router();

// Assigning the router to their respective handlers imported from ../handlers.js
personRouter.get("/", getAllPersons);
personRouter.get("/:personId", getOnePerson);
personRouter.post("/", createPerson);
personRouter.put("/:personId", updatePerson);
personRouter.delete("/:personId", deletePerson);

// Exporting the personRouter.
module.exports = { personRouter };
