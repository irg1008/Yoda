import { apiKeyService } from '$lib/db/services';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const apiKey = searchParams.get('apiKey');
	if (!apiKey) return {};

	const exists = await apiKeyService.exists(apiKey);
	return {
		body: {
			apiKeyError: !exists && 'Invalid params API Key',
			apiKey
		}
	};
};
