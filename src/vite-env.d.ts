// Vite injects environment variables into your app through import.meta.env.
// The vite-env.d.ts file ensures TypeScript recognizes and validates these variables.

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
