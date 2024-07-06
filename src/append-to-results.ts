// const appendJSResults = (results, jsList, outputPath, urlPath) => {
//   jsList.forEach((item) => {
//     results.push({
//       inputPath: item.sourcePath,
//       outputPath: path.join(outputPath, item.hash),
//       url: path.join(urlPath, item.hash),
//       content: item.content,
//     })
//   })

//   return results
// }
import { AssetObject, EleventyResult } from "./typedefs.js";
import path from "path";

type AppendOptions = {
  results: EleventyResult[]
  assetList: AssetObject[]
  jsOutputDir: string
  jsOutputUrl: string
  sassOutputDir: string
  sassOutputUrl: string
}

async function appendToResults(options): Promise<EleventyResult[]> {
  const { results, assetList } = options

  assetList.forEach((asset) => {
    const outputPath = getOutputPath(asset, options)
    const urlPath = getUrlPath(asset, options)

    results.push({
      inputPath: asset.sourcePath,
      outputPath: path.join(outputPath, asset.fileName),
      url: path.join(urlPath, asset.fileName),
      content: asset.content,
    })
  })

  return results
}

export default appendToResults

function getOutputPath(asset: AssetObject, options: AppendOptions): string {
  const { jsOutputDir, sassOutputDir } = options

  switch (asset.fileType) {
    case ".js":
      return jsOutputDir
    case ".css":
      return sassOutputDir
    case ".scss":
      return sassOutputDir
    default:
      return ""
  }
}

function getUrlPath(asset: AssetObject, options: AppendOptions): string {
  let { jsOutputUrl, sassOutputUrl } = options

  if (!jsOutputUrl.startsWith("/")) jsOutputUrl = `/${jsOutputUrl}`
  if (!sassOutputUrl.startsWith("/")) sassOutputUrl = `/${jsOutputUrl}`

  switch (asset.fileType) {
    case ".js":
      return jsOutputUrl
    case ".css":
      return sassOutputUrl
    case ".scss":
      return sassOutputUrl
    default:
      return ""
  }
}