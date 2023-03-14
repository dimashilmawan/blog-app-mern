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
		console.log(typeof userDoc._id);

		if (passwordIsValid) {
			jwt.sign(
				{ username, id: userDoc._id },
				privateKey,
				{},
				function (err, token) {
					if (err) throw new Error("Something went wrong");
					res.cookie("token", token).status(200).json({
						id: userDoc._id,
						username,
					});
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

app.post("/logout", (req, res) => {
	res.cookie("token", "").status(200).json("logout successful");
});

app.post("/post", uploadMiddleware.single("imageFile"), async (req, res) => {
	const { token } = req.cookies;
	// console.log(token);
	const { title, summary, content } = req.body;

	jwt.verify(token, privateKey, {}, async (err, info) => {
		if (err) throw new Error("Something went wrong");

		await Post.create({
			title,
			summary,
			content,
			image: req.file.path,
			author: info.id,
		});
		res.status(201).json("Create post successfully");
	});
});

app.get("/posts", async (req, res) => {
	const postsDoc = await Post.find()
		.populate("author", ["username"])
		.sort({ createdAt: -1 })
		.limit(20);

	res.status(200).json({ posts: postsDoc });
});

app.get("/post/:id", async (req, res) => {
	const { id } = req.params;
	const postDoc = await Post.findById(id).populate("author", ["username"]);
	res.status(200).json({ post: postDoc });
});

app.get("/my-posts", async (req, res) => {
	const { token } = req.cookies;

	jwt.verify(token, privateKey, {}, async (err, info) => {
		if (err) throw new Error("Something went wrong");

		const myPosts = await Post.find({ author: info.id });
		res.status(200).json({ myPosts });
	});
});

app.listen(4000);
// mReZFoblOwnL7b7B
