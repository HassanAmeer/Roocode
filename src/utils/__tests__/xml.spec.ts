import { parseXml, parseXmlForDiff } from "../xml"

describe("parseXml", () => {
	describe("type conversion", () => {
		// Test the main change from the commit: no automatic type conversion
		it("should not convert string numbers to numbers", () => {
			const xml = `
        <vibext>
          <numericString>123</numericString>
          <negativeNumericString>-456</negativeNumericString>
          <floatNumericString>123.456</floatNumericString>
        </vibext>
      `

			const result = parseXml(xml) as any

			// Ensure these remain as strings and are not converted to numbers
			expect(typeof result.vibext.numericString).toBe("string")
			expect(result.vibext.numericString).toBe("123")

			expect(typeof result.vibext.negativeNumericString).toBe("string")
			expect(result.vibext.negativeNumericString).toBe("-456")

			expect(typeof result.vibext.floatNumericString).toBe("string")
			expect(result.vibext.floatNumericString).toBe("123.456")
		})

		it("should not convert string booleans to booleans", () => {
			const xml = `
        <vibext>
          <boolTrue>true</boolTrue>
          <boolFalse>false</boolFalse>
        </vibext>
      `

			const result = parseXml(xml) as any

			// Ensure these remain as strings and are not converted to booleans
			expect(typeof result.vibext.boolTrue).toBe("string")
			expect(result.vibext.boolTrue).toBe("true")

			expect(typeof result.vibext.boolFalse).toBe("string")
			expect(result.vibext.boolFalse).toBe("false")
		})

		it("should not convert attribute values to their respective types", () => {
			const xml = `
        <vibext>
          <node id="123" enabled="true" disabled="false" float="3.14" />
        </vibext>
      `

			const result = parseXml(xml) as any
			const attributes = result.vibext.node

			// Check that attributes remain as strings
			expect(typeof attributes["@_id"]).toBe("string")
			expect(attributes["@_id"]).toBe("123")

			expect(typeof attributes["@_enabled"]).toBe("string")
			expect(attributes["@_enabled"]).toBe("true")

			expect(typeof attributes["@_disabled"]).toBe("string")
			expect(attributes["@_disabled"]).toBe("false")

			expect(typeof attributes["@_float"]).toBe("string")
			expect(attributes["@_float"]).toBe("3.14")
		})
	})

	describe("basic functionality", () => {
		it("should correctly parse a simple XML string", () => {
			const xml = `
        <vibext>
          <name>Test Name</name>
          <description>Some description</description>
        </vibext>
      `

			const result = parseXml(xml) as any

			expect(result).toHaveProperty("vibext")
			expect(result.vibext).toHaveProperty("name", "Test Name")
			expect(result.vibext).toHaveProperty("description", "Some description")
		})

		it("should handle attributes correctly", () => {
			const xml = `
        <vibext>
          <item id="1" category="test">Item content</item>
        </vibext>
      `

			const result = parseXml(xml) as any

			expect(result.vibext.item).toHaveProperty("@_id", "1")
			expect(result.vibext.item).toHaveProperty("@_category", "test")
			expect(result.vibext.item).toHaveProperty("#text", "Item content")
		})

		it("should support stopNodes parameter", () => {
			const xml = `
        <vibext>
          <data>
            <nestedXml><item>Should not parse this</item></nestedXml>
          </data>
        </vibext>
      `

			const result = parseXml(xml, ["nestedXml"]) as any

			// With stopNodes, the parser still parses the structure but stops at the specified node
			expect(result.vibext.data.nestedXml).toBeTruthy()
			expect(result.vibext.data.nestedXml).toHaveProperty("item", "Should not parse this")
		})
	})
})

describe("parseXmlForDiff", () => {
	describe("HTML entity handling", () => {
		it("should NOT decode HTML entities like &amp;", () => {
			const xml = `
        <vibext>
          <content>Team Identity &amp; Project Positioning</content>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			// The &amp; should remain as-is, not be decoded to &
			expect(result.vibext.content).toBe("Team Identity &amp; Project Positioning")
		})

		it("should preserve & character without encoding", () => {
			const xml = `
        <vibext>
          <content>Team Identity & Project Positioning</content>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			// The & should remain as-is
			expect(result.vibext.content).toBe("Team Identity & Project Positioning")
		})

		it("should NOT decode other HTML entities", () => {
			const xml = `
        <vibext>
          <content>&lt;div&gt; &quot;Hello&quot; &apos;World&apos;</content>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			// All HTML entities should remain as-is
			expect(result.vibext.content).toBe("&lt;div&gt; &quot;Hello&quot; &apos;World&apos;")
		})

		it("should handle mixed content with entities correctly", () => {
			const xml = `
        <vibext>
          <code>if (a &lt; b &amp;&amp; c &gt; d) { return &quot;test&quot;; }</code>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			// All entities should remain unchanged
			expect(result.vibext.code).toBe("if (a &lt; b &amp;&amp; c &gt; d) { return &quot;test&quot;; }")
		})
	})

	describe("basic functionality (same as parseXml)", () => {
		it("should correctly parse a simple XML string", () => {
			const xml = `
        <vibext>
          <name>Test Name</name>
          <description>Some description</description>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			expect(result).toHaveProperty("vibext")
			expect(result.vibext).toHaveProperty("name", "Test Name")
			expect(result.vibext).toHaveProperty("description", "Some description")
		})

		it("should handle attributes correctly", () => {
			const xml = `
        <vibext>
          <item id="1" category="test">Item content</item>
        </vibext>
      `

			const result = parseXmlForDiff(xml) as any

			expect(result.vibext.item).toHaveProperty("@_id", "1")
			expect(result.vibext.item).toHaveProperty("@_category", "test")
			expect(result.vibext.item).toHaveProperty("#text", "Item content")
		})

		it("should support stopNodes parameter", () => {
			const xml = `
        <vibext>
          <data>
            <nestedXml><item>Should not parse this</item></nestedXml>
          </data>
        </vibext>
      `

			const result = parseXmlForDiff(xml, ["nestedXml"]) as any

			expect(result.vibext.data.nestedXml).toBeTruthy()
			expect(result.vibext.data.nestedXml).toHaveProperty("item", "Should not parse this")
		})
	})

	describe("diff-specific use case", () => {
		it("should preserve exact content for diff matching", () => {
			// This simulates the actual use case from the issue
			const xml = `
        <args>
          <file>
            <path>./doc.md</path>
            <diff>
              <content>Team Identity & Project Positioning</content>
            </diff>
          </file>
        </args>
      `

			const result = parseXmlForDiff(xml, ["file.diff.content"]) as any

			// The & should remain as-is for exact matching with file content
			expect(result.args.file.diff.content).toBe("Team Identity & Project Positioning")
		})
	})
})
