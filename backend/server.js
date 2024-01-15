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

PlayHT.init({
	apiKey: "8d87d023e0f84fa681b6c717594d3375",
	userId: "EoJx53yPDBOTD5x2SiGr9b14hqI3",
	defaultVoiceId:
		"s3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json",
	defaultVoiceEngine: "PlayHT2.0",
});

// // Generate audio from text
// (async function () {
// 	const text = [
// 		`In the context of organizations, high psychological safety drives performance and innovation, while its absence leads to reduced productivity and increased burnout. Google’s Project Aristotle demonstrated that IQ and financial resources are not always synonymous with effective outcomes. In fact, the study identified psychological safety as the most crucial factor in `,
// 		`    explaining high performance. — Excerpt from the book “The 4 Stages of Psychological Safety”.

// 	The subtitle of the book is “Defining the Path to Inclusion and Innovation”, and in it, the author compellingly argues that innovation is limited in environments lacking psychological safety. Even if innovation is not a direct goal for you or your company, this discussion offers a renewed`,
// 		`perspective on people and organizations. I was grateful and surprised by the opportunity to explore this theme more deeply, the most impactful aspects of which I share in this article.
// 	Respect, Permission, and Psychological Safety
	
// 	In the image above, observe two fundamental variables on the gragh axes: respect and`,
// 	];
// 	try {
// 		for (const element of text) {
// 			console.log(element);
// 			const generated = await PlayHT.generate(element);

// 			// Grab the generated file URL
// 			const { audioUrl } = generated;

// 			console.log("The url for the audio file is", audioUrl);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// })();

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
