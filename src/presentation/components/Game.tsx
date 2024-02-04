import type { FC } from "hono/jsx";
import type { Game as GameType } from "../../domain/game";
import { Score } from "./Score";
import { Controls } from "./Controls";

type Props = {
	game: GameType;
};
export const Game: FC<Props> = ({ game }) => (
	<div id="game">
		<Score game={game} />
		<Controls currentPlayer={game.currentPlayer.name} gameId={game.id} />
	</div>
);
