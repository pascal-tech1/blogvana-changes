import axios from "axios";
import cheerio from "cheerio";
import fs from "fs/promises";

export async function scrapeMediumPosts() {
	try {
		const response = await axios.get("https://medium.com/your-category"); // Replace with the desired category URL

		const $ = cheerio.load(response.data);

		const posts = [];

		// Adjust the selectors based on the actual structure of Medium's HTML
		$(".post").each((index, element) => {
			const title = $(element).find(".post-title").text();
			const imageUrl = $(element).find(".post-image").attr("src");
			const description = $(element).find(".post-description").text();
			const content = $(element).find(".post-content").html();

			const post = {
				title,
				imageUrl,
				description,
				content,
			};

			posts.push(post);
		});

		// Save the scraped data to a JSON file
		fs.writeFileSync("medium_posts.json", JSON.stringify(posts, null, 2));

		console.log("Scraping complete. Data saved to medium_posts.json");
	} catch (error) {
		console.error("Error:", error.message);
	}
}
