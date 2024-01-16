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
const PlayHT = require("playht");
// const { slicedArray } = require("./utils/splitStringIntoArray");

PlayHT.init({
	apiKey: "8d87d023e0f84fa681b6c717594d3375",
	userId: "EoJx53yPDBOTD5x2SiGr9b14hqI3",
	defaultVoiceId:
		"s3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json",
	defaultVoiceEngine: "PlayHT2.0",
});


const app = express();

connectDB();

// defaut middleware
app.use(express.json());
app.use(cors());

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
