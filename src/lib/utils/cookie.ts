import { parse, serialize } from 'cookie';

const _getCookies = (request: Request) => request.headers.get('cookie');

const getCookie = <T = string>(request: Request, key: string) => {
	const cookies = _getCookies(request);
	return cookies ? (parse(cookies)[key] as T) : null;
};

const getUserCookie = (value: string) => {
	return serialize('user', value, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/'
	});
};

export { getCookie, getUserCookie };
