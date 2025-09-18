/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    // agrega aquí otras variables VITE\_*
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}