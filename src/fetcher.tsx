import { useFetcher } from "@remix-run/react"
import type { SubmitOptions } from "@remix-run/react/components"
import type { Fetcher } from "@remix-run/react/transition"
import * as React from "react"
import type { TypedFormProps } from "./form"
import { createTypedForm } from "./form"
import type {
  InferResourceInput,
  InferResourceOutput,
  ResourceMap,
} from "./resource"
import type { OnlyString } from "./types"
import { useLatestRef } from "./use-latest-ref"

export function createTypedFetcher<Resources extends ResourceMap>(
  routePath: string,
) {
  const TypedForm = createTypedForm(routePath)

  return function useFetcherTyped<ResourceName extends keyof Resources>(
    resourceName: OnlyString<ResourceName>,
  ): FetcherWithComponentsTyped<Resources, ResourceName> {
    const fetcher = useFetcher<InferResourceOutput<Resources[ResourceName]>>()
    const fetcherRef = useLatestRef(fetcher)

    const Form = React.useCallback(
      (props: Omit<TypedFormProps<Resources, ResourceName>, "resource">) => (
        <TypedForm resource={resourceName} {...props} />
      ),
      [resourceName],
    )

    const submit = React.useCallback(
      (
        data: InferResourceInput<Resources[ResourceName]>,
        options?: Omit<SubmitOptions, "action" | "method">,
      ) => {
        fetcherRef.current.submit(
          {
            resourceName,
            data,
            redirectTo: window.location.pathname + window.location.search,
          },
          {
            replace: true,
            ...options,
            action: routePath,
            method: "post",
          },
        )
      },
      [fetcherRef, resourceName],
    )

    return { ...fetcher, Form, submit }
  }
}

export type FetcherWithComponentsTyped<
  Resources extends ResourceMap,
  ResourceName extends keyof Resources,
> = Fetcher<InferResourceOutput<Resources[ResourceName]>> & {
  Form: (props: TypedFormProps<Resources, ResourceName>) => React.ReactElement
  submit: (
    data: InferResourceInput<Resources[ResourceName]>,
    options?: Omit<SubmitOptions, "action" | "method"> | undefined,
  ) => void
}
