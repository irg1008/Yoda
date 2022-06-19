import { userService } from '$lib/db/services';
import { getCookie, getUserCookie } from '$lib/utils/cookie';
import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = getCookie(event.request, 'user');
	if (userId) event.locals.user ??= await userService.get(userId);

	const response = await resolve(event);
	response.headers.set('Set-Cookie', getUserCookie(event.locals.user?.id ?? ''));
	return response;
};

export const getSession: GetSession = async ({ locals: { user } }) => {
	return { user };
};
