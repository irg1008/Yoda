<script lang="ts">
	import Spinner from '$lib/components/ui/spinner.svelte';
	import { apiKeyService } from '$lib/services';
	import type { ApiKey } from '@prisma/client';
	import Copy from 'carbon-icons-svelte/lib/Copy.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	export let keys: ApiKey[];
	let loading = false;
	let newApiName: string;
	let errors = {
		name: ''
	};

	const deleteKey = async (key: ApiKey) => {
		loading = true;
		const res = await apiKeyService.del(key.id);
		loading = false;
		if (res.error) return;
		keys = keys.filter((k) => k.id !== key.id);
	};

	const copyKey = (key: ApiKey) => {
		navigator.clipboard.writeText(key.apiKey);
	};

	const createKey = async () => {
		loading = true;
		const { data: key, error } = await apiKeyService.create(newApiName);
		loading = false;
		errors.name = error?.name ?? '';
		if (!key) return;
		keys = [...keys, key];
	};
</script>

<h1>Creación de API Keys</h1>

<form on:submit|preventDefault={() => createKey()} novalidate>
	<div>
		<label for="name">Name</label>
		<input
			id="name"
			name="name"
			type="text"
			bind:value={newApiName}
			placeholder="i.e.: Feed shortener"
		/>
	</div>
	{#if errors.name}
		<span class="error">{errors.name}</span>
	{/if}

	<button type="submit">Añadir</button>
</form>

<hr />

<h1>Lista de claves</h1>

<section class="keys-container">
	{#each keys as key (key.id)}
		<article class="key-card">
			<strong>{key.name}</strong>
			<span class="key">
				{key.apiKey}
			</span>
			<div>
				<button class="copy-btn" on:click={() => copyKey(key)}>
					<Copy size={16} />
				</button>
				<button class="del-btn" on:click={() => deleteKey(key)}>
					<TrashCan size={16} />
				</button>
			</div>
		</article>
	{:else}
		<p>No hay claves</p>
	{/each}
</section>

<Spinner {loading} />

<style lang="postcss">
	h1 {
		@apply sticky
		text-transparent
		bg-clip-text
		text-slate-600
		text-4xl;
	}

	form {
		@apply mb-4;
		& button {
			@apply mt-4;
		}
	}

	.del-btn {
		@apply bg-red-800
		inline
		text-white
		hover:bg-red-700;
	}

	.copy-btn {
		@apply bg-gray-200
		inline
		text-neutral-900
		hover:bg-gray-300;
	}

	.key-card {
		@apply p-4
		bg-neutral-50
		shadow-lg
		shadow-neutral-300/40
		rounded-lg
		flex
		flex-col
		gap-4
		items-center
		justify-between
		max-w-md;
	}

	.key {
		@apply text-lg
		font-semibold
		text-gray-800;
	}

	.keys-container {
		@apply grid
		gap-6;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
</style>
