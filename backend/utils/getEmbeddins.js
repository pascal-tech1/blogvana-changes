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

module.exports = main;
