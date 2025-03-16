'use client';

import { Album } from '@/app/Album';
import { useDebounce } from '@/hooks/Debouce';
import { useEffect, useRef, useState } from 'react';

export default function Card({ children, index}: { children: Album, index: number}) {
  const frontCard = useRef<HTMLDivElement>(null);
  const backCard = useRef<HTMLDivElement>(null); 
  const checkbox = useRef<HTMLInputElement>(null);
  const item = useRef<HTMLLIElement>(null);
  const [flip, setFlipState] = useState<boolean|null>(null);
  const [triggeredByCheckbox, setTriggeredByCheckbox] = useState(false);
  const debounceFlip = useDebounce(flip, triggeredByCheckbox ? 0 : 500);

  const handleCheckboxChange = () => {
    setTriggeredByCheckbox(true);
    setFlipState(p => !p);
    setTimeout(() => {
      setTriggeredByCheckbox(false);
    }, 200);
  };

  useEffect(() => {
    if (debounceFlip == null) return;
    if (!frontCard.current || !backCard.current || !item.current) return;
    const front = frontCard.current;
    const back = backCard.current;
    if (debounceFlip) {
      front.style.zIndex = '1000';
      front.classList.remove('animate-exit');
      front.classList.add('animate-enter');
      front.classList.add('active');
      back.classList.add('active');
      back.style.transform = 'rotateY(180deg)';
    } else {
      front.classList.remove('animate-enter');
      front.classList.add('animate-exit');
      setTimeout(() => {
        back.style.transform = 'rotateY(0)';
        front.classList.remove('active');
        back.classList.remove('active');
        front.style.zIndex = '0';
      }, 500 );
    }
  }, [debounceFlip]);
  return (
    <li ref={item}>
      <div className="card">
        <div onMouseEnter={() => !checkbox?.current?.checked && setFlipState(true)} onMouseLeave={() => !checkbox?.current?.checked &&  setFlipState(false)} onClick={() => { if (checkbox.current) {checkbox.current.checked = !checkbox.current?.checked }}} onTouchStart={() => { if (checkbox.current && checkbox.current.checked) setFlipState(false)}}>
            <input ref={checkbox} type="checkbox" className='card-checkbox sr-only' tabIndex={index} onChange={(e) => { e.stopPropagation(); handleCheckboxChange() }} />
            <div ref={frontCard} className={ 'card-front' }></div>
            <div ref={backCard} className={'card-back absolute top-0 left-0'} style={{background: `rgb(79, 79, 79) ${children.image ? `url('${children.image}')` : '' } center top/100% 100% no-repeat`}}>Artist: {children.artistName} <br /> Album: {children.albumName}</div>
          </div>    
      </div>
    </li>
  );
}