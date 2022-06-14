import type { RequestHandler } from '@sveltejs/kit';
import { apiKeyService } from '$lib/db/services';

export const get: RequestHandler = async () => {
	const keys = await apiKeyService.list();
	return { body: { keys } };
};
