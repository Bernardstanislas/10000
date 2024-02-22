import firstnames from "./firstname.list";
import { Player } from "./player";

export const createPlayers = () => {
	return firstnames.map((name) => new Player(name));
};
