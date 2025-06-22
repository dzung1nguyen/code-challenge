# Problem 3: Messy React
Please view **./WalletPage.tsx** to view all fix and optmize coding.


```diff
interface WalletBalance {
  currency: string;
  amount: number;
- Error: We missed the blockchain attribute
- Added missing `blockchain` attribute to WalletBalance
+ blockchain: string 
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

- Error: BoxProps was not imported or defined.
- Ensure `BoxProps` is properly imported from the UI library (e.g., @mui/system)
interface Props extends BoxProps {

}

- Error: React is not imported
const WalletPage: React.FC<Props> = (props: Props) => {
- Warning: children is unused
  const { children, ...rest } = props;
- Error: useWalletBalances and usePrices are not imported
  const balances = useWalletBalances();
  const prices = usePrices();

- Warning: Avoid using the any type; use string instead.
- const getPriority = (blockchain: any): number => {
+ const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

- Error: useMemo is not imported
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
- Error: Undefined variable: lhsPriority
- Replaced `lhsPriority` with `balancePriority` to fix undefined reference
-         if (lhsPriority > -99) {
+         if (balancePriority > -99) {
             if (balance.amount <= 0) {
               return true;
             }
          }
          return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
- Error: Missing return a default value
+        return 0;          
     });
  }, [balances, prices]);

- Warning: formattedBalances is defined but never used.
- Use `formattedBalances` instead of `sortedBalances` when rendering rows
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
! We may need to set a number for toFixed.
! Consider passing a digit count to `toFixed`, e.g., `toFixed(2)` for cents
      formatted: balance.amount.toFixed()
    }
  })

- Error: Consider using formattedBalances instead of sortedBalances in rows
- const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
+ const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {

- Error: Set a default value if prices[balance.currency] is undefined
-   const usdValue = prices[balance.currency] * balance.amount;
+   const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
- Error: WalletRow is not imported
      <WalletRow 
- Error: classes is not imported
        className={classes.row}
- Warning: Avoid using the index as the key           
- Replaced `index` with `balance.currency` as a more stable React key         
-       key={index}
+       key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

- WalletPage component is missing an export
+ export default WalletPage;
```