import React from "react"
import { useState } from "react"
import Dropdown, { DropdownItem } from "../Dropdown/Dropdown"
import {
  brandWords,
  classicLolitaWords,
  gothicLolitaWords,
  sweetLolitaWords,
} from "../../data/words"
import { postFeedback } from "../../utilities/supabase"
import Spinner from "../Spinner/Spinner"

enum FormType {
  Add = "Add",
  Remove = "Remove",
  Comment = "Comment",
}

const typeDropdownItems: DropdownItem[] = [
  {
    text: "Add word",
    value: FormType.Add,
  },
  {
    text: "Remove word",
    value: FormType.Remove,
  },
  {
    text: "Comment",
    value: FormType.Comment,
  },
]

const defaultInputValues = {
  word: "",
  comment: "",
}

const words = {
  Classic: classicLolitaWords
    .sort()
    .map((word) => ({ text: word, value: word })),
  Sweet: sweetLolitaWords.sort().map((word) => ({ text: word, value: word })),
  Gothic: gothicLolitaWords.sort().map((word) => ({ text: word, value: word })),
  Brand: brandWords.sort().map((word) => ({ text: word, value: word })),
}

type FedbackFormProps = {
  back: () => void
}

const FeedbackForm = ({ back }: FedbackFormProps) => {
  const [formType, setFormType] = useState(FormType.Add)
  const [inputValues, setInputValues] = useState(defaultInputValues)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPosting(true)
    setErrorMessage("")
    try {
      await postFeedback({ ...inputValues, type: formType })
    } catch (err) {
      const error = err as Error
      setErrorMessage(error.message)
    }
    setShowSuccess(true)
    setIsPosting(false)
  }

  const handleSelectFormType = (type: FormType) => {
    setFormType(type)
    if (type === FormType.Remove) {
      setInputValues({ ...defaultInputValues, word: words.Classic[0].value })
    }
    setInputValues(defaultInputValues)
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
        text={formType}
        items={typeDropdownItems}
        name="type"
        disabled={isPosting}
        onChange={(e) => {
          handleSelectFormType(e.target.value as FormType)
        }}
      />
      {formType === FormType.Remove && (
        <Dropdown
          text={inputValues.word}
          name="word"
          items={words}
          disabled={isPosting}
          onChange={(e) => handleChange("word", e.target.value)}
        />
      )}
      {formType === FormType.Add && (
        <input
          placeholder="Word..."
          value={inputValues.word}
          onChange={(e) => handleChange("word", e.target.value)}
          name="word"
          disabled={isPosting}
          className="h-10 w-full rounded-md px-3 text-sm font-semibold outline-none ring-1 ring-inset ring-gray-300"
          required
        />
      )}
      <textarea
        placeholder="Comment..."
        disabled={isPosting}
        name="comment"
        className="h-52 w-full resize-none rounded-md px-3 py-3 text-sm font-semibold outline-none ring-1 ring-inset ring-gray-300"
        value={inputValues.comment}
        onChange={(event) => handleChange("comment", event.target.value)}
        required={formType === FormType.Comment}
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
