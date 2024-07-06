import _ from "./node_modules/lodash-es/lodash.js"
import { AssetBundlerOpts, AssetObject, EleventyAfterData } from "./src/typedefs.js"
import { getAssetList } from "./src/get-asset-list.js"
import { getRegexRules } from "./src/regex-rules.js"
import createOutputDir from "./src/createOutputDir.js"
import path from "path"
import buildJS from "./src/build-js.js"



const DEFAULT_OPTIONS: AssetBundlerOpts = {
  rootDir: process.env.ELEVENTY_ROOT,
  bundleJS: true,
  jsOptions: {
    outputDir: "js",
    minify: true,
    sourceMap: true,
  },
  bundleSASS: true,
  sassOptions: {
    outputDir: "css",
    minify: true,
    sourceMap: true,
  },
  hashOutput: true,
}

const assetBundler = async (eleventyConfig: any, options: AssetBundlerOpts) => {
  const {
    rootDir,
    bundleJS,
    jsOptions,
    bundleSASS,
    sassOptions,
    hashOutput,
  } = _.defaultsDeep(DEFAULT_OPTIONS, options)

  // console.log("root", process.env.ELEVENTY_ROOT)
  // console.log("source", process.env.ELEVENTY_SOURCE)
  // console.log(eleventyConfig.dir.input)

  eleventyConfig.on("eleventy.after", async (data: EleventyAfterData) => {
    const { dir, results } = data
    const outputDir = dir.output
    const jsOutputDir = path.resolve(rootDir, outputDir, jsOptions.outputDir)
    const sassOutputDir = path.resolve(rootDir, outputDir, sassOptions.outputDir)

    await Promise.all([
      createOutputDir(jsOutputDir),
      createOutputDir(sassOutputDir),
    ])

    const assetList = await Promise.all([
      getAssetList(
        results,
        rootDir,
        getRegexRules("js")
      ),
      getAssetList(
        results,
        rootDir,
        getRegexRules("css")
      ),
    ]).then((res) => res.flat())

    // console.log("assetList", assetList)

    const bundledList = await Promise.all(assetList.map(async (asset: AssetObject) => {
      // console.log("asset", asset)
      switch (asset.fileType) {
        case ".js":
          return await buildJS(asset, jsOptions, jsOutputDir, hashOutput)
          break; 

        case ".css":
          break;

        case ".scss":
          break;

        default:
          console.log("Found unknown asset file type: ", asset.fileType)
          break;
      }
    }))

    console.log("bundledList", bundledList)

  })
}

export default assetBundler

/*

1. Loop through all the results and find JS / SASS files 
   - can run async sass/js at the same time 
   - return a "list" array
   - need to have a "type" or some way of knowing which list is which... 
   - OR run compilation file by file !!! 


2. Run bundlers/compilers to generate asset output 
  - loop through results & generate output 
  - generate hash based on file content
  - add output to EleventyResults Array? 
  
3. Add to the results array
4. Update the results with the correct asset output paths
5. Write new results to the output directory

*/
