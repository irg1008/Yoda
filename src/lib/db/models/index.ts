import type { User } from '@prisma/client';

export type OptionalExcept<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

export type CreateUserData = OptionalExcept<User, 'username' | 'email' | 'password'>;

export type LogInData = Pick<User, 'email' | 'password'>;

export type SignUpData = CreateUserData & {
	confirmPassword: string;
};

export type PromptData = {
	apiKey: string;
	title: string;
};

export type Completion = {
	completion: string;
};
