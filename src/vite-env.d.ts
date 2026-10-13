/// <reference types="vite/client" />

// Fontsource export maps resolve '700' to '700.css'; TS needs a module stub.
declare module '@fontsource/*';
