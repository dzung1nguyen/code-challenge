import { useState, useMemo } from "react";
import { usePrices } from "../hooks/usePrices";
import TokenSelector from "./TokenSelector";
import { RoundSwapVerticalCircle } from "./icons/RoundSwapVerticalCircle";
import { WrapHidden } from "./WrapHiden";

const fixedLength = 4;

export default function SwapForm() {
  const { prices, loading } = usePrices();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const fromPrice = useMemo(
    () => prices.find((p) => p.currency === fromCurrency)?.price || 0,
    [prices, fromCurrency]
  );
  const toPrice = useMemo(
    () => prices.find((p) => p.currency === toCurrency)?.price || 0,
    [prices, toCurrency]
  );

  const exchangeRate = useMemo(() => {
    return fromPrice && toPrice ? fromPrice / toPrice : 0;
  }, [fromPrice, toPrice]);

  const receiveAmount = useMemo(() => {
    const num = parseFloat(amount || "0");
    return (num * exchangeRate).toFixed(fixedLength);
  }, [amount, exchangeRate]);

  const handleAmountChange = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) {
      setError("Invalid amount");
    } else {
      setError("");
    }
    setAmount(val);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) {
    return <div className="text-center p-4 text-white">Loading prices...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-neutral-800 shadow-xl rounded-2xl p-6 text-white">
      <h2 className="text-xl font-bold text-center mb-4">Currency Swap</h2>

      {/* FROM */}
      <div className="bg-neutral-700 p-3 rounded">
        <label className="block text-sm font-medium mb-1">From</label>
        <div className="flex items-center gap-3 border border-neutral-800 rounded px-2 py-1">
          <TokenSelector
            target="from"
            currencies={prices}
            selected={fromCurrency}
            onChange={setFromCurrency}
          />
          <input
            type="number"
            placeholder="Amount"
            min="0"
            step="any"
            className="w-full border-none bg-transparent text-right text-2xl outline-none"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
        </div>
        {error && <p className="text-red-400 text-sm text-right">{error}</p>}
      </div>

      {/* Swap icon */}
      <div className="flex justify-center my-2">
        <button
          onClick={handleSwap}
          className="transition-transform duration-300 hover:rotate-180 hover:cursor-pointer"
        >
          <RoundSwapVerticalCircle className="size-10 text-white" />
        </button>
      </div>

      {/* TO */}
      <div className="bg-neutral-700 p-3 rounded">
        <label className="block text-sm font-medium mb-1">To</label>
        <div className="flex items-center gap-3 border border-neutral-800 rounded px-2 py-1">
          <TokenSelector
            target="to"
            currencies={prices}
            selected={toCurrency}
            onChange={setToCurrency}
          />
          <input
            type="text"
            value={receiveAmount}
            disabled
            className="w-full border-none bg-transparent text-right text-2xl outline-none text-white"
          />
        </div>
        <WrapHidden hidden={!fromCurrency || !toCurrency}>
          <p className="text-right text-xs text-neutral-400 mt-1">
            1 {fromCurrency} ≈ {(exchangeRate || 0).toFixed(fixedLength)}{" "}
            {toCurrency}
          </p>
        </WrapHidden>
      </div>

      <button
        disabled={!!error || !amount}
        className="w-full py-3 bg-indigo-600 text-white rounded mt-6 hover:bg-indigo-700 disabled:opacity-50"
      >
        Swap
      </button>
    </div>
  );
}
