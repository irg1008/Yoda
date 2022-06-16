import type { LogInData } from '$lib/db/models';
import { userService } from '$lib/db/services';
import { hash } from '$lib/utils/crypto';
import { getRequestFormData } from '$lib/utils/form';
import { validateLogInData } from '$lib/utils/validation';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	// userService.create({
	// 	username: 'admin',
	// 	email: 'admin@admin.com',
	// 	password: 'admin',
	// 	verified: true,
	// 	role: 'ADMIN'
	// });

	if (locals?.user)
		return {
			status: 302,
			headers: {
				location: '/'
			}
		};

	return {
		body: {}
	};
};

export const post: RequestHandler = async ({ request, locals }) => {
	const data = await getRequestFormData<LogInData>(request);

	// Validate form data.
	const errors = await validateLogInData(data);
	if (errors) return { body: { errors } };

	// Check user exists.
	const user = await userService.getByEmail(data.email);
	if (!user) {
		return {
			body: {
				data,
				errors: { email: 'Email does not exist' }
			}
		};
	}

	// Check is verified.
	if (!user.verified) {
		return {
			body: {
				data,
				errors: { email: 'User is not verified' }
			}
		};
	}

	// Check user and password are correct.
	const isCorrectPassword = user.password === hash(data.password);
	if (!isCorrectPassword) {
		return {
			body: {
				data,
				errors: { password: 'Incorrect password' }
			}
		};
	}

	// Set user and redirect to home.
	locals.user = user;
	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
};
