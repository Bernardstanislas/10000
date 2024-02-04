import type { FC } from "hono/jsx";

type Props = {
	currentPlayer: string;
	gameId: string;
};

export const Controls: FC<Props> = ({ currentPlayer, gameId }) => {
	return (
		<div id="controls">
			<h4>{currentPlayer}'s turn</h4>
			<form>
				<input type="hidden" name="game" value={gameId} />
				<input type="number" name="score" />
				<button
					hx-post="/score"
					hx-trigger="click"
					hx-target="#controls"
					hx-swap="outerHTML"
					type="button"
				>
					Add score
				</button>
				<button
					hx-post="/failure"
					hx-trigger="click"
					hx-target="#controls"
					hx-swap="outerHTML"
					type="button"
				>
					Add failure
				</button>
			</form>
		</div>
	);
};
