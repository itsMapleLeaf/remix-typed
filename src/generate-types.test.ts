import { expect, test } from "vitest"
import { generateTypes } from "./generate-types"

test("generating types", () => {
  const result = generateTypes("/home/project/app/routes", [
    { path: "/home/project/app/routes/index.ts" },
    { path: "/home/project/app/routes/users.ts" },
    { path: "/home/project/app/routes/users/index.ts" },
  ])

  expect(result).toMatchInlineSnapshot(`
    "type Routes = {
        \\"/\\": {};
        \\"/users\\": {};
    };"
  `)
})
