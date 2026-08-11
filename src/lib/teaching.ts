import {
	normalizeLinks,
	normalizeStringArray,
	type ContentLink,
} from "./content";

export interface TeachingModule {
	title?: string;
	code?: string;
	summary?: string;
	tags?: string[];
	badges?: string[];
	highlights?: string[];
	link?: ContentLink;
	links?: ContentLink[];
}

export interface TeachingSection {
	term?: string;
	modules?: TeachingModule[];
}

export interface TeachingData {
	current?: TeachingSection[];
	past?: TeachingSection[];
}

export interface NormalizedTeachingModule extends TeachingModule {
	tags: string[];
	badges: string[];
	highlights: string[];
	links: ContentLink[];
}

export interface NormalizedTeachingSection
	extends Omit<TeachingSection, "modules"> {
	modules: NormalizedTeachingModule[];
}

export function normalizeTeachingModule(
	module: TeachingModule,
): NormalizedTeachingModule {
	return {
		...module,
		tags: normalizeStringArray(module.tags),
		badges: normalizeStringArray(module.badges),
		highlights: normalizeStringArray(module.highlights),
		links: normalizeLinks(module.links, module.link),
	};
}

export function normalizeTeachingSection(
	section: TeachingSection,
): NormalizedTeachingSection {
	return {
		...section,
		modules: (section.modules ?? []).map(normalizeTeachingModule),
	};
}
