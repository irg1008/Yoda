<script lang="ts">
	import { session } from '$app/stores';
	const { user } = $session;
</script>

<header>
	<navbar>
		<a role="button" href="/">Home</a>
		{#if user}
			{#if user.role === 'ADMIN'}
				<a role="button" href="/admin">Admin</a>
			{/if}
			<a role="button" href="/auth/sign-out">Sign Out</a>
			<span class="username">{user.username.at(0)}</span>
		{:else}
			<a role="button" href="/auth/sign-in">Sign In</a>
		{/if}
	</navbar>
</header>

<style lang="postcss">
	header {
		@apply sticky
		top-0
		left-0
		z-50
		mb-10;
	}

	navbar {
		@apply font-semibold
		bg-slate-600
		border-b-2
		border-slate-300
		p-4
		flex
		justify-center
		items-center
		gap-8;
	}

	.username {
		@apply uppercase
		rounded-full
		text-slate-600
		aspect-square
		h-10
		flex
		items-center
		justify-center
		font-bold
		bg-slate-200
		text-2xl;
	}
</style>
