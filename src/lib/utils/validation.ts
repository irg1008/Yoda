import type { LogInData, PromptData, SignUpData } from '$lib/db/models';
import { object, string, ref, ValidationError } from 'yup';
import type { AnyObjectSchema } from 'yup';
import { consts } from '$lib/openai/config/consts';

const _validate = async <T>(schema: AnyObjectSchema, data: T) => {
	try {
		await schema.validate(data, { abortEarly: false });
		return null;
	} catch (err) {
		const errors: Record<string, string> = {};
		const { inner } = err as ValidationError;
		inner.forEach(({ path, message }) => {
			if (path) errors[path] = message;
		});
		return errors as Record<keyof T, string>;
	}
};

const signUpSchema = object().shape({
	username: string().required('Username is required'),
	email: string().email('Invalid email').required('Email is required'),

	password: string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),

	confirmPassword: string()
		.oneOf([ref('password'), null], 'Passwords must match')
		.required('Confirm password is required')
});

const logInSchema = object().shape({
	email: string().email('Invalid email').required('Email is required'),
	password: string().required('Password is required')
});

const createApiKeySchema = object().shape({
	name: string()
		.min(3, 'Api Key name must be 3 or more or more charcaters ')
		.required('Api Key name is required')
});

const promptSchema = object().shape({
	apiKey: string().required('You need one of this mate'),
	title: string()
		.required('Seriously, you want to shorten emptyness?')
		.max(consts.maxPromptLength, 'Title must be 150 characters or less')
});

const suggestionSchema = object().shape({
	suggestion: string()
		.min(3, "You think that's SEO friendly?")
		.required('You have come all this way to type nothing?')
		.max(100, 'Dude, do you know what "short title" means')
});

export const validateLogInData = (data: LogInData) => _validate(logInSchema, data);
export const validateSignUpData = (data: SignUpData) => _validate(signUpSchema, data);
export const validateApiKey = (name: string) => _validate(createApiKeySchema, { name });
export const validatePromt = (promptData: PromptData) => _validate(promptSchema, promptData);
export const validateSuggestion = (suggestion: string) =>
	_validate(suggestionSchema, { suggestion });
