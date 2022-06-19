<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		const isAdmin = session.user?.role === 'ADMIN';
		if (!isAdmin) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	};
</script>

<slot />
