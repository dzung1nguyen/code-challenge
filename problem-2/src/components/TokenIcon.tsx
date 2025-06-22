import { useState } from "react";
import { FileUnknowLine } from "./icons/FileUnknowLine";

interface TokenIconProps {
  symbol: string;
  className?: string;
}

export function TokenIcon({ symbol, className }: TokenIconProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !symbol) {
    return <FileUnknowLine className={`size-6 ${className}`} />;
  }

  return (
    <img
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${encodeURIComponent(symbol)}.svg`}
      alt={symbol}
      className={className}
      onError={() => setImgError(true)}
    />
  );
}