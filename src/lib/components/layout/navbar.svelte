<script lang="ts">
	import { session } from '$app/stores';
	import Link from '$lib/components/ui/link.svelte';
	const { user } = $session;
</script>

<header>
	<navbar>
		<div>
			<Link role="button" href="/">Home</Link>
			{#if user?.role === 'ADMIN'}
				<Link role="button" href="/admin">Admin</Link>
			{/if}
		</div>
		<div>
			{#if user}
				<span class="username">{user.username.charAt(0)}</span>
				<Link role="button" href="/auth/sign-out">Sign Out</Link>
			{:else}
				<Link role="button" href="/auth/sign-in">Sign In</Link>
			{/if}
		</div>
	</navbar>
</header>

<style lang="postcss">
	header {
		@apply sticky
		top-0
		left-0
		z-30
		mb-10;
	}

	navbar {
		@apply bg-rose-700
		shadow-md
		p-4
		flex
		justify-evenly;
	}

	div {
		@apply flex gap-2;
	}

	.username {
		@apply uppercase
		rounded-full
		text-neutral-600
		aspect-square
		h-10
		border-4
		border-rose-900/50
		flex
		items-center
		justify-center
		bg-neutral-50
		text-lg;
	}
</style>
