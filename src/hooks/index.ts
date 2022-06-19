import { userService } from '$lib/db/services';
import { getCookie, getUserCookie } from '$lib/utils/cookie';
import type { GetSession, Handle } from '@sveltejs/kit';
// import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = getCookie(event.request, 'user');
	if (userId) event.locals.user ??= await userService.get(userId);

	const {
		locals: { user },
		url
	} = event;

	const isAdminRoute = url.pathname.startsWith('/admin');
	const isAdmin = user?.role === 'ADMIN';
	if (isAdminRoute && !isAdmin) return Response.redirect(event.url.origin, 302);

	const response = await resolve(event);

	response.headers.set('Set-Cookie', getUserCookie(event.locals.user?.id ?? ''));
	return response;
};

export const getSession: GetSession = async ({ locals: { user } }) => {
	return { user };
};

// const getUser: Handle = async ({ event, resolve }) => {
// 	const userId = getCookie(event.request, 'user');
// 	if (userId) event.locals.user ??= await userService.get(userId);
// 	const response = await resolve(event);
// 	response.headers.set('Set-Cookie', getUserCookie(event.locals.user?.id ?? ''));
// 	return response;
// };

// const routeProtection: Handle = async ({ event, resolve }) => {
// 	const {
// 		locals: { user },
// 		url
// 	} = event;

// 	const isAdminRouteAndNotAdmin = url.pathname.startsWith('/admin') && user?.role !== 'ADMIN';

// 	if (isAdminRouteAndNotAdmin)
// 		return new Response(`Unauthorized`, {
// 			status: 302,
// 			headers: { location: '/' }
// 		});

// 	return await resolve(event);
// };

// export const handle = sequence(getUser, routeProtection);
