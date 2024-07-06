import { expect, test } from "vitest"
import getFileHash from "./get-file-hash.js"

test("Get File Hash", () => {
  const fileBuffer = "body{color:#fff;font-family:sans-serif;background-color:#000}"
  const expected = "c3d11d3138e2d1b57cefe3dedd29e46ba3885dfd"

  expect(getFileHash(fileBuffer)).toEqual(expected)
})