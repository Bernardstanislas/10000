import type { FC } from "hono/jsx";
import type { Game as GameType } from "../../domain/game";
import { Score } from "./Score";
import { Controls } from "./Controls";

type Props = {
	game: GameType;
};
export const Game: FC<Props> = ({ game }) => (
	<div id="game" class="max-w-3xl mx-auto lg:my-8 px-4">
		<Score game={game} />
		<Controls game={game} />
	</div>
);
