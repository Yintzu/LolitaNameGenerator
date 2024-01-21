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
      className={`flex-grow rounded-md border border-gray-500 bg-slate-50 px-4 py-6 text-2xl font-semibold transition hover:bg-slate-300 w-full${
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
