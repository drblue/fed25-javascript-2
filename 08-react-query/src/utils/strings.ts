/**
 * Strip all HTML-tags from a string
 *
 * @param str String
 */
export const striptags = (str: string) => {
	return str.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "");
}
