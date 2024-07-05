import { expect, test } from "vitest"
import { getRegexRules } from "./regex-rules.js"

test("Get JS Regex Rules", () => {
  expect(getRegexRules("js")).toBeInstanceOf(RegExp)
})