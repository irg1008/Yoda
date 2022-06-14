import { apiKeyService } from '$lib/db/services';
import openaiService from '$lib/db/services/openai.service';
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
	const exists = await apiKeyService.exists(apiKey);
	if (!exists)
		return {
			status: 404,
			body: { error: { apiKey: 'This API Key does not exist' } }
		};

	// Get openai prompt.
	const { data, error: completionError } = await openaiService.getCompletion(prompt);

	if (completionError)
		return {
			status: 400,
			body: { error: { title: 'Some error ocurred retriving the title. Try again later' } }
		};

	return {
		status: 200,
		body: data
	};
};
