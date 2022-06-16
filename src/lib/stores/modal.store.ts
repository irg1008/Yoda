import type { ModalComponent } from 'modal';
import { writable } from 'svelte/store';

export type Modal<T> = {
	key: string;
	component: ModalComponent<T>;
	props?: Record<keyof T, unknown>;
};

const modal = writable<Modal<unknown> | undefined>();
const { set } = modal;

const empty = () => set(undefined);

const open = <T>(component: any, props?: T) => {
	const keyedModal: Modal<T> = { key: crypto.randomUUID(), component, props };
	set(keyedModal);
};

const close = () => {
	empty();
};

export default { empty, open, close, modal };
