import type { SuggestionData } from '$lib/db/models';
import { suggestionService } from '$lib/db/services';
import { validateSuggestion } from '$lib/utils/validation';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const suggestData: SuggestionData = await request.json();
	const { isCorrect, suggestion } = suggestData;

	// If marked as incorrect and has suggestion check validity.
	if (!isCorrect) {
		const error = await validateSuggestion(suggestion ?? '');
		if (error)
			return {
				status: 400,
				body: { error }
			};
	}

	const dbSuggestion = await suggestionService.logSuggestion(suggestData);

	if (!dbSuggestion)
		return {
			status: 404
		};

	return {
		status: 200,
		body: dbSuggestion
	};
};
