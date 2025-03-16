"use client";
import { useEffect, useState } from "react";
import ExpandingButton from "./ExpandingButton";

export default function Header() {
  const [, setCurrentMode] = useState(1); // 1 = Light Mode, 0 = Dark Mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrentMode(prefersDarkMode ? 0 : 1);
      applyTheme(prefersDarkMode ? 0 : 1);
    }
  }, []);

  function applyTheme(mode: number) {
    document.documentElement.setAttribute(
      "data-theme",
      mode ? "light" : "dark"
    );
  }

  function toggleDarkMode() {
    setCurrentMode((prevMode) => {
      const newMode = prevMode === 0 ? 1 : 0;
      applyTheme(newMode);
      return newMode;
    });
  }

  return (
    <header>
      <div className="flex flex-wrap w-full px-5 justify-between">
        {" "}
        {/* aprent */}
        <div className="hidden md:block w-[118px]"></div>
        <div className="flex flex-grow mr-5 justify-center">
          <input
            type="text"
            className="w-full my-10 text-center"
            id="search"
            placeholder="Search Home Inventory..."
          />
        </div>
        <div className="flex l:w-[124px] justify-end xl:justify-start">
          <ExpandingButton onClick={toggleDarkMode} className="self-center" />
        </div>
      </div>
      <hr />
    </header>
  );
}
