import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
const MessyReact = () => {
  const code = `interface Blockchain {
  name: string;
  priority: number;
}
interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;
const DEFAULT_PRIORITY = -99;
const getPriority = (blockchain: string): number => 
  BLOCKCHAIN_PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
interface WalletPageProps {
  className?: string;
}
const WalletPage: React.FC<WalletPageProps> = ({ className }) => {
  const balances = useWalletBalances();
  const prices = usePrices();
  const formattedBalances = useMemo(() => {
    return balances
      .filter(balance => {
        const priority = getPriority(balance.blockchain);
        return priority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
      .map((balance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: prices[balance.currency] * balance.amount
      }));
  }, [balances, prices]);

  return (
    <div className={className}>
      {formattedBalances.map((balance) => (
        <WalletRow 
          key={balance.blockchain}-{balance.currency}}
          className={classes.row}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;`;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    if (copied) {
      toast.success("Copied!");
    }
  };
  return (
    <div className="pt-[100rem] sm:pt-[70rem] w-full">
      <div className="pb-6">
        <h1 className="text-2xl font-bold">
          List out the computational inefficiencies and anti-patterns found in
          the code block below:
        </h1>
        <ul className="list-note">
          <li>
            The blockchain parameter in getPriority is typed as any, losing
            TypeScript's type safety benefits.
          </li>
          <li>
            Props interface extends BoxProps but BoxProps is not
            defined/imported.
          </li>
          <li>
            References undefined lhsPriority instead of balancePriority in
            balances.filter().
          </li>
          <li>
            Returns true for balances smaller than or equal to 0, which is the
            opposite of what's likely intended.
          </li>
          <li>
            Prices is in the dependency array but not used in the memoized
            calculation, unnecessary recomputation when prices change.
          </li>
          <li>Using array index as key in the WalletRow component.</li>
          <li>
            Unnecessary props spreading with ...rest when only specific props
            might be needed.
          </li>
          <li>Missing error boundaries and loading states.</li>
        </ul>
      </div>
      <h1 className="text-2xl font-bold">Refactored version of the code:</h1>
      <div className="overflow-x-auto">
        <SyntaxHighlighter language="javascript" style={docco}>
          {code}
        </SyntaxHighlighter>
      </div>
      <CopyToClipboard
        text={code}
        onCopy={handleCopy}
        className="bg-linear-right w-full p-4 rounded-lg transition-colors text-white"
      >
        <button>Copy Code</button>
      </CopyToClipboard>
    </div>
  );
};

export default MessyReact;
