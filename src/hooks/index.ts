import userService from '$lib/db/services/user.service';
import { getCookie, getUserCookie } from '$lib/utils/cookie';
import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = getCookie(event.request, 'user');
	if (userId) event.locals.user ??= await userService.get(userId);

	const { user } = event.locals;
	const isAdminRoute = event.url.pathname.startsWith('/admin');
	if (isAdminRoute && user?.role !== 'ADMIN')
		return new Response(`${user?.role}`, {
			status: 402,
			headers: { location: '/' }
		});

	const response = await resolve(event);
	response.headers.set('Set-Cookie', getUserCookie(event.locals.user?.id ?? ''));
	return response;
};

export const getSession: GetSession = async ({ locals: { user } }) => {
	return { user };
};
