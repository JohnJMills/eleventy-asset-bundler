import _ from "./node_modules/lodash-es/lodash.js"
import { EleventyAfterData } from "./src/typedefs.js"

interface AssetBundlerOpts {
  dirname: string
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
  dirname: process.env.ELEVENTY_ROOT,
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
  console.log(process.env.root)

  // eleventyConfig.on("eleventy.after", async (data: EleventyAfterData) => {
  //   const { dir, results } = data
  // })
}

export default assetBundler
