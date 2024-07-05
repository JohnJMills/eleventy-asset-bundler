import { expect, test } from "vitest"
import getSourcePath from "./get-source-path.js"

test("Get Source Path", () => {
  expect(
    getSourcePath(
      "",
      "/Users/johnmills/Sites/eleventy-asset-bundler/sample",
      "src",
      "/_assets/js/main.js"
    )
  ).toBe(
    "/Users/johnmills/Sites/eleventy-asset-bundler/sample/src/_assets/js/main.js"
  )
  expect(
    getSourcePath(
      "./src/home/home.md",
      "/Users/johnmills/Sites/eleventy-asset-bundler/sample",
      "src",
      "_assets/js/main.js"
    )
  ).toBe(
    "/Users/johnmills/Sites/eleventy-asset-bundler/sample/src/home/_assets/js/main.js"
  )
})
