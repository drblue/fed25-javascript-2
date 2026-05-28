const numberFormatter = new Intl.NumberFormat("sv-SE");

/**
 * Format a number to a string
 *
 * @param num Number
 */
export const numberFormat = (num: number) => {
	return numberFormatter.format(num);
}
