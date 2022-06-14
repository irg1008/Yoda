import { db } from '$lib/db';

const create = async (name: string) => {
	return await db.apiKey.create({ data: { name } });
};

const list = async () => {
	return await db.apiKey.findMany();
};

const get = async (id: string) => {
	return await db.apiKey.findUnique({ where: { uid: id } });
};

const getByKey = async (key: string) => {
	return await db.apiKey.findUnique({ where: { apiKey: key } });
};

const remove = async (id: string) => {
	const apiKey = await get(id);
	if (!apiKey) return null;
	return await db.apiKey.delete({ where: { uid: id } });
};

const exists = async (key: string) => {
	return (await getByKey(key)) !== null;
};

export default {
	create,
	list,
	remove,
	get,
	getByKey,
	exists
};
