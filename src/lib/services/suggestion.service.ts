import type { SuggestionData } from '$lib/db/models';
import { http } from '$lib/utils/http';
import type { Suggestion } from '@prisma/client';

const suggest = async (data: SuggestionData) => {
	return await http.post<Suggestion, SuggestionData>('/openai/suggest', data);
};

export default {
	suggest
};
