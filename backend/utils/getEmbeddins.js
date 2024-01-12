const { HfInference } = require("@huggingface/inference");
const hf = new HfInference("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");

async function main(input) {
	const output = await hf.featureExtraction({
		model: "thenlper/gte-small",
		inputs: input,
		pooling: "mean",
		normalize: true,
	});

	return output;
}

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
		{
			headers: {
				Authorization: "Bearer {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}",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	console.log(result);
	return result;
}

module.exports = { main, query };
