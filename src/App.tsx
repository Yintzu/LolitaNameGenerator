import { useState } from "react"
import ModeButton from "./components/Buttons/ModeButtons"
import GenerateButton from "./components/Buttons/GenerateButton"
import {
  classicLolitaWords,
  gothicLolitaWords,
  sweetLolitaWords,
} from "./data/names"
import { random } from "./utilities/helpers"

enum Mode {
  Classic = "classic",
  Sweet = "sweet",
  Gothic = "gothic",
}

const modeMap = {
  [Mode.Classic]: {
    words: classicLolitaWords,
    bg: "bg-classic",
    anim: "animate-bgPan-classic",
  },
  [Mode.Sweet]: {
    words: sweetLolitaWords,
    bg: "bg-sweet",
    anim: "animate-bgPan-sweet",
  },
  [Mode.Gothic]: {
    words: gothicLolitaWords,
    bg: "bg-gothic",
    anim: "animate-bgPan-gothic",
  },
}

function App() {
  const [mode, setMode] = useState(Mode.Classic)
  const [result, setResult] = useState("")
  const [name, setName] = useState("")

  const handleGenerate = () => {
    const seed = name.trim().toLowerCase()
    const words = modeMap[mode].words
    const noOfWords = Math.floor(random(seed) * 2) + 3
    const wordArray: string[] = []
    for (let i = 0; i < noOfWords; i++) {
      let newWordIndex = Math.floor(
        random(seed ? seed + i * 10 : "") * words.length,
      )
      let newWord = words[newWordIndex]
      while (wordArray.includes(newWord)) {
        // Adjust the index by adding 1 and ensure it wraps around the words array length if it exceeds.
        newWordIndex = (newWordIndex + 1) % words.length
        newWord = words[newWordIndex]
      }
      wordArray.push(newWord)
    }
    setResult(wordArray.join(" "))
  }

  return (
    <div id="app" className={`relative h-full overflow-hidden ${mode}`}>
      <div
        className={`${modeMap[mode].anim} absolute h-screen ${modeMap[mode].bg} [width:200vw]`}
      ></div>
      <div
        id="content"
        className="relative mx-auto flex w-full max-w-3xl flex-col gap-4 px-2"
      >
        <h1 className="my-6 text-center text-5xl font-bold">
          Lolita Name Generator
        </h1>
        <div className="flex w-full flex-col gap-4">
          <div id="modeButtons" className="flex w-full gap-4">
            <ModeButton
              id="classic"
              onClick={() => setMode(Mode.Classic)}
              isSelected={mode === Mode.Classic}
              className=" bg-[#ddbfb7]"
            >
              Classic
            </ModeButton>
            <ModeButton
              id="sweet"
              onClick={() => setMode(Mode.Sweet)}
              isSelected={mode === Mode.Sweet}
              className="bg-[#ffc1ec]"
            >
              Sweet
            </ModeButton>
            <ModeButton
              id="gothic"
              onClick={() => setMode(Mode.Gothic)}
              isSelected={mode === Mode.Gothic}
              className="border-blue-700 bg-black text-white"
            >
              Gothic
            </ModeButton>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="byNameCheckbox"
                id="byNameCheckbox"
                className="form-checkbox h-7 w-7 flex-shrink-0"
              />
              <label htmlFor="byNameCheckbox" className="flex-shrink-0">
                Include Seed
              </label>
            </div> */}
            <span className="font-semibold">From name (optional):</span>
            <input
              type="text"
              className="h-10 flex-grow rounded pl-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button
              className="h-10 rounded bg-white px-4 font-semibold"
              disabled={!name}
              onClick={() => setName("")}
            >
              Clear
            </button>
          </div>
          <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>
        </div>
        <div
          id="result"
          className="grid h-40 w-full place-items-center rounded-lg bg-slate-50 text-2xl font-semibold"
        >
          {result}
        </div>
      </div>
    </div>
  )
}

export default App
