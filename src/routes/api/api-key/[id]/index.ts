import { apiKeyService } from '$lib/db/services';
import type { RequestHandler } from '@sveltejs/kit';

export const del: RequestHandler = async ({ params }) => {
	const { id } = params;
	const removedApiKey = await apiKeyService.remove(id);

	if (!removedApiKey) return { status: 404 };
	return { body: removedApiKey };
};
