import {
	buildFilterSearch,
	isFilterSectionVisible,
	readFilterFromSearch,
} from "../lib/filter-state";

const boundFilterButtons = new WeakSet<HTMLElement>();
const boundAbstractToggles = new WeakSet<HTMLButtonElement>();

function toggleClasses(element: Element, enabled: boolean, classes: string[]) {
	for (const className of classes) {
		element.classList.toggle(className, enabled);
	}
}

function setActiveButton(buttons: NodeListOf<HTMLElement>, activeButton: HTMLElement) {
	buttons.forEach((button) => {
		const isActive = button === activeButton;
		const icon = button.querySelector("[data-filter-icon]");
		const count = button.querySelector("[data-filter-count]");
		const label = button.querySelector("[data-filter-label]");

		button.dataset.active = String(isActive);
		button.setAttribute("aria-pressed", String(isActive));
		button.classList.toggle("active", isActive);

		if (icon) {
			toggleClasses(icon, isActive, ["text-accent-700", "dark:text-accent-300"]);
			toggleClasses(icon, !isActive, ["text-gray-500", "dark:text-gray-300"]);
		}
		if (count) {
			toggleClasses(count, isActive, ["text-accent-700", "dark:text-accent-300"]);
			toggleClasses(count, !isActive, ["text-gray-500", "dark:text-gray-300"]);
		}
		if (label) {
			toggleClasses(label, isActive, ["text-accent-800", "dark:text-accent-200"]);
			toggleClasses(label, !isActive, ["text-gray-700", "dark:text-gray-200"]);
		}
	});
}

function syncPageSectionNavigation(root: ParentNode, activeFilter: string) {
	const navigation = root.querySelector<HTMLElement>("[aria-label='Page sections']");
	if (!navigation) return;

	const links = navigation.querySelectorAll<HTMLAnchorElement>("a[href^='#']");
	links.forEach((link) => {
		const sectionId = link.hash.slice(1);
		const isVisible = activeFilter === "all" || sectionId === activeFilter;
		link.hidden = !isVisible;
		link.classList.toggle("hidden", !isVisible);
	});

	const shouldHideNavigation = activeFilter !== "all";
	navigation.hidden = shouldHideNavigation;
	navigation.classList.toggle("hidden", shouldHideNavigation);
}

export function setupFilterControls(root: ParentNode = document) {
	const buttons = root.querySelectorAll<HTMLElement>("[data-filter]");
	const sections = root.querySelectorAll<HTMLElement>("[data-filter-section]");
	const allowedFilters = Array.from(buttons)
		.map((button) => button.dataset.filter)
		.filter((filter): filter is string => Boolean(filter));
	const requestedFilter = readFilterFromSearch(window.location.search, allowedFilters);
	const requestedButton = requestedFilter
		? Array.from(buttons).find((button) => button.dataset.filter === requestedFilter)
		: undefined;
	const initialButton =
		requestedButton ??
		root.querySelector<HTMLElement>("[data-filter][data-active='true']") ??
		root.querySelector<HTMLElement>("[data-filter][aria-pressed='true']") ??
		root.querySelector<HTMLElement>("[data-filter].active");

	if (initialButton) {
		setActiveButton(buttons, initialButton);
		const initialFilter = initialButton.dataset.filter;

		sections.forEach((section) => {
			const visible = isFilterSectionVisible(initialFilter ?? "all", section.dataset.filterSection);
			section.hidden = !visible;
			section.classList.toggle("hidden", !visible);
		});

		syncPageSectionNavigation(root, initialFilter ?? "all");
	}

	buttons.forEach((button) => {
		if (boundFilterButtons.has(button)) return;
		boundFilterButtons.add(button);

		button.addEventListener("click", () => {
			const filter = button.dataset.filter;
			if (!filter) return;

			setActiveButton(buttons, button);

			sections.forEach((section) => {
				const visible = isFilterSectionVisible(filter, section.dataset.filterSection);
				section.hidden = !visible;
				section.classList.toggle("hidden", !visible);
			});

			syncPageSectionNavigation(root, filter);

			const nextSearch = buildFilterSearch(window.location.search, filter);
			const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
			window.history.replaceState({}, "", nextUrl);
		});
	});
}

export function setupAbstractToggles(root: ParentNode = document) {
	root.querySelectorAll<HTMLButtonElement>("[data-abstract-toggle]").forEach((toggle) => {
		if (boundAbstractToggles.has(toggle)) return;
		boundAbstractToggles.add(toggle);

		toggle.addEventListener("click", () => {
			const targetId = toggle.dataset.target;
			if (!targetId) return;

			const abstract = document.getElementById(targetId);
			if (!abstract) return;

			const expanded = toggle.getAttribute("aria-expanded") === "true";
			const nextExpanded = !expanded;
			toggle.setAttribute("aria-expanded", String(nextExpanded));
			abstract.hidden = !nextExpanded;
			abstract.classList.toggle("hidden", !nextExpanded);
			toggle
				.querySelector("[data-abstract-icon]")
				?.classList.toggle("rotate-180", nextExpanded);
		});
	});
}
