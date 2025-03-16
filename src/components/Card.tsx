"use client";

import { Album } from "@/app/Album";
import { useDebounce } from "@/hooks/Debouce";
import { useEffect, useRef, useState } from "react";

export default function Card({
  children,
  index,
}: {
  children: Album;
  index: number;
}) {
  const frontCard = useRef<HTMLDivElement>(null);
  const backCard = useRef<HTMLDivElement>(null);
  const checkbox = useRef<HTMLInputElement>(null);
  const item = useRef<HTMLLIElement>(null);
  const [flip, setFlipState] = useState<boolean | null>(null);
  const [triggeredByCheckbox, setTriggeredByCheckbox] = useState(false);
  const debounceFlip = useDebounce(flip, triggeredByCheckbox ? 0 : 500);

  const handleCheckboxChange = () => {
    setTriggeredByCheckbox(true);
    setFlipState((p) => !p);
    setTimeout(() => {
      setTriggeredByCheckbox(false);
    }, 500);
  };

  useEffect(() => {
    if (debounceFlip == null) return;
    if (!frontCard.current || !backCard.current || !item.current) return;
    const front = frontCard.current;
    const back = backCard.current;
    if (debounceFlip) {
      front.style.zIndex = "1000";
      front.classList.remove("animate-exit");
      front.classList.add("animate-enter");
      front.classList.add("active");
      back.classList.add("active");
      back.style.transform = "rotateY(180deg)";
    } else {
      front.classList.remove("animate-enter");
      front.classList.add("animate-exit");
      setTimeout(() => {
        back.style.transform = "rotateY(0)";
        front.classList.remove("active");
        back.classList.remove("active");
        front.style.zIndex = "0";
      }, 700);
    }
  }, [debounceFlip]);
  return (
    <li ref={item}>
      <div className="card">
        <div
          onMouseEnter={() => !checkbox?.current?.checked && setFlipState(true)}
          onMouseLeave={() =>
            !checkbox?.current?.checked && setFlipState(false)
          }
          onClick={() => {
            if (checkbox.current) {
              checkbox.current.checked = !checkbox.current?.checked;
            }
          }}
          onTouchStart={() => {
            if (checkbox.current && checkbox.current.checked)
              setFlipState(false);
          }}
        >
          <input
            ref={checkbox}
            type="checkbox"
            className="card-checkbox sr-only"
            tabIndex={index}
            onChange={(e) => {
              e.stopPropagation();
              handleCheckboxChange();
            }}
          />
          <div ref={frontCard} className={"card-front"}></div>
          <div
            ref={backCard}
            className={
              "card-back absolute top-0 left-0 overflow-hidden text-ellipsis"
            }
            style={{
              background: children.image
                ? `url('${children.image}') center top/100% 100% no-repeat`
                : undefined,
            }}
          >
            {" "}
            {!children.image && (
              <>
                <span className="font-medium capitalize r-2">Artist:</span>
                <span className="capitalize">{children.artistName}</span>
                <br />
                <span className="font-medium capitalize mr-2">Album:</span>
                <span className="capitalize">{children.albumName}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
