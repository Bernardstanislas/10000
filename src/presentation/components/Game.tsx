import type { FC } from "hono/jsx";
import type { Game as GameType } from "../../domain/game";

type Props = {
	game: GameType;
};
export const Game: FC<Props> = ({ game }) => {
	const biggestLadder = game.ladders.reduce((max, ladder) => {
		return Math.max(max, ladder.scoreMarks.length);
	}, 0);
	return (
		<table id="game">
			<tr>
				{game.ladders.map((ladder) => {
					return <th scope="col">{ladder.player.name}</th>;
				})}
			</tr>
			{Array.from({ length: biggestLadder }).map((_, rowIndex) => {
				return (
					<tr>
						{game.ladders.map((ladder) => {
							return (
								<td
									style={{
										textDecoration: ladder.scoreMarks[rowIndex]?.cancelled
											? "line-through"
											: "none",
									}}
								>
									{ladder.scoreMarks[rowIndex]?.score}{" "}
									{Array.from({
										length: ladder.scoreMarks[rowIndex]?.failures || 0,
									}).map((_) => "×")}
								</td>
							);
						})}
					</tr>
				);
			})}
		</table>
	);
};
