import userService from '$lib/db/services/user.service';
import { getCookie, getUserCookie } from '$lib/utils/cookie';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const getUser: Handle = async ({ event, resolve }) => {
	const userId = getCookie(event.request, 'user');
	if (userId) event.locals.user ??= await userService.get(userId);
	const response = await resolve(event);
	response.headers.set('Set-Cookie', getUserCookie(event.locals.user?.id ?? ''));
	return response;
};

const routeProtection: Handle = async ({ event, resolve }) => {
	const {
		locals: { user },
		url
	} = event;

	const isAdminRouteAndNotAdmin = url.pathname.startsWith('/admin') && user?.role !== 'ADMIN';

	if (isAdminRouteAndNotAdmin)
		return new Response(`Unauthorized`, {
			status: 302,
			headers: { location: '/' }
		});

	return await resolve(event);
};

export const handle = sequence(getUser, routeProtection);

export const getSession: GetSession = async ({ locals: { user } }) => {
	return { user };
};
