const dateFormatter = new Intl.DateTimeFormat(undefined, {   // pass locale to use, or `undefined` if we want to use the browser's locale
	dateStyle: "full",
	timeStyle: "short",
	// year: "numeric",
	// month: "long",
	// day: "numeric",
	// hour: "numeric",
	// minute: "numeric",
	// second: "numeric",
	// timeZoneName: "short",
});

/**
 * Format a ISO Date to a string
 *
 * @param isoDate ISO Date
 */
export const isoToFormattedString = (isoDate: string) => {
	const date = new Date(isoDate);
	return dateFormatter.format(date);
}

/**
 * Format a Unix timestamp to a string
 *
 * @param timestamp Timestamp in milliseconds
 */
export const timestampToFormattedString = (timestamp: number) => {
	const date = new Date(timestamp);
	return dateFormatter.format(date);
}
