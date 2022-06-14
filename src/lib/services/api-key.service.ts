import { http } from '$lib/utils/http';
import type { ApiKey } from '@prisma/client';

const del = async (id: string) => {
	return await http.del<ApiKey>(`/admin/api-key/${id}`);
};

const create = async (name: string) => {
	return await http.post<ApiKey, { name: string }>('/admin/api-key', { name });
};

export default {
	del,
	create
};
