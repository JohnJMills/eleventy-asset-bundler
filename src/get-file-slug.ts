import path from "path"

/**
 * Return the filename without extension
 */
function getFileSlug (item: string): string {
  const fileName = path.basename(item)
  const fileType = path.extname(item)
  return fileName.replace(fileType, "")
}

export default getFileSlug