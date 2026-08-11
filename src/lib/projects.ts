import {
	normalizeLinks,
	normalizeMetadata,
	normalizeStringArray,
	type ContentLink,
	type ContentMetadata,
} from "./content";

export type ProjectStatus = "active" | "past" | "unspecified";

export interface ProjectEntry {
	title: string;
	subtitle?: string;
	period?: string;
	description: string;
	tech: string[];
	url?: string;
	links?: ContentLink[];
	badges?: string[];
	highlights?: string[];
	metadata?: ContentMetadata[];
	featured?: boolean;
	status?: ProjectStatus;
}

export interface NormalizedProjectEntry extends ProjectEntry {
	tech: string[];
	links: ContentLink[];
	badges: string[];
	highlights: string[];
	metadata: ContentMetadata[];
}

export function getProjectStatus(project: ProjectEntry): ProjectStatus {
	if (project.status) return project.status;
	if (!project.period) return "unspecified";
	return /\bpresent\b/i.test(project.period) ? "active" : "past";
}

export function normalizeProject(project: ProjectEntry): NormalizedProjectEntry {
	return {
		...project,
		tech: normalizeStringArray(project.tech),
		links: normalizeLinks(
			project.links,
			project.url ? { label: "View Project", href: project.url } : undefined,
		),
		badges: normalizeStringArray(project.badges),
		highlights: normalizeStringArray(project.highlights),
		metadata: normalizeMetadata(project.metadata),
	};
}
