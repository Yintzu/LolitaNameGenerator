import { useEffect, useRef, useState } from "react"
import ModeButton from "./components/Buttons/ModeButtons"
import GenerateButton from "./components/Buttons/GenerateButton"
import { copyResultToClipboardAsImage, random } from "./utilities/helpers"
import CopyButton from "./components/Buttons/CopyButton"
import FeedbackForm from "./components/FedbackForm/FeedbackForm"
import { Mode, modeMap } from "./data/constants"
import NameInput from "./components/NameInput/NameInput"

function App() {
  const [mode, setMode] = useState(Mode.Classic)
  const [result, setResult] = useState<React.ReactNode>()
  const [name, setName] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)
  const resultTextRef = useRef<HTMLSpanElement>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }
    ;[
      "/classicbg.jpg",
      "/gothicbg.jpg",
      "/sweetbg.jpg",
      "/brandbg.jpg",
    ].forEach((src) => preloadImage(src))
  }, [])

  const handleGenerate = () => {
    const seed = name.trim().toLowerCase()
    const words = modeMap[mode].words
    const baseNoOfWords = mode === Mode.Brand ? 1 : 2
    const maxAdditionalWords = mode === Mode.Brand ? 2 : 2
    const noOfWords =
      Math.ceil(random(seed ? seed + mode : undefined) * maxAdditionalWords) +
      baseNoOfWords
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

    const wordString = wordArray.join(" ")
    const resultJSX = (
      <div className="flex flex-col items-center gap-3 text-center">
        {name ? (
          <div className="text-center text-lg font-semibold">
            <span className="font-bold">
              {name.endsWith("s") ? `${name}' ` : `${name}'s `}
            </span>
            {mode === Mode.Brand ? "brand" : `${mode} Lolita`} name is:
          </div>
        ) : null}
        <span
          key={wordString}
          ref={resultTextRef}
          className="animate-pop-in text-2xl font-semibold [backface-visibility:hidden]"
        >
          {wordString}
        </span>
      </div>
    )
    setResult(resultJSX)
  }

  return (
    <div
      id="app"
      className={`h-full min-h-screen overflow-x-hidden text-gray-950`}
    >
      <div
        className={`${modeMap[mode].anim} max-h-100vh fixed h-full min-h-screen ${modeMap[mode].bg} w-screen`}
      />
      <div className="relative min-h-screen pb-9">
        <div
          id="content"
          className="relative mx-auto h-full w-full max-w-[660px] p-2"
        >
          <h1
            className={`mt-3 mb-6 text-center text-4xl font-bold sm:my-10 sm:text-6xl ${modeMap[mode].textColor} ${showFeedbackForm ? "cursor-pointer" : ""}`}
            onClick={() => setShowFeedbackForm(false)}
          >
            Lolita Name Generator
          </h1>
          <div
            id="modal"
            className={`rounded-lg bg-opacity-75 p-5 shadow-2xl ${modeMap[mode].bgColor} flex w-full flex-col gap-5 backdrop-blur-sm sm:gap-10`}
          >
            {showFeedbackForm ? (
              <FeedbackForm back={() => setShowFeedbackForm(false)} />
            ) : (
              <>
                <div id="modeButtons" className="grid w-full grid-cols-2 gap-5">
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
                    className={`border-pink-600 bg-gray-50 ${modeMap[Mode.Brand].textColor} font-brand`}
                  >
                    Brand
                  </ModeButton>
                </div>
                <NameInput name={name} setName={setName} />
                <div className="flex flex-col gap-5">
                  <GenerateButton onClick={handleGenerate}>
                    Generate
                  </GenerateButton>
                  <div className="relative">
                    <div
                      id="result"
                      ref={resultRef}
                      className="relative grid min-h-40 w-full place-items-center rounded-lg bg-gray-50 p-8 ring-1 ring-inset ring-gray-300"
                    >
                      {result}
                    </div>
                    <CopyButton
                      onClick={() => copyResultToClipboardAsImage(resultRef)}
                      disabled={!result}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <button
          className={`font-sweet absolute bottom-2 right-4 ml-auto block text-xl font-semibold ${modeMap[mode].textColor}`}
          onClick={() => setShowFeedbackForm(true)}
        >
          Feedback
        </button>
      </div>
    </div>
  )
}

export default App
