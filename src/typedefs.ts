type AssetBundlerOpts = {
  rootDir: string
  bundleJS: boolean
  jsOptions: {
    outputDir: string
    minify: boolean
    plugins?: any[]
  }
  bundleSASS: boolean
  sassOptions: {
    outputDir: string
    minify: boolean
    sourceMap: boolean
  }
  hashOutput: boolean
}

type AssetObject = {
  sourcePath: string
  fileName: string
  fileType: string
  fileSlug: string
  fileRefs: FileRefs[]
  hash: string
  content: string
  optimize: boolean
}

type EleventyResult = {
  inputPath: string
  outputPath: string
  url: string
  content: string
  rawInput: string
}

type EleventyAfterData_Dir = {
  input: string
  includes: string
  data: string
  output: string
  layouts: string
}

type EleventyAfterData = {
  directories: object
  inputDir: string
  dir: EleventyAfterData_Dir
  runMode: string
  outputMode: string
  incremental: boolean
  results: EleventyResult[]
  uses: object
}

type FileRefs = {
  source: string // path to a source file 
  refString: string // string to replace in the source file
}

export { AssetBundlerOpts, AssetObject, EleventyResult, EleventyAfterData, FileRefs }

