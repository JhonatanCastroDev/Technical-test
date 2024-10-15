export default function formatToUSD(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}