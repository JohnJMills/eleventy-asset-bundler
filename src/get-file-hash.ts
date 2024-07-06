import crypto from "crypto"

function getFileHash(fileBuffer): string {
  const hashSum = crypto.createHash("sha1")
  hashSum.update(fileBuffer)
  return hashSum.digest("hex")
}

export default getFileHash