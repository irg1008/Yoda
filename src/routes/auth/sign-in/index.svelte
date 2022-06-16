<script lang="ts">
	import type { LogInData } from '$lib/db/models';
	export let errors: Record<keyof LogInData, string> = {
		email: '',
		password: ''
	};
	export let data: LogInData = {
		email: '',
		password: ''
	};
</script>

<section>
	<div class="wrapper">
		<h1>LOG IN</h1>

		<form method="post" novalidate>
			<div>
				<label for="email">Email</label>
				<input id="email" name="email" type="email" value={data.email} />
				{#if errors.email}
					<span class="error">{errors.email}</span>
				{/if}
			</div>

			<div>
				<label for="password">Password</label>
				<input id="password" name="password" type="password" value={data.password} />
				{#if errors.password}
					<span class="error">{errors.password}</span>
				{/if}
			</div>

			<button type="submit">Log in</button>
		</form>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex
		justify-center;
	}

	button {
		@apply mt-4
		w-full;
	}

	.wrapper {
		@apply flex
		flex-col
		bg-slate-50
		shadow-lg
		shadow-neutral-300/20
		p-8
		rounded-xl;
	}
</style>
