import React, { PropsWithChildren } from "react"

type ButtonTypes = {
  children?: React.ReactNode
  onClick: () => void
  className?: string
} & PropsWithChildren<JSX.IntrinsicElements["button"]>

const GenerateButton = ({
  onClick,
  children,
  className,
  ...props
}: ButtonTypes) => {
  return (
    <button
      className={`flex-grow rounded-md border-2 border-gray-500 bg-slate-50 px-4 py-6 text-2xl 
      font-semibold active:shadow-button-press active:bg-slate-100 w-full${
        className ? ` ${className}` : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(GenerateButton)
