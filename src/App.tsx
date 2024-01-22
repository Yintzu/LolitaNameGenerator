import { useRef, useState } from "react"
import ModeButton from "./components/Buttons/ModeButtons"
import GenerateButton from "./components/Buttons/GenerateButton"
import {
  brandWords,
  classicLolitaWords,
  gothicLolitaWords,
  sweetLolitaWords,
} from "./data/words"
import { random } from "./utilities/helpers"
import CopyButton from "./components/CopyButton"
import html2canvas from "html2canvas"

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

  const copyResultToClipboardAsImage = async () => {
    try {
      if (!resultRef.current) return
      const div = resultRef.current.cloneNode(true) as HTMLDivElement
      div.style.paddingBottom = "20px"
      div.style.maxWidth = "600px"
      div.style.position = "absolute"
      div.style.left = "-10000px"

      document.body.appendChild(div)
      const canvas = await html2canvas(div)
      document.body.removeChild(div)

      const dataUrl = canvas.toDataURL("image/png")

      const img = new Image()
      img.src = dataUrl

      const res = await fetch(dataUrl)
      const blob = await res.blob()

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
    } catch (err) {
      console.error("Failed to copy div to clipboard as image:", err)
    }
  }

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

    if (!resultTextRef.current) return
    resultTextRef.current.style.animationName = "pop-in"
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <div id="app" className={`relative h-full overflow-hidden text-stone-950`}>
      <div
        className={`${modeMap[mode].anim} absolute h-screen ${modeMap[mode].bg} [width:200vw]`}
      ></div>
      <div
        id="content"
        className="relative mx-auto flex w-full max-w-3xl flex-col gap-5 px-2 pt-12"
      >
        <h1
          className={`my-6 text-center text-6xl font-bold ${modeMap[mode].textColor}`}
        >
          Lolita Name Generator
        </h1>
        <div
          className={`rounded-lg bg-opacity-75 p-5 shadow-2xl ${modeMap[mode].bgColor} flex w-full flex-col gap-10`}
        >
          <div className="flex flex-col gap-10">
            <div id="modeButtons" className="flex w-full gap-5">
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
                className={`bg-[#ffc1ec] ${modeMap[Mode.Sweet].textColor} font-sweet font-semibold`}
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
                className="h-10 min-w-0 flex-grow rounded pl-2 transition-all"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button
                className="active:shadow-button-press h-10 rounded border border-gray-500 bg-slate-50 px-4 font-semibold active:bg-slate-100"
                disabled={!name}
                onClick={() => setName("")}
              >
                Clear
              </button>
            </div>
          </div>
          <hr className="rounded-full border-t-2 opacity-75" />
          <div className="flex flex-col gap-5">
            <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>
            <div className="relative">
              <div
                id="result"
                ref={resultRef}
                className="relative grid h-40 w-full place-items-center rounded-lg bg-slate-50 "
              >
                <span
                  key={result}
                  ref={resultTextRef}
                  className="animate-pop-in text-2xl font-semibold [backface-visibility:hidden]"
                >
                  {result}
                </span>
              </div>
              <CopyButton onClick={copyResultToClipboardAsImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
