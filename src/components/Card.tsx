"use client";

import { Album } from "@/app/Album";
import { useDebounce } from "@/hooks/Debounce";
import { useEffect, useRef, useState } from "react";

export default function Card({ children }: { children: Album }) {
  const card = useRef<HTMLDivElement>(null);
  const frontCard = useRef<HTMLDivElement>(null);
  const backCard = useRef<HTMLDivElement>(null);
  const checked = useRef<boolean>(null);
  const item = useRef<HTMLLIElement>(null);
  const [flip, setFlipState] = useState<boolean | null>(null);
  const debounce = useDebounce();

  useEffect(() => {
    if (
      flip == null ||
      !frontCard.current ||
      !backCard.current ||
      !item.current
    ) {
      return;
    }
    const front = frontCard.current;
    const back = backCard.current;
    const flipUp = debounce("flipUp", () => {
      card.current?.focus();
      front.style.zIndex = "1000";
      front.classList.remove("animate-exit");
      front.classList.add("animate-enter");
      back.style.transform = "rotateY(180deg)";
    });
    const flipDown = debounce("flipDown", () => {
      front.classList.remove("animate-enter");
      front.classList.add("animate-exit");

      setTimeout(() => {
        back.style.transform = "rotateY(0)";
      }, 700);
    });
    if (flip === true) {
      flipUp();
    } else {
      flipDown();
    }
  }, [flip, debounce]);
  return (
    <li ref={item}>
      <div
        ref={card}
        className="card"
        tabIndex={0}
        onClick={() => {
          checked.current = !checked.current;
          if (frontCard.current) {
            frontCard.current.style.zIndex = "900";
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            checked.current = !checked.current;
            if (frontCard.current) {
              frontCard.current.style.zIndex = "900";
            }
            setFlipState((p) => !p);
          }
        }}
      >
        <div
          className="relative"
          onMouseEnter={() => !checked.current && setFlipState(true)}
          onMouseLeave={() => !checked.current && setFlipState(false)}
          onTouchStart={() => {
            if (checked.current) setFlipState(false);
          }}
        >
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
                <span className="capitalize">{children.year}</span>
                <br />
                <span className="capitalize">{children.artistName}</span>
                <br />
                <span className="capitalize">{children.albumName}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
