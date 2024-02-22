import type { FC } from "hono/jsx";
import type { Game } from "../../domain/game";
import { Layout } from "../Layout";
import type { Player } from "../../domain/player/player";

type Props = {
	games: Game[];
	players: Player[];
};

export const Home: FC<Props> = ({ games, players }) => {
	return (
		<Layout>
			<h1>Games</h1>
			<ul>
				{games.map((game) => (
					<li>
						<a
							href={`/games/${game.id}`}
							class="underline text-gray-500 hover:text-gray-700 visited:text-purple-600"
						>
							{game.ladders
								.map((ladder) => `${ladder.player.name} (${ladder.score})`)
								.join(", ")}
						</a>
					</li>
				))}
			</ul>
			<form method="POST" action="/games">
				<fieldset class="border border-black px-2 m-2">
					<legend class="px-2">
						<h2 class="font-medium">Create a new game</h2>
					</legend>
					{players.map((player) => (
						<div>
							<input
								type="checkbox"
								class="mr-1"
								id={player.name}
								value={player.name}
								name="players[]"
							/>
							<label for={player.name}>{player.name}</label>
						</div>
					))}
					<button
						type="submit"
						class="flex-1 max-w-40 text-sm font-medium border-gray-800 border h-10 my-2 px-4 py-2 hover:bg-gray-50"
					>
						Create
					</button>
				</fieldset>
			</form>
		</Layout>
	);
};
