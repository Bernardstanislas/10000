import { describe, expect, it } from "vitest";
import { Player } from "./player";
import { Ladder } from "./ladder";

describe("Ladder", () => {
	it("can be created", () => {
		const bob = new Player("Bob");
		const ladder = new Ladder(bob);
		expect(ladder).toBeDefined();
	});
});
