import { apiKeyService, generationService, openaiService } from '$lib/db/services';
import { validatePromt } from '$lib/utils/validation';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const apiKey = searchParams.get('apiKey') ?? '';
	const prompt = searchParams.get('prompt') ?? '';

	const error = await validatePromt({ apiKey, title: prompt });

	if (error)
		return {
			status: 400,
			body: { error }
		};

	// Check api key.
	const key = await apiKeyService.getByKey(apiKey);
	if (!key)
		return {
			status: 404,
			body: { error: { apiKey: 'This API Key does not exist' } }
		};

	// Return cached output if exist.
	let generation = await generationService.getGeneration(prompt);
	if (generation)
		return {
			status: 200,
			body: generation
		};

	// Get openai prompt.
	const { data: completionData } = await openaiService.getCompletion(prompt);

	if (!completionData)
		return {
			status: 400,
			body: { error: { title: 'Some error ocurred retriving the title. Try again later' } }
		};

	// If everything went well. Log the request on db.
	generation = await generationService.logGeneration({
		apiKeyId: key.id,
		input: prompt,
		output: completionData.completion
	});

	return {
		status: 200,
		body: generation
	};
};
