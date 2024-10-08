import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./custom-menu-dropdown.ui";

type props = {
  className?: string;
  buttonComponent?: ReactNode | string;
  children?: ReactNode;
  width?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
};

const CustomMenuDropdown = ({
  className,
  buttonComponent,
  children,
  width,
  marginTop,
  marginLeft,
  marginRight,
  disabled,
  backgroundColor,
  textColor,
  border,
}: props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild>
        <button className={className}>{buttonComponent}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${width} ${marginRight} ${marginLeft} ${marginTop} z-50 ${
          textColor ? textColor : "text-[#0d1b2a]"
        } ${backgroundColor && backgroundColor} ${border && border} rounded-xl`}
      >
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomMenuDropdown;
