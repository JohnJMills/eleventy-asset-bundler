import _ from "lodash"; 
import path from "path";

interface AssetBundlerOpts {
  dirname: string,
  bundleJS: boolean,
  jsOptions: {
    outputDir: string,
    minify: boolean,
    sourceMap: boolean,
  },
  bundleSASS: boolean,
  sassOptions: {
    outputDir: string,
    minify: boolean,
    sourceMap: boolean
  }
}

const DEFAULT_OPTIONS: AssetBundlerOpts = {
  dirname: __dirname,
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
  }
}

async function assetBundler(eleventyConfig: any, options: AssetBundlerOpts) {

}

export default assetBundler