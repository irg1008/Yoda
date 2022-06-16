import { db } from '$lib/db';
import type { SuggestionData } from '$lib/db/models';

const logSuggestion = async (data: SuggestionData) => {
	return await db.suggestion.create({ data });
};

export default {
	logSuggestion
};
