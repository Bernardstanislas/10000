import type { FC } from "hono/jsx";
import type { Game } from "../../domain/game";

type Props = {
	game: Game;
};

export const Controls: FC<Props> = ({ game }) => {
	if (game.finished) {
		return (
			<div id="controls">
				<h4>
					<strong>{game.winner?.name}</strong> wins!
				</h4>
			</div>
		);
	}
	return (
		<div id="controls">
			<h4>{game.currentPlayer.name}'s turn</h4>
			<form x-data="{score:100}">
				<input type="hidden" name="game" value={game.id} />
				<p>
					<input
						type="range"
						name="score"
						min="100"
						step="100"
						max="10000"
						x-model="score"
						style={{ width: "100%", maxWidth: "300px" }}
					/>
				</p>
				<p>
					<button
						hx-post="/score"
						hx-trigger="click"
						hx-target="#controls"
						hx-swap="outerHTML"
						type="button"
					>
						+ <span x-text="score" />
					</button>
					<button
						hx-post="/failure"
						hx-trigger="click"
						hx-target="#controls"
						hx-swap="outerHTML"
						type="button"
					>
						Fail
					</button>
				</p>
			</form>
		</div>
	);
};
