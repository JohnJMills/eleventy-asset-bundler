import _ from "./node_modules/lodash-es/lodash.js"
import { EleventyAfterData } from "./src/typedefs.js"
import { getAssetList } from "./src/get-asset-list.js"
import { getRegexRules } from "./src/regex-rules.js"

interface AssetBundlerOpts {
  rootDir: string
  bundleJS: boolean
  jsOptions: {
    outputDir: string
    minify: boolean
    sourceMap: boolean
  }
  bundleSASS: boolean
  sassOptions: {
    outputDir: string
    minify: boolean
    sourceMap: boolean
  }
}

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
}

const assetBundler = async (eleventyConfig: any, options: AssetBundlerOpts) => {
  const opts = _.defaultsDeep(DEFAULT_OPTIONS, options)

  console.log("opts", opts)
  // console.log("root", process.env.ELEVENTY_ROOT)
  // console.log("source", process.env.ELEVENTY_SOURCE)
  // console.log(eleventyConfig.dir.input)

  eleventyConfig.on("eleventy.after", async (data: EleventyAfterData) => {
    const { dir, results } = data
    const outputDir = dir.output

    const jsList = getAssetList(results, opts.rootDir, eleventyConfig.dir.input, getRegexRules("js"))
    console.log(jsList[0].fileRefs)
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