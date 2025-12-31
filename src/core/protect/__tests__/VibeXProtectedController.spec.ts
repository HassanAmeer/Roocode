import path from "path"
import { VibeXProtectedController } from "../VibeXProtectedController"

describe("VibeXProtectedController", () => {
	const TEST_CWD = "/test/workspace"
	let controller: VibeXProtectedController

	beforeEach(() => {
		controller = new VibeXProtectedController(TEST_CWD)
	})

	describe("isWriteProtected", () => {
		it("should protect .vibexignore file", () => {
			expect(controller.isWriteProtected(".vibexignore")).toBe(true)
		})

		it("should protect files in .vibex directory", () => {
			expect(controller.isWriteProtected(".vibex/config.json")).toBe(true)
			expect(controller.isWriteProtected(".vibex/settings/user.json")).toBe(true)
			expect(controller.isWriteProtected(".vibex/modes/custom.json")).toBe(true)
		})

		it("should protect .vibexprotected file", () => {
			expect(controller.isWriteProtected(".vibexprotected")).toBe(true)
		})

		it("should protect .vibexmodes files", () => {
			expect(controller.isWriteProtected(".vibexmodes")).toBe(true)
		})

		it("should protect .vibexrules* files", () => {
			expect(controller.isWriteProtected(".vibexrules")).toBe(true)
			expect(controller.isWriteProtected(".vibexrules.md")).toBe(true)
		})

		it("should protect .clinerules* files", () => {
			expect(controller.isWriteProtected(".clinerules")).toBe(true)
			expect(controller.isWriteProtected(".clinerules.md")).toBe(true)
		})

		it("should protect files in .vscode directory", () => {
			expect(controller.isWriteProtected(".vscode/settings.json")).toBe(true)
			expect(controller.isWriteProtected(".vscode/launch.json")).toBe(true)
			expect(controller.isWriteProtected(".vscode/tasks.json")).toBe(true)
		})

		it("should protect .code-workspace files", () => {
			expect(controller.isWriteProtected("myproject.code-workspace")).toBe(true)
			expect(controller.isWriteProtected("pentest.code-workspace")).toBe(true)
			expect(controller.isWriteProtected(".code-workspace")).toBe(true)
			expect(controller.isWriteProtected("folder/workspace.code-workspace")).toBe(true)
		})

		it("should protect AGENTS.md file", () => {
			expect(controller.isWriteProtected("AGENTS.md")).toBe(true)
		})

		it("should protect AGENT.md file", () => {
			expect(controller.isWriteProtected("AGENT.md")).toBe(true)
		})

		it("should not protect other files starting with .vibex", () => {
			expect(controller.isWriteProtected(".vibexsettings")).toBe(false)
			expect(controller.isWriteProtected(".vibexconfig")).toBe(false)
		})

		it("should not protect regular files", () => {
			expect(controller.isWriteProtected("src/index.ts")).toBe(false)
			expect(controller.isWriteProtected("package.json")).toBe(false)
			expect(controller.isWriteProtected("README.md")).toBe(false)
		})

		it("should not protect files that contain 'vibex' but don't start with .vibex", () => {
			expect(controller.isWriteProtected("src/vibex-utils.ts")).toBe(false)
			expect(controller.isWriteProtected("config/vibex.config.js")).toBe(false)
		})

		it("should handle nested paths correctly", () => {
			expect(controller.isWriteProtected(".vibex/config.json")).toBe(true) // .vibex/** matches at vibext
			expect(controller.isWriteProtected("nested/.vibexignore")).toBe(true) // .vibexignore matches anywhere by default
			expect(controller.isWriteProtected("nested/.vibexmodes")).toBe(true) // .vibexmodes matches anywhere by default
			expect(controller.isWriteProtected("nested/.vibexrules.md")).toBe(true) // .vibexrules* matches anywhere by default
		})

		it("should handle absolute paths by converting to relative", () => {
			const absolutePath = path.join(TEST_CWD, ".vibexignore")
			expect(controller.isWriteProtected(absolutePath)).toBe(true)
		})

		it("should handle paths with different separators", () => {
			expect(controller.isWriteProtected(".vibex\\config.json")).toBe(true)
			expect(controller.isWriteProtected(".vibex/config.json")).toBe(true)
		})
	})

	describe("getProtectedFiles", () => {
		it("should return set of protected files from a list", () => {
			const files = ["src/index.ts", ".vibexignore", "package.json", ".vibex/config.json", "README.md"]

			const protectedFiles = controller.getProtectedFiles(files)

			expect(protectedFiles).toEqual(new Set([".vibexignore", ".vibex/config.json"]))
		})

		it("should return empty set when no files are protected", () => {
			const files = ["src/index.ts", "package.json", "README.md"]

			const protectedFiles = controller.getProtectedFiles(files)

			expect(protectedFiles).toEqual(new Set())
		})
	})

	describe("annotatePathsWithProtection", () => {
		it("should annotate paths with protection status", () => {
			const files = ["src/index.ts", ".vibexignore", ".vibex/config.json", "package.json"]

			const annotated = controller.annotatePathsWithProtection(files)

			expect(annotated).toEqual([
				{ path: "src/index.ts", isProtected: false },
				{ path: ".vibexignore", isProtected: true },
				{ path: ".vibex/config.json", isProtected: true },
				{ path: "package.json", isProtected: false },
			])
		})
	})

	describe("getProtectionMessage", () => {
		it("should return appropriate protection message", () => {
			const message = controller.getProtectionMessage()
			expect(message).toBe("This is a Vibex configuration file and requires approval for modifications")
		})
	})

	describe("getInstructions", () => {
		it("should return formatted instructions about protected files", () => {
			const instructions = controller.getInstructions()

			expect(instructions).toContain("# Protected Files")
			expect(instructions).toContain("write-protected")
			expect(instructions).toContain(".vibexignore")
			expect(instructions).toContain(".vibex/**")
			expect(instructions).toContain("\u{1F6E1}") // Shield symbol
		})
	})

	describe("getProtectedPatterns", () => {
		it("should return the list of protected patterns", () => {
			const patterns = VibeXProtectedController.getProtectedPatterns()

			expect(patterns).toEqual([
				".vibexignore",
				".vibexmodes",
				".vibexrules*",
				".clinerules*",
				".vibex/**",
				".vscode/**",
				"*.code-workspace",
				".vibexprotected",
				"AGENTS.md",
				"AGENT.md",
			])
		})
	})
})
