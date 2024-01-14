const express = require("express");
const { headers } = require("./middleware");
const { personRouter } = require("./routes/personRoutes");

const port = 3000 || 8000;
console.log(process.env.PORT);
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(headers);
app.use("/api/person", personRouter);

app.get("/", (req, res) => {
	return res.status(200).send("<h1>Welcome to People API.</h1>");
});

app.listen(port, () => {
	console.log(`Product API is running at http://localhost:${port}`);
});
