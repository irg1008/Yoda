import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	locals.user = null;

	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
};
