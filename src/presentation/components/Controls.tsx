import type { FC } from "hono/jsx";

type Props = {
	currentPlayer: string;
	gameId: string;
};

export const Controls: FC<Props> = ({ currentPlayer, gameId }) => {
	return (
		<>
			<h4>{currentPlayer}'s turn</h4>
			<form>
				<input type="hidden" name="game" value={gameId} />
				<input type="number" id="score" name="score" />
				<button
					hx-post="/score"
					hx-trigger="click"
					hx-target="#game"
					hx-swap="outerHTML"
					type="button"
				>
					Add score
				</button>
				<button type="submit">Add failure</button>
			</form>
		</>
	);
};
