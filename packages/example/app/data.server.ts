import { readFile, writeFile } from "node:fs/promises"

const dataFile = "data.json"

const defaultData = {
  value: "no value set",
}

export type Data = typeof defaultData

export async function loadData(): Promise<Data> {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"))
  } catch (error) {
    console.warn(`Could not read data file: ${dataFile}`, error)
    return defaultData
  }
}

export async function setDataValue(value: string) {
  const data = await loadData()
  data.value = value
  await writeFile(dataFile, JSON.stringify(data), "utf8")
}
