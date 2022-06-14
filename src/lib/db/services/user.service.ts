import { db } from '$lib/db';
import type { CreateUserData } from '$lib/db/models';
import { hash } from '$lib/utils/crypto';

const get = async (id: string) => {
	return await db.user.findUnique({ where: { id } });
};

const getByEmail = async (email: string) => {
	return await db.user.findUnique({ where: { email } });
};

const create = async (createData: CreateUserData) => {
	const user = await getByEmail(createData.email);
	if (user) return Promise.reject('User already exists');
	createData.password = hash(createData.password);
	return await db.user.create({ data: createData });
};

export default {
	get,
	getByEmail,
	create
};
