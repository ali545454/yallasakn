// utils/sanitize.ts

// --- XSS protection (frontend) ---
// stripTags removes any HTML tags, then escape special chars.
export const stripTags = (str: string) => {
  if (!str) return "";
  // remove tags
  const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");
  // escape special chars to be safe when echoing back into DOM
  return withoutTags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// sanitize all string fields in payload
export const sanitizePayload = (payload: Record<string, any>) => {
  const out: Record<string, any> = {};
  Object.keys(payload).forEach((k) => {
    const v = payload[k];
    if (typeof v === "string") out[k] = stripTags(v.trim());
    else out[k] = v;
  });
  return out;
};