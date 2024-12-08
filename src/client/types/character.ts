export interface CharacterAttributes {
  gender: "female" | "male";
  skinColor: string;
  height: "petite" | "average" | "tall";
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  faceShape: string;
  outfit: string;
  accessories: string[];
  expression: string;
  pose: string;
}

export const defaultCharacter: CharacterAttributes = {
  gender: "female",
  skinColor: "fair",
  height: "average",
  hairColor: "blonde",
  hairStyle: "long",
  eyeColor: "blue",
  faceShape: "oval",
  outfit: "casual",
  accessories: [],
  expression: "neutral",
  pose: "standing",
};

export const characterOptions = {
  skinColors: ["fair", "tan", "olive", "brown", "dark"],
  hairColors: [
    "blonde",
    "brown",
    "black",
    "red",
    "white",
    "pink",
    "blue",
    "purple",
  ],
  hairStyles: [
    "long",
    "short",
    "curly",
    "straight",
    "wavy",
    "twin-tails",
    "ponytail",
    "braided",
  ],
  eyeColors: ["blue", "green", "brown", "gray", "amber", "purple", "red"],
  faceShapes: ["oval", "round", "pointed", "strong jawline"],
  outfits: ["casual", "formal", "school uniform", "kimono", "armor", "wizard"],
  accessories: [
    "glasses",
    "earrings",
    "necklace",
    "hair bow",
    "hat",
    "crown",
    "tiara",
    "small horns",
    "large horns",
    "nose piercing",
  ],
  expressions: ["neutral", "happy", "serious", "shy", "confident"],
  poses: ["standing", "sitting", "action pose", "portrait"],
};
