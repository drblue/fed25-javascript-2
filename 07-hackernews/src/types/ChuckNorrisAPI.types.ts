/**
 * Chuck Norris API
 *
 * <https://api.chucknorris.io/>
 */

/**
 * <https://api.chucknorris.io/jokes/random>
 *
 * @example {
 *   "categories": [],
 *   "created_at": "2020-01-05 13:42:30.730109",
 *   "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
 *   "id": "dyggEo00T9Wx0peOZD0yeg",
 *   "updated_at": "2020-01-05 13:42:30.730109",
 *   "url": "https://api.chucknorris.io/jokes/dyggEo00T9Wx0peOZD0yeg",
 *   "value": "\"For Chuck Norris so loved the world that he gave his one and only Son, Chuck Norris, that whoever believes in him shall not perish but have eternal life.\" -- John 3:16"
 * }
 */

export interface RandomChuckNorrisJoke {
	id: string;
	url: string;
	value: string;
}
