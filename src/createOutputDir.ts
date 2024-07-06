import fs from "fs/promises"

async function createOutputDir (path: string): Promise<void> {
  const exists = await checkExists(path)

  if (!exists) {
    try {
      await fs.mkdir(path)
    } catch (err) {
      console.error(err)
    }
  }
}

export default createOutputDir

async function checkExists (path: string): Promise<boolean> {
  try {
    await fs.access(path)
    return true
  } catch (err) {
    if (err.code === "ENOENT") {
      return false
    } else {
      throw err
    }
  }
}