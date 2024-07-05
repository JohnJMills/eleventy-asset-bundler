type AssetObject = {
  sourcePath: string
  fileName: string
  fileType: string
  fileSlug: string
  fileRefs: Array<FileRefs>
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
  results: Array<EleventyResult>
  uses: object
}

type FileRefs = {
  source: string // path to a source file 
  refString: string // string to replace in the source file
}

export { AssetObject, EleventyResult, EleventyAfterData, FileRefs }

