import { useState, useRef, useEffect, useCallback } from "react";
import type { PriceItem } from "../hooks/usePrices";
import { TokenIcon } from "./TokenIcon";
import { BaselinePlus } from "./icons/BaselinePlus";
import { WrapHidden } from "./WrapHiden";
import { ArrowDown } from "./icons/ArrowDown";

interface Props {
  target: 'from' | 'to';
  currencies: PriceItem[];
  selected: string;
  onChange: (val: string) => void;
}

export default function TokenSelector({
  target,
  currencies,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative min-w-[140px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center hover:cursor-pointer p-2 border border-neutral-700 rounded bg-neutral-800 text-white"
      >
        <div className="flex items-center gap-2">
          <WrapHidden hidden={!!selected}>
            <BaselinePlus />
            <span>Select</span>
          </WrapHidden>
          <WrapHidden hidden={!selected}>
            <TokenIcon symbol={selected} key={target+selected}/>
            <span>{selected}</span>
          </WrapHidden>
        </div>
        <ArrowDown className="w-4 h-4 ml-2" />
      </button>

      <WrapHidden hidden={!open}>
        <ul className="absolute z-10 top-full mt-1 max-h-60 w-full overflow-auto rounded border border-neutral-700 bg-neutral-900 shadow-lg">
          {currencies.map((token) => (
            <li
              key={token.currency}
              onClick={() => {
                onChange(token.currency);
                setOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-neutral-700 cursor-pointer"
            >
              <TokenIcon symbol={token.currency} />
              <span>{token.currency}</span>
            </li>
          ))}
        </ul>
      </WrapHidden>
    </div>
  );
}
