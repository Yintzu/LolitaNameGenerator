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
      className={`h-12 rounded-md border-2 text-2xl transition-all sm:h-16 flex-grow${
        className ? ` ${className}` : ""
      }${isSelected ? " scale-105 shadow-lg" : " bg-gray-400 saturate-0"}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(ModeButton)
