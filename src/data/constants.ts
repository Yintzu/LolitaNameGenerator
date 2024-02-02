import {
  brandWords,
  classicLolitaAdjectives,
  classicLolitaWords,
  gothicLolitaAdjectives,
  gothicLolitaWords,
  sweetLolitaAdjectives,
  sweetLolitaWords,
} from "./words"

export enum Mode {
  Classic = "Classic",
  Sweet = "Sweet",
  Gothic = "Gothic",
  Brand = "Brand",
}

export const modeMap = {
  [Mode.Classic]: {
    words: classicLolitaWords,
    adjectives: classicLolitaAdjectives,
    bg: "bg-classic",
    anim: "animate-bgPan-classic",
    textColor: "text-yellow-950",
    bgColor: "bg-yellow-950",
  },
  [Mode.Sweet]: {
    words: sweetLolitaWords,
    adjectives: sweetLolitaAdjectives,
    bg: "bg-sweet",
    anim: "animate-bgPan-sweet",
    textColor: "text-purple-950",
    bgColor: "bg-purple-950",
  },
  [Mode.Gothic]: {
    words: gothicLolitaWords,
    adjectives: gothicLolitaAdjectives,
    bg: "bg-gothic",
    anim: "animate-bgPan-gothic",
    textColor: "text-stone-50",
    bgColor: "bg-black",
  },
  [Mode.Brand]: {
    words: brandWords,
    adjectives: [],
    bg: "bg-brand",
    anim: "animate-bgPan-brand",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-600",
  },
}
