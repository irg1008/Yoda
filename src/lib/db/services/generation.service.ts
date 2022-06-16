import { hash } from '$lib/utils/crypto';
import { db } from '..';
import type { GenerationData } from '../models';

const logGeneration = async (generationData: GenerationData) => {
	const hashedInput = hash(generationData.input);

	return await db.generation.create({
		data: {
			...generationData,
			hash: hashedInput
		}
	});
};

const getGeneration = async (prompt: string) => {
	const hadhedInput = hash(prompt);
	return await db.generation.findUnique({ where: { hash: hadhedInput } });
};

export default {
	logGeneration,
	getGeneration
};
