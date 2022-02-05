import { defineResource, redirectTyped } from "remix-typed"
import { z } from "zod"
import { createColor } from "./colors.server"

export const colorResources = {
  createColor: defineResource({
    schema: z.object({}),
    action: async () => {
      const color = await createColor()
      return redirectTyped(`/colors/${color.id}`)
    },
  }),
}
