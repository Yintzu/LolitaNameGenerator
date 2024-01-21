import React, { useRef } from "react"

const CopyButton = ({ onClick }: { onClick: () => void }) => {
  const copyConfirmRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    onClick()
    if (!copyConfirmRef.current) return
    copyConfirmRef.current.style.display = "block"
    copyConfirmRef.current.style.animationName = "copy-confirm"
  }

  return (
    <div className="absolute right-2 top-2">
      <button
        className=" rounded p-1 hover:bg-slate-300"
        onMouseDown={() => {
          if (!copyConfirmRef.current) return
          copyConfirmRef.current.style.animationName = ""
          copyConfirmRef.current.style.display = "none"
        }}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-5"
        >
          <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
        </svg>
      </button>
      <div
        ref={copyConfirmRef}
        className="animate-copy-confirm absolute -top-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-100 p-1 text-xs font-semibold shadow pointer-events-none"
      >
        Copied image!
      </div>
    </div>
  )
}
export default React.memo(CopyButton)
