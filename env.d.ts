interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // لو عندك متغيرات تانية في .env ممكن تضيفها هنا
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
