import type { FC } from "hono/jsx";
import type { Game } from "../../domain/game";
import { Layout } from "../Layout";

type Props = {
	games: Game[];
};
export const Games: FC<Props> = ({ games }) => {
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
		</Layout>
	);
};
