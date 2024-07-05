import { expect, test } from "vitest"
import { filterAsset, getAssetList } from "./get-asset-list.js"

test("Get JS List", () => {
  const results = [
    {
      inputPath: "./src/home/home.md",
      outputPath: "./dist/index.html",
      url: "/",
      content:
        "<!doctype html>\n" +
        '<html lang="en">\n' +
        "  <head>\n" +
        '    <meta charset="utf-8">\n' +
        "    <title>Home</title>\n" +
        '    <link rel="stylesheet" href="/_assets/scss/main.scss">\n' +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Hello World</h1>\n" +
        "<p>The quick brown fox jumped over the lazy dog.</p>\n" +
        "\n" +
        "    </main>\n" +
        '    <script src="/_assets/js/main.js"></script>\n' +
        "  </body>\n" +
        "</html>",
      rawInput:
        "\n# Hello World\n\nThe quick brown fox jumped over the lazy dog.\n",
    },
    {
      inputPath: "./src/page-one/index.md",
      outputPath: "./dist/page-one/index.html",
      url: "/page-one/",
      content:
        "<!doctype html>\n" +
        '<html lang="en">\n' +
        "  <head>\n" +
        '    <meta charset="utf-8">\n' +
        "    <title>Home</title>\n" +
        '    <link rel="stylesheet" href="/_assets/scss/main.scss">\n' +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Hello World</h1>\n" +
        "<p>The quick brown fox jumped over the lazy dog.</p>\n" +
        "\n" +
        "    </main>\n" +
        '    <script src="/_assets/js/main.js"></script>\n' +
        "  </body>\n" +
        "</html>",
      rawInput:
        "\n# Hello World\n\nThe quick brown fox jumped over the lazy dog.",
    },
  ]
  const rootDir = "/Users/johnmills/Sites/eleventy-asset-bundler/sample"
  const elInputDir = "src"
  const regExRules = /(?<=src=").*.(js)(?=")/g
  const expected = [
    {
      sourcePath:
        "/Users/johnmills/Sites/eleventy-asset-bundler/sample/src/_assets/js/main.js",
      fileName: "main.js",
      fileType: ".js",
      fileSlug: "main",
      fileRefs: [
        { source: "./src/home/home.md", refString: "/_assets/js/main.js" },
        {
          source: "./src/page-one/index.md",
          refString: "/_assets/js/main.js",
        },
      ],
      hash: null,
      content: null,
    },
  ]

  expect(getAssetList(results, rootDir, elInputDir, regExRules)).toStrictEqual(expected)
})

// Test an https string to not return a JS file

// Test a SASS string to return multiple JS files

// Test a CSS string to return a css result

// Test a string with no matches to return an empty array

// Test a string with multiple matches to return an array of multiple objects

// Test an https css string to return no result

// Test Filter
test("Filter Found Results", () => {
  expect(filterAsset("/_assets/js/main.js")).toBe(true)
  expect(filterAsset("/_assets/js/mainjs")).toBe(false)
  expect(
    filterAsset(
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    )
  ).toBe(false)
  expect(
    filterAsset(
      "http://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    )
  ).toBe(false)
  expect(filterAsset("path/to-the-file.svg#the-element")).toBe(false)
})
