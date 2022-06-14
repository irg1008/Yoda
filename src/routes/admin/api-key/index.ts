import type { RequestHandler } from '@sveltejs/kit';
import { apiKeyService } from '$lib/db/services';
import { validateApiKey } from '$lib/utils/validation';

export const post: RequestHandler = async ({ request }) => {
	const { name } = await request.json();

	const error = await validateApiKey(name);

	if (error)
		return {
			status: 400,
			body: { error }
		};

	const apiKey = await apiKeyService.create(name);
	return { body: apiKey, status: 201 };
};
