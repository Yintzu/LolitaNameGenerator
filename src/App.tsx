import { useRef, useState } from "react"
import ModeButton from "./components/Buttons/ModeButtons"
import GenerateButton from "./components/Buttons/GenerateButton"
import {
  brandWords,
  classicLolitaWords,
  gothicLolitaWords,
  sweetLolitaWords,
} from "./data/words"
import { copyResultToClipboardAsImage, random } from "./utilities/helpers"
import CopyButton from "./components/Buttons/CopyButton"
import { postFeedback } from "./utilities/supabase"
import FeedbackForm from "./components/FedbackForm/FeedbackForm"

enum Mode {
  Classic = "classic",
  Sweet = "sweet",
  Gothic = "gothic",
  Brand = "brand",
}

const modeMap = {
  [Mode.Classic]: {
    words: classicLolitaWords,
    bg: "bg-classic",
    anim: "animate-bgPan-classic",
    textColor: "text-yellow-950",
    bgColor: "bg-yellow-950",
  },
  [Mode.Sweet]: {
    words: sweetLolitaWords,
    bg: "bg-sweet",
    anim: "animate-bgPan-sweet",
    textColor: "text-purple-950",
    bgColor: "bg-purple-950",
  },
  [Mode.Gothic]: {
    words: gothicLolitaWords,
    bg: "bg-gothic",
    anim: "animate-bgPan-gothic",
    textColor: "text-stone-50",
    bgColor: "bg-black",
  },
  [Mode.Brand]: {
    words: brandWords,
    bg: "bg-brand",
    anim: "animate-bgPan-brand",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-600",
  },
}

function App() {
  const [mode, setMode] = useState(Mode.Classic)
  const [result, setResult] = useState("")
  const [name, setName] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)
  const resultTextRef = useRef<HTMLSpanElement>(null)
  const [key, setKey] = useState(0)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const handleGenerate = () => {
    const seed = name.trim().toLowerCase()
    const words = modeMap[mode].words
    const noOfWords = Math.floor(random(seed + mode) * 2) + 3
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

    if (!resultTextRef.current) return
    resultTextRef.current.style.animationName = "pop-in"
    // setKey((prevKey) => prevKey + 1)
  }

  return (
    <div
      id="app"
      className={`h-full min-h-screen overflow-x-hidden text-stone-950`}
    >
      <div
        className={`${modeMap[mode].anim} max-h-100vh absolute h-full min-h-screen ${modeMap[mode].bg} w-screen`}
      ></div>
      <div className="relative min-h-screen pb-9">
        <div
          id="content"
          className="relative mx-auto flex h-full w-full max-w-[720px] flex-col gap-5 px-2 pb-2 pt-10"
        >
          <h1
            className={`my-4 text-center text-6xl font-bold ${modeMap[mode].textColor}`}
          >
            Lolita Name Generator
          </h1>
          <div
            id="modal"
            className={`rounded-lg bg-opacity-75 p-5 shadow-2xl ${modeMap[mode].bgColor} flex w-full flex-col gap-10 backdrop-blur-sm`}
          >
            {showFeedbackForm ? (
              <FeedbackForm />
            ) : (
              <>
                <div className="flex flex-col gap-10">
                  <div
                    id="modeButtons"
                    className="grid w-full grid-cols-2 gap-5"
                  >
                    <ModeButton
                      id="classic"
                      onClick={() => setMode(Mode.Classic)}
                      isSelected={mode === Mode.Classic}
                      className={` bg-[#ddbfb7] ${modeMap[Mode.Classic].textColor} font-classic`}
                    >
                      Classic
                    </ModeButton>
                    <ModeButton
                      id="sweet"
                      onClick={() => setMode(Mode.Sweet)}
                      isSelected={mode === Mode.Sweet}
                      className={`border-[#f7f1aa] bg-[#ffc1ec] ${modeMap[Mode.Sweet].textColor} font-sweet font-semibold`}
                    >
                      Sweet
                    </ModeButton>
                    <ModeButton
                      id="gothic"
                      onClick={() => setMode(Mode.Gothic)}
                      isSelected={mode === Mode.Gothic}
                      className={`border-blue-700 bg-black ${modeMap[Mode.Gothic].textColor} font-gothic`}
                    >
                      Gothic
                    </ModeButton>
                    <ModeButton
                      id="brand"
                      onClick={() => setMode(Mode.Brand)}
                      isSelected={mode === Mode.Brand}
                      className={`border-pink-600 bg-slate-50 ${modeMap[Mode.Brand].textColor} font-brand`}
                    >
                      Brand
                    </ModeButton>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="font-semibold text-stone-50">
                      Name (optional):
                    </span>
                    <input
                      type="text"
                      className={`h-10 min-w-0 flex-grow rounded border-2 border-stone-50 pl-2 transition-all focus:bg-stone-50 
                ${name ? "bg-stone-50" : "bg-transparent"}`}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <button
                      className={`active:shadow-button-press h-10 rounded border border-gray-500 bg-slate-50 px-4 font-semibold active:bg-slate-100 ${!name ? "pointer-events-none [filter:contrast(0.3)_brightness(1.4)]" : ""}`}
                      disabled={!name}
                      onClick={() => setName("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                {/* <hr className="rounded-full border-t-2 border-stone-50" /> */}
                <div className="flex flex-col gap-5">
                  <GenerateButton onClick={handleGenerate}>
                    Generate
                  </GenerateButton>
                  <div className="relative">
                    <div
                      id="result"
                      ref={resultRef}
                      className="relative grid h-40 w-full place-items-center rounded-lg bg-slate-50 "
                    >
                      <span
                        key={result}
                        ref={resultTextRef}
                        className="animate-pop-in text-center text-2xl font-semibold [backface-visibility:hidden]"
                      >
                        {result}
                      </span>
                    </div>
                    <CopyButton
                      onClick={() => copyResultToClipboardAsImage(resultRef)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <button
          className={`font-sweet absolute bottom-2 right-4 ml-auto block text-lg font-semibold ${modeMap[mode].textColor}`}
          onClick={() => setShowFeedbackForm(true)}
        >
          Feedback
        </button>
      </div>
    </div>
  )
}

export default App
