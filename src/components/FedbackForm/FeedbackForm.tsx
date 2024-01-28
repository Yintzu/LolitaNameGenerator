import React from "react"
import { useState } from "react"
import Dropdown from "../Dropdown/Dropdown"
import {
  brandWords,
  classicLolitaWords,
  gothicLolitaWords,
  sweetLolitaWords,
} from "../../data/words"
import { postFeedback } from "../../utilities/supabase"
import Spinner from "../Spinner/Spinner"
import { Mode } from "../../data/constants"

enum FormType {
  Add = "Add word",
  Remove = "Remove word",
  Other = "Other",
}

const typeDropdownItems = Object.values(FormType) as string[]

const styleDropdownItems = Object.values(Mode) as string[]

const words = {
  Classic: classicLolitaWords.sort(),
  Sweet: sweetLolitaWords.sort(),
  Gothic: gothicLolitaWords.sort(),
  Brand: brandWords.sort(),
}

const defaultInputValues = {
  word: "",
  comment: "",
  style: Mode.Classic,
}

type InputValues = {
  word: string
  comment: string
  style: Mode | null
}

type FedbackFormProps = {
  back: () => void
}

const FeedbackForm = ({ back }: FedbackFormProps) => {
  const [formType, setFormType] = useState(FormType.Add)
  const [inputValues, setInputValues] =
    useState<InputValues>(defaultInputValues)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPosting(true)
    setErrorMessage("")
    try {
      const res = await postFeedback({ ...inputValues, type: formType })
      if (res.error) {
        throw new Error(res.error.message)
      }
      setShowSuccess(true)
    } catch (err) {
      const error = err as Error
      setErrorMessage(error.message)
    }
    setIsPosting(false)
  }

  const handleSelectFormType = (type: FormType) => {
    setFormType(type)
    switch (type) {
      case FormType.Add:
        return setInputValues(defaultInputValues)
      case FormType.Remove:
        return setInputValues({
          ...defaultInputValues,
          word: words.Classic[0],
          style: null,
        })
      case FormType.Other:
        return setInputValues({ ...defaultInputValues, style: null })
    }
  }

  const handleChange = (
    key: keyof typeof defaultInputValues,
    value: string,
  ) => {
    setShowSuccess(false)
    setInputValues({ ...inputValues, [key]: value })
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <Dropdown
        items={typeDropdownItems}
        name="type"
        disabled={isPosting}
        onChange={(e) => {
          handleSelectFormType(e.target.value as FormType)
        }}
      />
      {formType === FormType.Remove && (
        <Dropdown
          name="word"
          items={words}
          disabled={isPosting}
          onChange={(e) => handleChange("word", e.target.value)}
        />
      )}
      {formType === FormType.Add && (
        <>
          <Dropdown
            name="style"
            items={styleDropdownItems}
            disabled={isPosting}
            onChange={(e) => handleChange("style", e.target.value)}
          />
          <input
            placeholder="Word..."
            value={inputValues.word}
            onChange={(e) => handleChange("word", e.target.value)}
            name="word"
            disabled={isPosting}
            className={`h-10 w-full rounded-md bg-gray-50 px-3 text-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:font-semibold ${isPosting ? "pointer-events-none [filter:contrast(0.3)_brightness(1.4)]" : ""}`}
            required
          />
        </>
      )}
      <textarea
        placeholder="Comment..."
        disabled={isPosting}
        name="comment"
        className={`h-52 w-full resize-none rounded-md bg-gray-50 px-3 py-3 text-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:font-semibold ${isPosting ? "pointer-events-none [filter:contrast(0.3)_brightness(1.4)]" : ""}`}
        value={inputValues.comment}
        onChange={(event) => handleChange("comment", event.target.value)}
        required={formType === FormType.Other}
      />
      {errorMessage && (
        <span className="rounded-md bg-red-200 px-3 py-3 text-center text-red-950 ring-1 ring-inset ring-red-950">
          {errorMessage}
        </span>
      )}
      <div className="flex gap-3">
        <button
          className="active:shadow-button-press h-10 w-full rounded-md bg-gray-50 font-semibold ring-1 ring-inset ring-gray-300 active:bg-gray-100"
          onClick={back}
          type="button"
        >
          Back
        </button>
        <button
          className={`${isPosting || showSuccess ? "" : "active:shadow-button-press active:bg-gray-100"} flex h-10 w-full items-center justify-center rounded-md bg-gray-50 font-semibold ring-1 ring-inset ring-gray-300 `}
          disabled={isPosting || showSuccess}
          type="submit"
        >
          {isPosting ? <Spinner /> : showSuccess ? "Submitted!" : "Submit"}
        </button>
      </div>
    </form>
  )
}
export default React.memo(FeedbackForm)
