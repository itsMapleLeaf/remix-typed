import { uniqBy } from "lodash-es"
import { join, parse, relative } from "node:path"
import ts from "typescript"

type File = {
  path: string
}

const dummySourceFile = ts.createSourceFile(
  "remix-typed.ts",
  "",
  ts.ScriptTarget.ESNext,
)

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
})

export function generateTypes(routesFolder: string, files: File[]) {
  const routesTypeAlias = generateRoutesType(routesFolder, files)

  return printer.printNode(
    ts.EmitHint.Unspecified,
    routesTypeAlias,
    dummySourceFile,
  )
}

/**
given a list of route files,
generate a routes type that looks like this:

```tsx
type Routes = {
  "/": {},
  "/users": {},
}
```
*/
function generateRoutesType(routesFolder: string, files: File[]) {
  let routeProperties = files.map((file) => {
    const { dir, name } = parse(relative(routesFolder, file.path))
    const routeName = join("/", dir, name === "index" ? "" : name)
    return { file, routeName }
  })
  routeProperties = uniqBy(routeProperties, "routeName")

  const propertySignatureNodes = routeProperties.map(({ routeName }) => {
    return ts.factory.createPropertySignature(
      [],
      ts.factory.createStringLiteral(routeName),
      undefined,
      ts.factory.createTypeReferenceNode("{}", undefined),
    )
  })

  const routesTypeAlias = ts.factory.createTypeAliasDeclaration(
    [],
    [],
    "Routes",
    [],
    ts.factory.createTypeLiteralNode(propertySignatureNodes),
  )
  return routesTypeAlias
}
