import type { RequestHandler } from '@sveltejs/kit';
import { apiKeyService } from '$lib/db/services';
import { validateApiKey } from '$lib/utils/validation';

export const post: RequestHandler = async ({ request }) => {
	const { name } = await request.json();

	const errors = await validateApiKey(name);
	if (errors)
		return {
			status: 400,
			body: {
				error: errors.name
			}
		};

	const apiKey = await apiKeyService.create(name);
	return { body: apiKey, status: 201 };
};
