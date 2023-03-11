const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");

const privateKey = "uvuahwodajwdnaiwdhaw";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

mongoose.connect(
	"mongodb+srv://dimas:mReZFoblOwnL7b7B@cluster0.augjlhc.mongodb.net/blog?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const userDoc = await User.create({
			username,
			password: bcrypt.hashSync(password, 10),
		});
		res.status(201).json("register success");
	} catch (error) {
		if (error.name === "ValidationError")
			return res.status(403).json("validation error");
		if (error.name === "MongoServerError")
			return res.status(409).json("username is already taken");

		res.status(500).json("Something went wrong");
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const userDoc = await User.findOne({ username });

		if (!userDoc) {
			const error = new Error("username is not found");
			error.code = 404;
			throw error;
		}

		const passwordIsValid = bcrypt.compareSync(password, userDoc.password);

		if (passwordIsValid) {
			jwt.sign(
				{ username, id: userDoc._id },
				privateKey,
				{},
				function (err, token) {
					if (err) throw new Error("Something went wrong");
					res.cookie("token", token).json("ok");
				}
			);
		} else {
			const error = new Error("password is not valid");
			error.code = 401;
			throw error;
		}
	} catch (error) {
		res.status(error.code).json(error.message);
	}
});

app.listen(4000);
// mReZFoblOwnL7b7B
