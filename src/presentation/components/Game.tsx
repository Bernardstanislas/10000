import type { FC } from "hono/jsx";
import type { Game as GameType } from "../../domain/game";

type Props = {
	game: GameType;
};
export const Game: FC<Props> = ({ game }) => {
	return (
		<ul>
			{game.ladders.map((ladder) => {
				return (
					<li>
						{ladder.player.name}:
						<ul>
							{ladder.scoreMarks.map((scoreMark) => {
								return <li>{scoreMark.score}</li>;
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};
