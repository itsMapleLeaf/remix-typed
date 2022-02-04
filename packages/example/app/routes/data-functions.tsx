import type { DataFunctionArgs } from "@remix-run/server-runtime"
import { Form } from "remix"
import { useActionDataTyped, useLoaderDataTyped } from "remix-typed"
import { loadData, setDataValue } from "~/data.server"

export async function loader(args: DataFunctionArgs) {
  return await loadData()
}

export async function action({ request }: DataFunctionArgs) {
  const body = Object.fromEntries(await request.formData())
  await setDataValue(body.newValue as string)
  return { success: true }
}

export default function DataFunctions() {
  const loaderData = useLoaderDataTyped<typeof loader>()
  const actionData = useActionDataTyped<typeof action>()
  return (
    <>
      <pre>{JSON.stringify(loaderData, undefined, 2)}</pre>
      {actionData && <pre>{JSON.stringify(actionData, undefined, 2)}</pre>}
      <Form method="post">
        <label>
          new value:{" "}
          <input
            type="text"
            name="newValue"
            placeholder="write something clever!"
          />
        </label>
        <br />
        <button type="submit">submit</button>
      </Form>
    </>
  )
}
