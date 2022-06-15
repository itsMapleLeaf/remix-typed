import type { DataFunctionArgs } from "@remix-run/node"
import { Form } from "@remix-run/react"
import * as React from "react"
import {
  jsonTyped,
  redirectTyped,
  useActionDataTyped,
  useLoaderDataTyped,
} from "../src/main"

let message = "hi"

export async function loader({ request }: DataFunctionArgs) {
  return jsonTyped({ message })
}

export async function action({ request }: DataFunctionArgs) {
  const body = new URLSearchParams(await request.text())

  const newMessage = body.get("message")
  if (typeof newMessage !== "string") {
    return jsonTyped({ error: "no message" }, 400)
  }

  message = newMessage

  return redirectTyped(request.headers.get("referer") || "/")
}

export default function Page() {
  const { message } = useLoaderDataTyped<typeof loader>()
  const { error } = useActionDataTyped<typeof action>() ?? {}

  return (
    <main>
      <p>{message}</p>
      <Form method="post">
        <input name="message" />
        <button type="submit">Submit</button>
      </Form>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </main>
  )
}
