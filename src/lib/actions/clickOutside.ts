export const clickOutside = (node: HTMLElement, onClickOutside: () => void) => {
	const parent = node.parentElement;
	if (!parent) throw new Error('Inner modal node must have a parent');

	parent.addEventListener('click', (event) => {
		if (event.target !== node && !node.contains(event.target as Node)) {
			onClickOutside();
		}
	});

	return {
		destroy() {
			parent.removeEventListener('click', onClickOutside);
		}
	};
};
