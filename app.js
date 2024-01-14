const express = require("express");
const { headers } = require("./middleware");
const { personRouter } = require("./routes/personRoutes");

// Imported PORT variable from the .env file.
const port = process.env.PORT || 8000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Using our headers middleware from ./middleware.js
app.use(headers);
// Using our product router from ./routes/personRoutes.js
app.use("/api/person", personRouter);

app.get("/", (req, res) => {
	return res.status(200).send("<h1>Welcome to People API.</h1>");
});

app.listen(port, () => {
	console.log(`Product API is running at http://localhost:${port}`);
});
