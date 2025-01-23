import React, { useState, useEffect } from "react";

const Sum = () => {
  const [tab, setTab] = useState<number | null>(1);
  const [number, setNumber] = useState<string | null>("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTab = (e: number) => {
    setTab(e);
    setNumber("");
    setResult(null);
    setLoading(false);
  };

  const handleSum = (tab: number) => {
    setLoading(true);
    const n = parseInt(number || "");
    let sum = 0;
    if (n < 0) {
      setResult(0);
      setLoading(false);
      return;
    }
    switch (tab) {
      case 1:
        if (n === 0) {
          sum = 0;
          setLoading(false);
          return;
        }
        sum = (n * (n + 1)) / 2;
        break;
      case 2: {
        const recursiveSum = (num: number): number => {
          if (num === 0) {
            setLoading(false);
            return 0;
          }
          return num + recursiveSum(num - 1);
        };
        sum = recursiveSum(n);
        break;
      }
      case 3: {
        for (let i = 1; i <= n; i++) {
          sum += i;
        }
        break;
      }
      default:
        sum = 0;
    }
    setResult(sum);
    setLoading(false);
  };

  useEffect(() => {
    if (number && parseInt(number) > 1000000) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [number]);

  return (
    <div className="w-full mx-auto mt-8">
      <h1 className="text-3xl font-bold pb-10">Three ways to sum to n</h1>
      <div className="flex gap-2 items-center mb-6 sm:gap-4">
        <button
          className={`flex-1 py-3 px-6 text-center border-b-2 ${
            tab === 1
              ? "border-gray-500 font-bold"
              : "border-transparent hover:border-gray-500"
          } hover:bg-gray-100 hover:text-black transition-colors`}
          onClick={() => handleTab(1)}
        >
          Method 1
        </button>
        <button
          className={`flex-1 py-3 px-6 text-center border-b-2 ${
            tab === 2
              ? "border-gray-500 font-bold"
              : "border-transparent hover:border-gray-500"
          } hover:bg-gray-100 hover:text-black transition-colors`}
          onClick={() => handleTab(2)}
        >
          Method 2
        </button>
        <button
          className={`flex-1 py-3 px-6 text-center border-b-2 ${
            tab === 3
              ? "border-gray-500 font-bold"
              : "border-transparent hover:border-gray-500"
          } hover:bg-gray-100 hover:text-black transition-colors`}
          onClick={() => handleTab(3)}
        >
          Method 3
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Enter your number"
          className="bg-linear-left p-4 flex-1 border rounded-lg "
          value={number || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNumber(e.target.value);
            setResult(null);
            setLoading(false);
          }}
        />
        <button
          className="bg-linear-right  p-4 rounded-lg  transition-colors text-white"
          onClick={() => handleSum(Number(tab))}
          disabled={!number || loading}
        >
          {loading ? "Loading..." : `Sum (${tab})`}
        </button>
      </div>
      <p className="mt-4 text-green-500 text-center text-2xl">
        {" "}
        Result: {result}
      </p>
    </div>
  );
};

export default Sum;
