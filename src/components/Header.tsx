'use client';
import { useEffect, useState } from "react";

export default function Header() {
  const [, setCurrentMode] = useState(1); // 1 = Light Mode, 0 = Dark Mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setCurrentMode(prefersDarkMode ? 0 : 1);
      applyTheme(prefersDarkMode ? 0 : 1);
    }
  }, []);

  function applyTheme(mode: number) {
    document.documentElement.style.setProperty("--background", mode === 0 ? "#0a0a0a" : "#ffffff");
    document.documentElement.style.setProperty("--foreground", mode === 0 ? "#ededed" : "#171717");
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
      <div className="flex flex-wrap w-full px-5 justify-between"> {/* aprent */}
        
        <div className="hidden md:block w-[118px]"></div>

        <div className="flex flex-grow mr-5 justify-center">
          <input type="text" className="w-full my-10 text-center" id="search" placeholder="Search Home Inventory..." />
        </div>

        <div className="flex l:w-[124px] justify-end xl:justify-start">
          <button id="toggleDarkMode" onClick={toggleDarkMode} className='px-4 py-1 self-center'>
            Toggle Dark
          </button>
        </div>

      </div>
      <hr />
    </header>
  );
}