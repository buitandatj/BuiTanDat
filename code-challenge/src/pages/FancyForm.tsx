import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select, { GroupBase, StylesConfig } from "react-select";
import { toast } from "react-toastify";
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
interface Token {
  value: string;
  label: string;
  price: number;
  image: string;
}
interface IState {
  fromToken: Token | null;
  toToken: Token | null;
  amount: number | null;
  exchangeRate: number | null;
  error: string;
  loading: boolean;
}
const FancyForm = () => {
  const location = useLocation();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [state, setState] = useState<IState>({
    fromToken: null,
    toToken: null,
    amount: null,
    exchangeRate: null,
    error: "",
    loading: false,
  });
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
      setState((pre: IState) => ({
        ...pre,
        loading: true,
      }));
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
        setState((pre: IState) => ({
          ...pre,
          loading: false,
        }));
      } catch (error: unknown) {
        toast.error("Error fetching data:", error);
      }
    };
    fetchTokens();
  }, [location]);

  const handleSwap = () => {
    if (
      !state.amount ||
      state.amount <= 0 ||
      !state.fromToken ||
      !state.toToken
    ) {
      setState((pre: IState) => ({
        ...pre,
        error: "Please enter a valid amount and select both currencies.",
      }));
      return;
    }
    setState((pre: IState) => ({
      ...pre,
      error: "",
    }));
    const rate = state.fromToken?.price / state.toToken?.price;
    setState((pre: IState) => ({
      ...pre,
      exchangeRate: rate * (pre.amount || 0),
    }));
  };

  const handleSwapTokens = () => {
    setState((pre: IState) => ({
      ...pre,
      fromToken: pre.toToken,
      toToken: pre.fromToken,
    }));
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
          isDisabled={state.loading}
          options={tokens}
          onChange={(newValue) =>
            setState((pre: IState) => ({
              ...pre,
              fromToken: newValue,
              error: "",
            }))
          }
          value={state.fromToken}
          placeholder="Select from currency"
          className="w-full"
          styles={
            customStyles as unknown as
              | StylesConfig<Token, false, GroupBase<Token>>
              | undefined
          }
          formatOptionLabel={formatOptionLabel}
        />
        <img
          src="/swap.svg"
          className="w-10 h-10 cursor-pointer"
          onClick={handleSwapTokens}
        />
        <Select
          isDisabled={state.loading}
          options={tokens}
          onChange={(newValue) =>
            setState((pre: IState) => ({
              ...pre,
              toToken: newValue,
              error: "",
            }))
          }
          value={state.toToken}
          placeholder="Select to currency"
          className="w-full"
          styles={
            customStyles as unknown as
              | StylesConfig<Token, false, GroupBase<Token>>
              | undefined
          }
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <input
        type="number"
        value={state.amount || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState((pre: IState) => ({
            ...pre,
            amount: Number(e.target.value),
            error: "",
          }))
        }
        className="mt-4 w-full p-2 border rounded"
        placeholder="Enter amount"
      />
      {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
      <button
        onClick={handleSwap}
        className="mt-6 w-full bg-linear-right font-bold   text-white py-4 rounded  transition"
        disabled={state.loading}
      >
        {state.loading ? "Loading..." : "Swap"}
      </button>
      {state.exchangeRate && (
        <p className="mt-4 text-green-500 text-center text-2xl">
          Exchange Rate: {state.exchangeRate.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default FancyForm;
