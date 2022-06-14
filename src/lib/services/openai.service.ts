import type { Completion, PromptData } from '$lib/db/models';
import { http } from '$lib/utils/http';

const getCompletion = async (apiKey: string, prompt: string) => {
	return await http.get<Completion, PromptData>('/openai/completion', { apiKey, prompt });
};

export default {
	getCompletion
};
