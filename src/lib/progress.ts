/** Storage key for a lesson's "read" tick. */
export function readKey(slug: string) {
  return `re:read:${slug}`;
}
