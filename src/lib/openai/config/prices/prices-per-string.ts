import type { ModelName } from '../openai.types';
import { encode } from '../../encoder';
import { prices } from './prices-per-engine';

export const priceOfString = (str: string, model: ModelName = 'ada') => {
	const { nTokens, encodedStrs } = encode(str);
	const prices = priceOfNTokens(nTokens, model);
	return { encodedStrs, ...prices };
};

export const priceOfNTokens = (nTokens: number, model: ModelName = 'ada') => {
	const trainingPricePerToken = prices[model].training / 1000;
	const usagePricePerToken = prices[model].usage / 1000;

	const trainingPrice = trainingPricePerToken * nTokens;
	const usagePrice = usagePricePerToken * nTokens;

	return { trainingPrice, usagePrice, encodedLength: nTokens };
};
