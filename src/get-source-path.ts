import path from "path"

function getSourcePath(
  inputPath: string,
  dirname: string,
  item: string
): string {
  // handle absolute paths
  if (item.startsWith("/")) {
    return path.join(dirname, item)
  }

  // handle paths relative to the result file
  inputPath = inputPath.replace(dirname, "")
  const workingDir = path.join(dirname, path.dirname(inputPath))
  return path.join(workingDir, item)
}

export default getSourcePath
