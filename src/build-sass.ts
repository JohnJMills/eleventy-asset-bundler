import { AssetObject } from './typedefs.js'
import sass from 'sass'
import CleanCSS from 'clean-css'
import getFileHash from './get-file-hash.js'

type SASSOptions = {
  outputDir: string
  minify: boolean
  sourceMap: boolean
}

async function buildSass(
  asset: AssetObject, 
  options: SASSOptions, 
  hashOutput: boolean) {

    const config = {
      file: asset.sourcePath,
      sourceMap: options.sourceMap,
      sourceMapEmbed: options.sourceMap,
      outputStyle: options.minify ? "compressed" : "expanded",
    }

    const cssResult = await sass.compile(asset.sourcePath, config)
    asset.content = (options.minify) ? minifyCSS(cssResult.css.toString()) : cssResult.css.toString()
    asset.hash = (hashOutput) ? getFileHash(asset.content) : ""
    asset.fileName = `${asset.fileSlug}.${asset.hash}.css`

  return asset
}

export default buildSass

/**
 * Return minified CSS using CleanCSS
 */
function minifyCSS(css: string) {
  return new CleanCSS().minify(css).styles
}