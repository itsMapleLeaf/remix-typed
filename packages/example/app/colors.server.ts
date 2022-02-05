import { randomUUID } from "node:crypto"
import { readFile, stat, writeFile } from "node:fs/promises"

type Color = {
  id: string
  hex: string
}

type ColorDatabase = {
  colors: Color[]
}

const dataFile = "data/colors.json"

const defaultData: ColorDatabase = {
  colors: [],
}

export async function loadColors(): Promise<ColorDatabase> {
  const stats = await stat(dataFile).catch(() => undefined)
  if (!stats?.isFile()) {
    await writeFile(dataFile, JSON.stringify(defaultData, undefined, 2))
    return defaultData
  }

  return JSON.parse(await readFile(dataFile, "utf8"))
}

export async function loadColor(id: string): Promise<Color | undefined> {
  const colors = await loadColors()
  return colors.colors.find((color) => color.id === id)
}

export async function createColor(): Promise<Color> {
  const colors = await loadColors()
  const id = randomUUID()
  const color: Color = {
    id,
    hex: "#" + Math.floor(Math.random() * (0xff_ff_ff + 1)).toString(16),
  }
  colors.colors.push(color)
  await writeFile(dataFile, JSON.stringify(colors, undefined, 2))
  return color
}

export async function updateColor(
  id: string,
  update: Partial<Color>,
): Promise<void> {
  const colors = await loadColors()

  const newColors = colors.colors.map((color) => {
    if (color.id === id) {
      return { ...color, ...update }
    }
    return color
  })

  await writeFile(dataFile, JSON.stringify(newColors, undefined, 2))
}

export async function deleteColor(id: string): Promise<void> {
  const colors = await loadColors()
  const newColors = colors.colors.filter((color) => color.id !== id)
  await writeFile(dataFile, JSON.stringify(newColors, undefined, 2))
}
