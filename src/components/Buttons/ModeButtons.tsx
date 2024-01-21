import React, { PropsWithChildren } from "react"

type ButtonTypes = {
  children?: React.ReactNode
  onClick: () => void
  className?: string
  isSelected?: boolean
} & PropsWithChildren<JSX.IntrinsicElements["button"]>

const ModeButton = ({
  onClick,
  children,
  className,
  isSelected,
  ...props
}: ButtonTypes) => {
  return (
    <button
      className={`rounded-md text-2xl border-2 py-4 transition-all flex-grow${
        className ? ` ${className}` : ""
      }${isSelected ? " scale-105 shadow-lg" : " saturate-0 bg-gray-400"}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(ModeButton)
