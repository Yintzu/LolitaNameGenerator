import React from "react"
import { PropsWithChildren } from "react"
import DropdownOption from "./DropdownOption"
import ChevronDown from "./ChevronDown"

type DropdownProps = {
  items: string[] | Record<string, string[]>
} & PropsWithChildren<JSX.IntrinsicElements["select"]>

const Dropdown = ({ items, ...props }: DropdownProps) => {
  return (
    <div className="relative w-full">
      <ChevronDown />
      <select
        className={`h-10 w-full appearance-none rounded-md bg-gray-50 px-3 text-sm font-semibold text-gray-950 ring-1 ring-inset ring-gray-300 ${props.disabled ? "pointer-events-none opacity-100 [filter:contrast(0.3)_brightness(1.4)]" : ""}`}
        {...props}
      >
        {Array.isArray(items)
          ? items.map((item, index) => {
              return (
                <DropdownOption key={item + index} value={item}>
                  {item}
                </DropdownOption>
              )
            })
          : Object.keys(items).map((key) => {
              return (
                <optgroup key={key} label={key}>
                  {items[key].map((item, index) => {
                    return (
                      <DropdownOption key={item + index} value={item}>
                        {item}
                      </DropdownOption>
                    )
                  })}
                </optgroup>
              )
            })}
      </select>
    </div>
  )
}

export default React.memo(Dropdown)
