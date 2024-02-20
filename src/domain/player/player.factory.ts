import firstnames from "./firstname.list";
import { Player } from "./player";

export const createPlayers = (count: number) => {
	return firstnames
		.sort(() => 0.5 - Math.random())
		.slice(0, count)
		.map((name) => new Player(name));
};
