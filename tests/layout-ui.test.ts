import { describe, expect, it } from "vitest";
import { getBackToTopScrollBehavior } from "../src/scripts/layout-ui";

describe("layout UI helpers", () => {
	it("uses instant scroll when reduced motion is requested", () => {
		expect(getBackToTopScrollBehavior(true)).toBe("auto");
	});

	it("uses smooth scroll when reduced motion is not requested", () => {
		expect(getBackToTopScrollBehavior(false)).toBe("smooth");
	});
});
