import { describe, expect, test } from "vitest";
import { isProtectedPath } from "../scripts/sync-template-release.mjs";

describe("template sync path protection", () => {
	test("protects user-owned content paths", () => {
		const patterns = [
			"site.config.ts",
			"src/data/**",
			"src/side.config.ts",
			"public/profile.*",
		];

		expect(isProtectedPath("src/data/about.yml", patterns)).toBe(true);
		expect(isProtectedPath("src/data/nested/file.yml", patterns)).toBe(true);
		expect(isProtectedPath("site.config.ts", patterns)).toBe(true);
		expect(isProtectedPath("src/side.config.ts", patterns)).toBe(true);
		expect(isProtectedPath("public/profile.svg", patterns)).toBe(true);
	});

	test("allows template-owned source paths", () => {
		const patterns = [
			"site.config.ts",
			"src/data/**",
			"src/side.config.ts",
			"public/profile.*",
		];

		expect(isProtectedPath("src/pages/projects.astro", patterns)).toBe(false);
		expect(isProtectedPath("src/lib/projects.ts", patterns)).toBe(false);
		expect(isProtectedPath("public/robots.txt", patterns)).toBe(false);
	});
});
