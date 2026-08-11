import projectsRaw from '../data/projects.yml?raw';
import { parse } from 'yaml';
import { normalizeProject, type ProjectEntry } from '../lib/projects';

const parsedProjects = parse(projectsRaw) as ProjectEntry[] | null;

export const projects = Array.isArray(parsedProjects)
	? parsedProjects.map(normalizeProject)
	: [];
