// src/domain/user/normalizeUserTags.js

/**
 * @param {string[] | Record<string, any>} input
 * @returns {Set<string>}
 */
export function normalizeUserTags(input) {
  if (!input) return new Set();

  if (Array.isArray(input)) {
    return new Set(input.filter(Boolean));
  }

  if (typeof input === "object") {
    // { playful: 1, confident: 0 } → 1인 것만
    const tags = Object.keys(input).filter((k) => Number(input[k]) >= 1);
    return new Set(tags);
  }

  return new Set();
}
