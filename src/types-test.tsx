import type { Fetcher } from "@remix-run/react"
import * as React from "react"
import type { DeferredValue, ResponseTyped } from "./main"
import {
  DeferredTyped,
  deferredTyped,
  jsonTyped,
  redirectTyped,
  useActionDataTyped,
  useFetcherTyped,
  useLoaderDataTyped,
} from "./main"

{
  const numberResult: ResponseTyped<number> = jsonTyped(123)
  const stringResult: ResponseTyped<string> = jsonTyped("the")
  const trueResult: ResponseTyped<true> = jsonTyped(true)
  const falseResult: ResponseTyped<false> = jsonTyped(false)
  // eslint-disable-next-line unicorn/no-null
  const nullResult: ResponseTyped<null> = jsonTyped(null)
  const arrayResult: ResponseTyped<string[]> = jsonTyped(["the", "cat"])
  const objectResult: ResponseTyped<{ the: string; is: string }> = jsonTyped({
    the: "cat",
    is: "cute",
  })

  const nestedResult: ResponseTyped<{
    value: number
    test: string[]
    moreTest: {
      value: string
      something: undefined
      enabled: false
    }
  }> = jsonTyped({
    value: 123,
    test: ["hi", "there"],
    moreTest: {
      value: "test",
      something: undefined,
      enabled: false,
    },
  })

  // @ts-expect-error: jsonTyped disallows undefined
  jsonTyped(undefined)
  // @ts-expect-error: jsonTyped disallows non-serializables
  jsonTyped(new Map())
  // @ts-expect-error: jsonTyped disallows non-serializables
  jsonTyped(new Date())
  // @ts-expect-error: jsonTyped disallows non-serializables
  jsonTyped(Promise.resolve())
}

{
  const result: ResponseTyped<never> = redirectTyped("/")
}

{
  const result: ResponseTyped<{
    value: number
    deferredValue: DeferredValue<number>
  }> = deferredTyped({
    value: 123,
    deferredValue: Promise.resolve(123),
  })
}

{
  const loader = () => {
    if (Math.random() > 0.5) return jsonTyped({ result: "success" })
    if (Math.random() > 0.5)
      return deferredTyped({ result: Promise.resolve(42) })
    return redirectTyped("/failure")
  }

  const loaderData: { result: string | DeferredValue<number> } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoaderDataTyped<typeof loader>()
  const actionData: { result: string | DeferredValue<number> } | undefined =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useActionDataTyped<typeof loader>()
  const fetcher: Fetcher<{ result: string | DeferredValue<number> }> =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetcherTyped<typeof loader>()

  const deferred = (
    <DeferredTyped fallback="" data={loaderData.result}>
      {(data: string | number): string | number => data}
    </DeferredTyped>
  )
}
