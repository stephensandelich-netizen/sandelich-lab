#!/usr/bin/env node
import { mkdir, readdir, readFile, stat, copyFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

function toPosixPath(path) {
	return path.split(sep).join("/");
}

function globToRegExp(pattern) {
	const normalized = toPosixPath(pattern);
	let source = "";

	for (let index = 0; index < normalized.length; index += 1) {
		const char = normalized[index];
		const next = normalized[index + 1];

		if (char === "*" && next === "*") {
			source += ".*";
			index += 1;
			continue;
		}

		if (char === "*") {
			source += "[^/]*";
			continue;
		}

		source += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
	}

	return new RegExp(`^${source}$`);
}

function matchesPattern(path, pattern) {
	const normalizedPath = toPosixPath(path);

	if (pattern.endsWith("/**")) {
		const prefix = toPosixPath(pattern.slice(0, -3));
		return normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`);
	}

	return globToRegExp(pattern).test(normalizedPath);
}

export function isProtectedPath(path, patterns) {
	return patterns.some((pattern) => matchesPattern(path, pattern));
}

async function listFiles(root, current = root) {
	const entries = await readdir(current, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const absolute = join(current, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listFiles(root, absolute)));
		} else if (entry.isFile()) {
			files.push(toPosixPath(relative(root, absolute)));
		}
	}

	return files;
}

export async function syncTemplateRelease({
	sourceDir,
	targetDir,
	protectedPaths,
	excludedPaths,
}) {
	const sourceFiles = await listFiles(sourceDir);
	let copied = 0;
	let skipped = 0;

	for (const file of sourceFiles) {
		if (isProtectedPath(file, protectedPaths) || isProtectedPath(file, excludedPaths)) {
			skipped += 1;
			continue;
		}

		const source = join(sourceDir, file);
		const target = join(targetDir, file);
		const sourceStat = await stat(source);

		if (!sourceStat.isFile()) {
			skipped += 1;
			continue;
		}

		await mkdir(dirname(target), { recursive: true });
		await copyFile(source, target);
		copied += 1;
	}

	return { copied, skipped };
}

function readArg(name) {
	const index = process.argv.indexOf(name);
	if (index < 0) return null;
	return process.argv[index + 1] ?? null;
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
	const sourceDir = readArg("--source");
	const targetDir = readArg("--target") ?? process.cwd();
	const configPath = readArg("--config") ?? ".template-sync.json";

	if (!sourceDir) {
		console.error("Missing --source path.");
		process.exit(1);
	}

	const config = JSON.parse(await readFile(configPath, "utf8"));
	const result = await syncTemplateRelease({
		sourceDir,
		targetDir,
		protectedPaths: config.protected ?? [],
		excludedPaths: config.exclude ?? [],
	});

	console.log(
		`Template sync copied ${result.copied} file(s), skipped ${result.skipped} file(s).`,
	);
}
