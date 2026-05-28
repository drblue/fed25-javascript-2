const numberFormatter = new Intl.NumberFormat("sv-SE");

export const numberFormat = (num: number) => {
	return numberFormatter.format(num);
}
