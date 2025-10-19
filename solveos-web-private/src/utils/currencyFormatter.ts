/**
 * Formats a number as currency
 */
export function formatCurrency(
    amount: number,
    currency: string = "EUR",
): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
}
