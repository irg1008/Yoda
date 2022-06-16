import type { PromptData } from '$lib/db/models';
import { http } from '$lib/utils/http';
import type { Generation } from '@prisma/client';

const getCompletion = async (apiKey: string, prompt: string) => {
	return await http.get<Generation, PromptData>('/openai/completion', { apiKey, prompt });
};

export default {
	getCompletion
};
