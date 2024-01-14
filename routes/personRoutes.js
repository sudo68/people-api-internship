const express = require("express");
const {
	getAllPersons,
	getOnePerson,
	createPerson,
	updatePerson,
	deletePerson,
} = require("../handlers/personHandler");
const personRouter = express.Router();

personRouter.get("/", getAllPersons);
personRouter.get("/:personId", getOnePerson);
personRouter.post("/", createPerson);
personRouter.put("/:personId", updatePerson);
personRouter.delete("/:personId", deletePerson);

module.exports = { personRouter };
