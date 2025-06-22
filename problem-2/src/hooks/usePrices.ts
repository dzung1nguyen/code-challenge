import { useEffect, useState } from 'react';

export interface PriceItem {
  currency: string;
  price: number;
  date: string;
}

export const usePrices = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://interview.switcheo.com/prices.json');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: PriceItem[] = await res.json();
        const uniqueData = Array.from(
          new Map(data.map((item) => [item.currency, item])).values()
        );
        setPrices(uniqueData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading, error };
};