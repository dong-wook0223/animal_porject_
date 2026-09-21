// src/domain/dogs/normalizeDog.js

/**
 * @param {any} dog
 * @returns {{id:string, name:string, image?:string, desc?:string, tags:Set<string>}}
 */
export function normalizeDog(dog) {
  const raw = dog?.tags;

  let tagsArr = [];

  if (Array.isArray(raw)) {
    // tags: ["playful","confident"]
    tagsArr = raw.filter(Boolean);
  } else if (raw && typeof raw === "object") {
    // tags: { playful:0, confident:1, ... }  → value가 1인 key만
    tagsArr = Object.keys(raw).filter((k) => Number(raw[k]) >= 1);
  }

  return {
    id: dog.id,
    name: dog.name,
    image: dog.image,
    desc: dog.desc,
    tags: new Set(tagsArr),
  };
}
