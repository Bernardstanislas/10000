import type { FC } from "hono/jsx";
import type { Game } from "../../domain/game";

type Props = {
	game: Game;
};
export const Score: FC<Props> = ({ game }) => {
	const biggestLadder = game.ladders.reduce((max, ladder) => {
		return Math.max(max, ladder.scoreMarks.length);
	}, 0);
	return (
		<table
			hx-target="this"
			hx-get={`/partials/score/${game.id}`}
			hx-trigger="update-score from:body"
			hx-swap="outerHTML"
			class="table-auto text-center border-separate border-spacing-y-4"
		>
			<tr class="divide-x-2 divide-black">
				{game.ladders.map((ladder) => {
					return (
						<th scope="col" class="p-2 border-b-2 border-black min-w-32">
							{ladder.player.name}
						</th>
					);
				})}
			</tr>
			{Array.from({ length: biggestLadder }).map((_, rowIndex) => {
				return (
					<tr class="divide-x-2 divide-black mb-4">
						{game.ladders.map((ladder) => {
							return (
								<td
									style={{
										textDecoration: ladder.scoreMarks[rowIndex]?.cancelled
											? "line-through"
											: "none",
									}}
									class="p-2"
								>
									{ladder.scoreMarks[rowIndex]?.score ?? "-"}
									{ladder.scoreMarks[rowIndex]?.failures > 0 && " "}
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
