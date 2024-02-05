import type { FC } from "hono/jsx";
import type { Game } from "../../domain/game";
import { css } from "hono/css";

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
		<div id="controls" class="my-4">
			<h4 class="text-strong text-center font-medium">
				{game.currentPlayer.name}'s turn
			</h4>
			<form x-data="{score:100}">
				<input type="hidden" name="game" value={game.id} />
				<div class="flex">
					<input
						type="range"
						name="score"
						min="100"
						step="100"
						max="10000"
						x-model="score"
						class="flex-1 h-8 mx-4 my-2 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-runnable-track]:bg-black [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:-translate-y-1/2"
					/>
				</div>
				<div class="flex justify-around">
					<button
						hx-post="/score"
						hx-trigger="click"
						hx-target="#controls"
						hx-swap="outerHTML"
						type="button"
						class="min-w-40 text-sm font-medium border-gray-800 border h-10 px-4 py-2 hover:bg-gray-50"
					>
						+ <span x-text="score" />
					</button>
					<button
						hx-post="/failure"
						hx-trigger="click"
						hx-target="#controls"
						hx-swap="outerHTML"
						type="button"
						class="min-w-40 text-sm font-medium border-gray-800 border h-10 px-4 py-2 hover:bg-gray-50"
					>
						Fail
					</button>
				</div>
			</form>
		</div>
	);
};
