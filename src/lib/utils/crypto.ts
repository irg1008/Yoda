import { createHash } from 'crypto';

const hash = (text: string) => {
	return createHash('sha256').update(text).digest('hex');
};

export { hash };
