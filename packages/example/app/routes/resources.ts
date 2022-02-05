import { createResourceHandlers } from "remix-typed"
import { colorResources } from "~/color-resources"

export const resources = {
  ...colorResources,
}

export const { action } = createResourceHandlers(resources)
