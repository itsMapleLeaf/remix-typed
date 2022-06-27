import type { Fetcher } from "@remix-run/react"
import type { ResponseTyped } from "./main"
import {
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
  const loader = () => {
    if (Math.random() > 0.5) return jsonTyped({ result: "success" })
    return redirectTyped("/failure")
  }

  const loaderData: { result: string } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoaderDataTyped<typeof loader>()
  const actionData: { result: string } | undefined =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useActionDataTyped<typeof loader>()
  const fetcher: Fetcher<{ result: string }> =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetcherTyped<typeof loader>()
}
