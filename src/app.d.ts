/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: import('@prisma/client').User | null;
	}

	// interface Platform {}

	interface Session {
		user: import('@prisma/client').User | null;
	}

	// interface Stuff {}
}
