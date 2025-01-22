import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select, { GroupBase, StylesConfig } from "react-select";
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
interface Token {
  value: string;
  label: string;
  price: number;
  image: string;
}
const FancyForm = () => {
  const location = useLocation();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const customStyles: {
    menu: (provided: CSSProperties) => CSSProperties;
    option: (
      provided: CSSProperties,
      state: { isSelected: boolean }
    ) => CSSProperties;
  } = {
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor: "#f3f4f6",
      borderRadius: "0.5rem",
    }),
    option: (provided: CSSProperties, state: { isSelected: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3b82f6" : "transparent",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "gray",
        color: "white",
      },
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
  };
  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const response = await axios(url);
        const tokenOptions = response.data.map(
          (token: {
            id: string;
            name: string;
            current_price: number;
            image: string;
          }) => ({
            value: token.id,
            label: token.name,
            price: token.current_price || 0,
            image: token.image,
          })
        );
        setTokens(tokenOptions);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchTokens();
  }, [location]);

  const handleSwap = () => {
    if (!amount || amount <= 0 || !fromToken || !toToken) {
      setError("Please enter a valid amount and select both currencies.");
      return;
    }
    setError("");
    const rate = fromToken?.price / toToken?.price;
    setExchangeRate(rate * amount);
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const formatOptionLabel = ({ label, image }: Token) => (
    <div className="flex items-center gap-2">
      <img src={image} alt={label} className="w-6 h-6" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="w-full md:w-[75%] lg:w-[50%] mx-auto p-10 bg-linear-left shadow-lg rounded">
      <h1 className="text-3xl font-bold pb-10">Currency Swap</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <Select
          isDisabled={loading}
          options={tokens}
          onChange={setFromToken}
          value={fromToken}
          placeholder="Select from currency"
          className="w-full"
          styles={customStyles as unknown as StylesConfig<Token, false, GroupBase<Token>> | undefined}
          formatOptionLabel={formatOptionLabel}
        />
        <img
          src="/swap.svg"
          className="w-10 h-10 cursor-pointer"
          onClick={handleSwapTokens}
        />
        <Select
          isDisabled={loading}
          options={tokens}
          onChange={setToToken}
          value={toToken}
          placeholder="Select to currency"
          className="w-full"
          styles={customStyles as unknown as StylesConfig<Token, false, GroupBase<Token>> | undefined}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <input
        type="number"
        value={amount || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
        className="mt-4 w-full p-2 border rounded"
        placeholder="Enter amount"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSwap}
        className="mt-6 w-full bg-linear-right font-bold   text-white py-4 rounded  transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Swap"}
      </button>
      {exchangeRate && (
        <p className="mt-4 text-green-500 text-center text-2xl">
          Exchange Rate: {exchangeRate.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default FancyForm;
