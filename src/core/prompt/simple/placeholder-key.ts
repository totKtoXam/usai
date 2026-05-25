/**
 * Converts free-form question text into a deterministic placeholder key.
 */
export function slugifyPlaceholderKey(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return slug || "answer";
}
