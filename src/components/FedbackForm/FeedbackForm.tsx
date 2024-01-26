import React from "react"
import { useState } from "react"
import DropdownOption from "../Dropdown/DropdownOption"
import Dropdown from "../Dropdown/Dropdown"

enum FormType {
  Add = "Add",
  Remove = "Remove",
  Comment = "Comment",
}

const FeedbackForm = () => {
  const [formType, setFormType] = useState(FormType.Add)
  const [inputValues, setInputValues] = useState({
    type: "",
    word: "",
    comment: "",
  })

  return (
    <div className="flex flex-col gap-4 w-full">
      <Dropdown>
        <DropdownOption>Add word</DropdownOption>
        <DropdownOption>Remove word</DropdownOption>
        <DropdownOption>Comment</DropdownOption>
      </Dropdown>
    </div>
  )
}
export default React.memo(FeedbackForm)
