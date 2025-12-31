// npx vitest run src/__tests__/index.test.ts

import { generatePackageJson } from "../index.js"

describe("generatePackageJson", () => {
	it("should be a test", () => {
		const generatedPackageJson = generatePackageJson({
			packageJson: {
				name: "vibex-cline",
				displayName: "%extension.displayName%",
				description: "%extension.description%",
				publisher: "Vibex",
				version: "3.17.2",
				icon: "assets/icons/icon.png",
				contributes: {
					viewsContainers: {
						activitybar: [
							{
								id: "vibex-cline-ActivityBar",
								title: "%views.activitybar.title%",
								icon: "assets/icons/icon.svg",
							},
						],
					},
					views: {
						"vibex-cline-ActivityBar": [
							{
								type: "webview",
								id: "vibex-cline.SidebarProvider",
								name: "",
							},
						],
					},
					commands: [
						{
							command: "vibex-cline.plusButtonClicked",
							title: "%command.newTask.title%",
							icon: "$(edit)",
						},
						{
							command: "vibex-cline.openInNewTab",
							title: "%command.openInNewTab.title%",
							category: "%configuration.title%",
						},
					],
					menus: {
						"editor/context": [
							{
								submenu: "vibex-cline.contextMenu",
								group: "navigation",
							},
						],
						"vibex-cline.contextMenu": [
							{
								command: "vibex-cline.addToContext",
								group: "1_actions@1",
							},
						],
						"editor/title": [
							{
								command: "vibex-cline.plusButtonClicked",
								group: "navigation@1",
								when: "activeWebviewPanelId == vibex-cline.TabPanelProvider",
							},
							{
								command: "vibex-cline.settingsButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == vibex-cline.TabPanelProvider",
							},
							{
								command: "vibex-cline.accountButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == vibex-cline.TabPanelProvider",
							},
						],
					},
					submenus: [
						{
							id: "vibex-cline.contextMenu",
							label: "%views.contextMenu.label%",
						},
						{
							id: "vibex-cline.terminalMenu",
							label: "%views.terminalMenu.label%",
						},
					],
					configuration: {
						title: "%configuration.title%",
						properties: {
							"vibex-cline.allowedCommands": {
								type: "array",
								items: {
									type: "string",
								},
								default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
								description: "%commands.allowedCommands.description%",
							},
							"vibex-cline.customStoragePath": {
								type: "string",
								default: "",
								description: "%settings.customStoragePath.description%",
							},
						},
					},
				},
				scripts: {
					lint: "eslint **/*.ts",
				},
			},
			overrideJson: {
				name: "vibex-code-nightly",
				displayName: "Vibex Nightly",
				publisher: "Vibex",
				version: "0.0.1",
				icon: "assets/icons/icon-nightly.png",
				scripts: {},
			},
			substitution: ["vibex-cline", "vibex-code-nightly"],
		})

		expect(generatedPackageJson).toStrictEqual({
			name: "vibex-code-nightly",
			displayName: "Vibex Nightly",
			description: "%extension.description%",
			publisher: "Vibex",
			version: "0.0.1",
			icon: "assets/icons/icon-nightly.png",
			contributes: {
				viewsContainers: {
					activitybar: [
						{
							id: "vibex-code-nightly-ActivityBar",
							title: "%views.activitybar.title%",
							icon: "assets/icons/icon.svg",
						},
					],
				},
				views: {
					"vibex-code-nightly-ActivityBar": [
						{
							type: "webview",
							id: "vibex-code-nightly.SidebarProvider",
							name: "",
						},
					],
				},
				commands: [
					{
						command: "vibex-code-nightly.plusButtonClicked",
						title: "%command.newTask.title%",
						icon: "$(edit)",
					},
					{
						command: "vibex-code-nightly.openInNewTab",
						title: "%command.openInNewTab.title%",
						category: "%configuration.title%",
					},
				],
				menus: {
					"editor/context": [
						{
							submenu: "vibex-code-nightly.contextMenu",
							group: "navigation",
						},
					],
					"vibex-code-nightly.contextMenu": [
						{
							command: "vibex-code-nightly.addToContext",
							group: "1_actions@1",
						},
					],
					"editor/title": [
						{
							command: "vibex-code-nightly.plusButtonClicked",
							group: "navigation@1",
							when: "activeWebviewPanelId == vibex-code-nightly.TabPanelProvider",
						},
						{
							command: "vibex-code-nightly.settingsButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == vibex-code-nightly.TabPanelProvider",
						},
						{
							command: "vibex-code-nightly.accountButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == vibex-code-nightly.TabPanelProvider",
						},
					],
				},
				submenus: [
					{
						id: "vibex-code-nightly.contextMenu",
						label: "%views.contextMenu.label%",
					},
					{
						id: "vibex-code-nightly.terminalMenu",
						label: "%views.terminalMenu.label%",
					},
				],
				configuration: {
					title: "%configuration.title%",
					properties: {
						"vibex-code-nightly.allowedCommands": {
							type: "array",
							items: {
								type: "string",
							},
							default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
							description: "%commands.allowedCommands.description%",
						},
						"vibex-code-nightly.customStoragePath": {
							type: "string",
							default: "",
							description: "%settings.customStoragePath.description%",
						},
					},
				},
			},
			scripts: {},
		})
	})
})
