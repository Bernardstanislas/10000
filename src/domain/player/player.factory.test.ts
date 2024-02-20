import { describe, expect, it } from "vitest";
import { createPlayers } from "./player.factory";

describe("Player factory", () => {
	it("creates a different list at each invoke", () => {
		const firstList = createPlayers(10);
		const secondList = createPlayers(10);

		expect(firstList).not.toEqual(secondList);
	});
});
