const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoutes = require("./route/users/usersRoute");
const postsRoutes = require("./route/posts/postsRoutes");
const connectDB = require("./config/db/dbConnect");
const commentRoutes = require("./route/comments/commentsRoutes");

const categoryRoutes = require("./route/category/categoryRoutes");
const cors = require("cors");
const {
	generalErrorHandle,
	NotFoundErrorhandler,
} = require("./middlewares/error/errorhandler");
const messageRoutes = require("./route/message/messageRoutes");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
// const { query } = require("./utils/getEmbeddins");

const app = express();

connectDB();

// defaut middleware
app.use(express.json());
app.use(cors());

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
		{
			headers: {
				Authorization: "Bearer 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",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/categorys", categoryRoutes);
app.use(NotFoundErrorhandler);
app.use(generalErrorHandle);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
