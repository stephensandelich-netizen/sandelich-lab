export interface ContentLink {
	label: string;
	href: string;
	icon?: string;
}

export interface ContentMetadata {
	label: string;
	value: string;
}

function hasText(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

export function normalizeStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter(hasText).map((item) => item.trim());
}

export function normalizeLinks(
	links: unknown,
	fallback?: ContentLink,
): ContentLink[] {
	if (Array.isArray(links)) {
		const normalized = links
			.filter(
				(link): link is ContentLink =>
					Boolean(link) &&
					typeof link === "object" &&
					hasText((link as ContentLink).label) &&
					hasText((link as ContentLink).href),
			)
			.map((link) => ({
				label: link.label.trim(),
				href: link.href.trim(),
				...(hasText(link.icon) ? { icon: link.icon.trim() } : {}),
			}));

		if (normalized.length > 0) return normalized;
	}

	return fallback ? [fallback] : [];
}

export function normalizeMetadata(value: unknown): ContentMetadata[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter(
			(item): item is ContentMetadata =>
				Boolean(item) &&
				typeof item === "object" &&
				hasText((item as ContentMetadata).label) &&
				hasText((item as ContentMetadata).value),
		)
		.map((item) => ({
			label: item.label.trim(),
			value: item.value.trim(),
		}));
}
