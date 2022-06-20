<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

  // TOFIX: This works for app navigation and route protection but does not work for endpoint protection. So really is shit.
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
