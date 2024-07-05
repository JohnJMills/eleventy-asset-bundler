import { AssetObject, EleventyResult, FileRefs } from "./typedefs.js"
import getSourcePath from "./get-source-path.js"
import getFileSlug from "./get-file-slug.js"
import path from "path"

function getAssetList(
  results: Array<EleventyResult>,
  rootDir: string,
  elInputDir: string,
  rules: RegExp
): Array<AssetObject> {
  return dedupeAssets(
    results.flatMap((result) => {
      const found = result.content.match(rules)
      const filtered = found
        ? found.filter((asset) => {
            if (filterAsset(asset)) return asset
          })
        : []

      if (!filtered.length) return []

      const scrubbed = filtered.map((asset) => asset.replace('" ', ""))

      return scrubbed.map((asset) => {
        const sourcePath = getSourcePath(
          result.inputPath,
          rootDir,
          elInputDir,
          asset
        )
        return getAssetObject(asset, sourcePath, result.inputPath)
      })
    })
  )
}

/**
 * Consolidate duplicate assets into a single object
 */
function dedupeAssets(assetList: Array<AssetObject>): Array<AssetObject> {
  return assetList.reduce((assets, item) => {
    const previousMatch = assets.find(
      (asset) => item.sourcePath === asset.sourcePath
    )

    if (previousMatch) {
      previousMatch.fileRefs = mergeFileRefs(
        previousMatch.fileRefs,
        item.fileRefs
      )
      return assets
    }

    return [...assets, item]
  }, [])
}

/**
 * Merge 2 fileRef arrays into a single de-duped array
 */
function mergeFileRefs(fileRefs: Array<FileRefs>, newStrings: Array<FileRefs>) {
  newStrings.forEach((item) => {
    if (fileRefs.indexOf(item) === -1) {
      fileRefs.push(item)
    }
  })

  return fileRefs
}

/**
 * Return a properly structured object for each asset
 */
function getAssetObject(
  refString: string,
  sourcePath: string,
  sourceFile: string
): AssetObject {
  return {
    sourcePath,
    fileName: path.basename(refString),
    fileType: path.extname(refString),
    fileSlug: getFileSlug(refString),
    fileRefs: [
      {
        source: sourceFile,
        refString,
      },
    ],
    hash: null,
    content: null,
  }
}

/**
 * Filter based on regex rules for both required and excluded strings
 * This filters out inline SVGs, external URLs etc
 */
function filterAsset(asset: string): Boolean {
  const negativeTests = [":", "#"]
  const negFilters = new RegExp(negativeTests.join("|"), "g")

  const positiveTests = ["\\."]
  const posFilters = new RegExp(positiveTests.join("|"), "g")

  return !negFilters.test(asset) && posFilters.test(asset) ? true : false
}

export { filterAsset, getAssetList }
