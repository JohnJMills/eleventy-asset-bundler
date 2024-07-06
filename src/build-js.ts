import { AssetBundlerOpts, AssetObject } from "./typedefs.js"
import esbuild from "esbuild"

type JSOptions = {
  outputDir: string
  minify: boolean
  sourceMap: boolean
  plugins?: any[]
}

// exclude list keeps esbuild from trying to
// compile these file types
// NEW:"*.otf","*.woff","*.woff2",
const EXCLUDE_LIST = [
  "*.avif",
  "*.gif",
  "*.jpg",
  "*.jpeg",
  "*.png",
  "*.webp",
  "*.mp4",
  "*.ttf",
  "*.otf",
  "*.woff",
  "*.woff2",
  "*.scss",
  "*.sass",
  "*.css",
]

async function buildJS(
  asset: AssetObject,
  options: JSOptions,
  outputDir: string,
  hashOutput: boolean
) {

  const jsResult = await esbuild.build({
    entryPoints: [asset.sourcePath],
    bundle: true,
    loader: { ".js": "jsx" },
    entryNames: (hashOutput) ? "[name].[hash]" : "[name]",
    assetNames: (hashOutput) ? "[name].[hash].[ext]" : "[name].[ext]",
    plugins: options.plugins,
    outdir: outputDir,
    write: false,
    minify: options.minify,
    // TODO: add source map support
    sourcemap: false,
    external: EXCLUDE_LIST,
    target: "es2015",
  })

  const jsOut = jsResult.outputFiles[0]
  asset.fileName = jsOut.path.split("/").pop()
  asset.hash = jsOut.hash
  asset.content = jsOut.text

  return asset
}

export default buildJS