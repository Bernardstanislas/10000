import type { FC } from "hono/jsx";

type Props = {
	currentPlayer: string;
};

export const Controls: FC<Props> = ({ currentPlayer }) => {
	return (
		<>
			<h4>{currentPlayer}'s turn</h4>
			<form>
				<input type="number" id="score" name="score" />
				<button type="submit">Add score</button>
			</form>
			<form>
				<button type="submit">Add failure</button>
			</form>
		</>
	);
};
