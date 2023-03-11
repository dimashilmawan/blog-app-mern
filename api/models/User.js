const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: "string",
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 15,
		unique: true,
	},
	password: {
		type: "string",
		required: true,
		trim: true,
		minlength: 4,
	},
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
