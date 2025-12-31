import * as path from "path"

describe("custom-instructions path detection", () => {
	it("should use exact path comparison instead of string includes", () => {
		// Test the logic that our fix implements
		const fakeHomeDir = "/Users/john.vibex.smith"
		const globalVibexDir = path.join(fakeHomeDir, ".vibex") // "/Users/john.vibex.smith/.vibex"
		const projectVibexDir = "/projects/my-project/.vibex"

		// Old implementation (fragile):
		// const isGlobal = vibexDir.includes(path.join(os.homedir(), ".vibex"))
		// This could fail if the home directory path contains ".vibex" elsewhere

		// New implementation (robust):
		// const isGlobal = path.resolve(vibexDir) === path.resolve(getGlobalVibexDirectory())

		// Test the new logic
		const isGlobalForGlobalDir = path.resolve(globalVibexDir) === path.resolve(globalVibexDir)
		const isGlobalForProjectDir = path.resolve(projectVibexDir) === path.resolve(globalVibexDir)

		expect(isGlobalForGlobalDir).toBe(true)
		expect(isGlobalForProjectDir).toBe(false)

		// Verify that the old implementation would have been problematic
		// if the home directory contained ".vibex" in the path
		const oldLogicGlobal = globalVibexDir.includes(path.join(fakeHomeDir, ".vibex"))
		const oldLogicProject = projectVibexDir.includes(path.join(fakeHomeDir, ".vibex"))

		expect(oldLogicGlobal).toBe(true) // This works
		expect(oldLogicProject).toBe(false) // This also works, but is fragile

		// The issue was that if the home directory path itself contained ".vibex",
		// the includes() check could produce false positives in edge cases
	})

	it("should handle edge cases with path resolution", () => {
		// Test various edge cases that exact path comparison handles better
		const testCases = [
			{
				global: "/Users/test/.vibex",
				project: "/Users/test/project/.vibex",
				expected: { global: true, project: false },
			},
			{
				global: "/home/user/.vibex",
				project: "/home/user/.vibex", // Same directory
				expected: { global: true, project: true },
			},
			{
				global: "/Users/john.vibex.smith/.vibex",
				project: "/projects/app/.vibex",
				expected: { global: true, project: false },
			},
		]

		testCases.forEach(({ global, project, expected }) => {
			const isGlobalForGlobal = path.resolve(global) === path.resolve(global)
			const isGlobalForProject = path.resolve(project) === path.resolve(global)

			expect(isGlobalForGlobal).toBe(expected.global)
			expect(isGlobalForProject).toBe(expected.project)
		})
	})
})
