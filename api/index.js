const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const { promisify } = require("util");

const privateKey = "uvuahwodajwdnaiwdhaw";

const app = express();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},

	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const uploadMiddleware = multer({ storage: storage });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
	"mongodb+srv://dimas:mReZFoblOwnL7b7B@cluster0.augjlhc.mongodb.net/blog?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		await User.create({
			username,
			password: bcrypt.hashSync(password, 10),
		});
		res.status(201).json("Register successful");
	} catch (error) {
		if (error.name === "ValidationError")
			return res.status(403).json("Validation error");
		if (error.name === "MongoServerError")
			return res.status(409).json("Username is already taken");

		res.status(500).json(error.message);
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const userDoc = await User.findOne({ username });

		if (!userDoc) {
			const error = new Error("Username is not found");
			error.code = 404;
			throw error;
		}

		const passwordIsValid = bcrypt.compareSync(password, userDoc.password);

		if (!passwordIsValid) {
			const error = new Error("Password is not valid");
			error.code = 401;
			throw error;
		}

		const token = await promisify(jwt.sign)(
			{ username, id: userDoc._id },
			privateKey,
			{
				expiresIn: "1d",
			}
		);

		res
			.cookie("token", token, {
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				httpOnly: true,
			})
			.status(200)
			.json({ id: userDoc._id, username: userDoc.username });
	} catch (error) {
		res.status(error?.code || 500).json(error.message);
	}
});

app.get("/logout", (req, res) => {
	res.cookie("token", "").status(200).json("Logout successful");
});

app.post("/post", uploadMiddleware.single("imageFile"), async (req, res) => {
	const { token } = req.cookies;
	const { title, summary, content } = req.body;

	try {
		const info = await promisify(jwt.verify)(token, privateKey);

		await Post.create({
			title,
			summary,
			content,
			image: req.file.path,
			author: info.id,
		});

		res.status(201).json("Create post successfully");
	} catch (error) {
		console.log(error.name);
		res.status(500).json(error.message);
	}
});

app.get("/posts", async (req, res) => {
	try {
		const postsDoc = await Post.find()
			.populate("author", ["username"])
			.sort({ createdAt: -1 })
			.limit(20);

		res.status(200).json(postsDoc);
	} catch (error) {
		console.log(error.name);
		res.status(500).json(error.message);
	}
});

app.get("/post/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const postDoc = await Post.findById(id).populate("author", ["username"]);
		res.status(200).json(postDoc);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.get("/my-posts", async (req, res) => {
	const { token } = req.cookies;

	try {
		const info = await promisify(jwt.verify)(token, privateKey);

		const myPosts = await Post.find({ author: info.id });

		res.status(200).json(myPosts);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.listen(4000);
// mReZFoblOwnL7b7B
