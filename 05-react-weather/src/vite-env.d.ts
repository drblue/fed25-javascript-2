/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_OWM_APIKEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
