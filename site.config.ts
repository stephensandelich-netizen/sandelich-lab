/**
 * Scholar Pages — primary configuration
 *
 * Start here for identity, profile, links, and page introductions.
 * Publications, CV records, projects, courses, and posts live in src/data
 * and src/content so this file stays quick to scan.
 */
import { defineSiteConfig } from "./src/config/site";

export const siteConfig = defineSiteConfig({
	author: "Stephen Sandelich, MD",
	siteUrl: "https://www.sandelichlab.org",
	hero: {
		headline:
			"Advancing emergency care for adolescents and young adults through evidence-based screening, harm reduction, and linkage-to-care pathways.",
		subheadline:
			"The Sandelich Lab studies how emergency departments identify and respond to adolescent substance use. We build and test screening tools, treatment pathways, and community outreach programs so that an ED visit becomes a turning point, not just a treatment.",
		profileImage: "/profile.svg",
		statusBadge: "Open to research collaboration",
	},

	description:
		"The Sandelich Lab develops and evaluates strategies to improve how healthcare systems identify and respond to adolescent substance use.",
	keywords: [
		"adolescent substance use",
		"pediatric emergency medicine",
		"opioid use disorder",
		"harm reduction",
		"emergency department screening",
		"Penn State Health",
	],
	affiliations: [
		{
			role: "Assistant Professor, Emergency Medicine & Pediatrics",
			institution: "Penn State College of Medicine",
			url: "https://www.pennstatehealth.org/",
		},
	],
	researchInterests: [
		"Substance Use Screening",
		"Opioid Use Disorder",
		"Social Vulnerability",
		"Care Transitions",
	],
	navLinks: [
		{ href: "/about", label: "About" },
		{ href: "/research", label: "Research" },
		{ href: "/outreach", label: "Outreach" },
		{ href: "/media", label: "Media" },
		{ href: "/researches", label: "Publications" },
		{ href: "/posts", label: "Blog" },
		{ href: "/get-involved", label: "Get Involved" },
		{ href: "/contact", label: "Contact" },
	],
	socialLinks: [
		{
			label: "Google Scholar",
			href: "https://scholar.google.com/citations?user=6BzNjZMAAAAJ",
			icon: "i-academicons:google-scholar",
		},
		{
			label: "Bluesky",
			href: "https://bsky.app/profile/sandelichmd.bsky.social",
			icon: "i-mdi:butterfly-outline",
		},
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/stephen-sandelich-md",
			icon: "i-mdi:linkedin",
		},
		{
			label: "Email",
			href: "mailto:Sandelich.MD@gmail.com",
			icon: "i-mdi:email-outline",
		},
	],

	pageTitles: {
		about: {
			description:
				"Assistant Professor of Emergency Medicine and Pediatrics at Penn State Health, and Associate Director of Outreach for the Penn State Addiction Center for Translation.",
		},
		researches: {
			title: "Publications",
			description:
				"Peer-reviewed research, book chapters, and policy work on adolescent substance use, opioid use disorder, and emergency care. Full record on Google Scholar, linked above.",
		},
		projects: {
			title: "Research",
			description:
				"The emergency department is not the end of the story. It's where we have the chance to change it. Four lines of work close the gap between crisis moments and sustained recovery.",
		},
		posts: {
			description:
				"Notes on adolescent substance use, harm reduction, and what we're learning from the emergency department. New posts every few weeks.",
		},
	},

	homeBlocks: {
		hero: { enabled: true },
		publications: {
			enabled: true,
			title: "Recent Publications",
			description: "Newest peer-reviewed work — full list and Google Scholar link on the Publications page",
		},
		posts: { enabled: true },
	},
});

export default siteConfig;
