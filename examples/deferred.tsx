import type { DataFunctionArgs } from "@remix-run/node"
import * as React from "react"
import { DeferredTyped, deferredTyped, useLoaderDataTyped } from "../src/main"

function loadData() {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(42)
    }, 1000)
  })
}

export async function loader({ request }: DataFunctionArgs) {
  return deferredTyped({
    data: loadData(),
  })
}

export default function Example() {
  const { data } = useLoaderDataTyped<typeof loader>()
  return (
    <DeferredTyped data={data} fallback={<p>loading...</p>} error={<p>oops</p>}>
      {(data) => <p>the secret is {data}</p>}
    </DeferredTyped>
  )
}
