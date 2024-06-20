type EleventyResult = {
  inputPath: string
  outputPath: string
  url: string
  content: string
}

type EleventyAfterData = {
  dir: string
  results: Array<EleventyResult>
  runMode: any 
  outputMode: any
}

export { EleventyResult, EleventyAfterData }
