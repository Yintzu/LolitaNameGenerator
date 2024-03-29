import React from "react"
import { PropsWithChildren } from "react"

const DropdownOption = ({
  children,
  ...props
}: PropsWithChildren<JSX.IntrinsicElements["option"]>) => {
  return (
    <option
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 active:bg-gray-100 active:text-gray-900"
      role="menuitem"
      id="menu-item-0"
      {...props}
    >
      {children}
    </option>
  )
}
export default React.memo(DropdownOption)
