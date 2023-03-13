const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: String,
		summary: String,
		image: String,
		content: String,
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
