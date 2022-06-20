<script lang="ts">
	import { session } from '$app/stores';
	import Link from '$lib/components/ui/link.svelte';
	import { themeStore } from '$lib/stores';
	import System from 'carbon-icons-svelte/lib/Incomplete.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';
	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';

	const { user } = $session;
	const { setDarkTheme, setLightTheme, setSystemTheme, theme } = themeStore;

	$: themesAndAction = [
		{
			icon: Moon,
			action: setDarkTheme,
			label: 'Dark Theme',
			active: $theme === 'dark'
		},
		{
			icon: Sun,
			action: setLightTheme,
			label: 'Light Theme',
			active: $theme === 'light'
		},
		{
			icon: System,
			action: setSystemTheme,
			label: 'System Theme',
			active: $theme === null
		}
	];
</script>

<header>
	<navbar>
		<ul>
			<li>
				<Link role="button" href="/">Home</Link>
			</li>
			{#if user?.role === 'ADMIN'}
				<li>
					<Link role="button" href="/admin">Admin</Link>
				</li>
			{/if}
		</ul>

		<ul>
			{#if user}
				<li>
					<span class="username">{user.username.charAt(0)}</span>
				</li>
				<li>
					<Link role="button" href="/auth/sign-out">Sign Out</Link>
				</li>
			{:else}
				<li>
					<Link role="button" href="/auth/sign-in">Sign In</Link>
				</li>
			{/if}

			<li class="group">
				{#each themesAndAction as theme}
					<button on:click={theme.action} class:active={theme.active} title={theme.label}>
						<svelte:component this={theme.icon} />
					</button>
				{/each}
			</li>
		</ul>
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

	.group {
		@apply flex
		ml-4
		rounded-lg
		overflow-hidden
		bg-accent/50;
		& button {
			@apply bg-transparent
			hover:bg-accent
			rounded-none;
			&.active {
				@apply bg-lighter
				text-darker;
			}
		}
	}

	navbar {
		@apply bg-sec
		shadow-md
		p-4
		flex
		justify-evenly
		items-center;
	}

	ul {
		@apply flex
		gap-2;
	}

	li {
		@apply flex;
	}

	.username {
		@apply uppercase
		rounded-full
		text-dark
		aspect-square
		h-10
		border-4
		border-accent/50
		flex
		items-center
		justify-center
		bg-lighter
		text-lg;
	}
</style>
