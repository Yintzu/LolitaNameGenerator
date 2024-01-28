import React from "react"

type NameInputProps = {
  name: string
  setName: (name: string) => void
}

const NameInput = ({ name, setName }: NameInputProps) => {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <span className="whitespace-nowrap font-semibold text-gray-50">
        Name (optional):
      </span>
      <div className="flex w-full items-center gap-5">
        <input
          type="text"
          className={`h-9 min-w-0 flex-grow rounded pl-2 transition-all focus:bg-gray-50
      ${name ? "bg-gray-50 ring-1 ring-gray-300" : "bg-transparent ring-2 ring-gray-50"}`}
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
        />
        <button
          className={`active:shadow-button-press h-10 rounded-md border border-gray-500 bg-gray-50 px-4 font-semibold active:bg-gray-100 ${!name ? "pointer-events-none [filter:contrast(0.3)_brightness(1.4)]" : ""}`}
          disabled={!name}
          onClick={() => setName("")}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
export default React.memo(NameInput)
