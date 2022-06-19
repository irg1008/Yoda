<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		console.log('reaching here');
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
