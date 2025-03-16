import { ButtonHTMLAttributes } from "react";
import "./ExpandingButton.css";

interface ExpandingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | null;
}

import "./ExpandingButton.css";
export default function ExpandingButton({
  ...props
}: ExpandingButtonProps): React.ReactNode {
  function isDarkMode() {
    const isDarkMode =
      window.document.documentElement.getAttribute("data-theme") === "dark";
    return isDarkMode;
  }

  return (
    <button
      {...props}
      className={`expanding-button${
        props?.className?.length ? " " + props.className : ""
      }`}
    >
      <span>{isDarkMode() ? "Light Toggle" : "Dark Toggle"}</span>
    </button>
  );
}
