import type { FormProps } from "@remix-run/react"
import { Form, useLocation } from "@remix-run/react"
import * as React from "react"
import type { InferResourceInput, ResourceMap } from "./resource"
import type { Merge, OnlyString } from "./types"

export type RemixFormProps = React.ComponentPropsWithoutRef<"form"> & FormProps

export type TypedFormProps<
  Resources extends ResourceMap,
  ResourceName extends keyof Resources,
> = Merge<
  RemixFormProps,
  {
    resource: OnlyString<ResourceName>
    data: InferResourceInput<Resources[ResourceName]>
    children: React.ReactNode
    as?: React.ComponentType<React.ComponentPropsWithoutRef<"form"> & FormProps>
  }
>

export function createTypedForm<Resources extends ResourceMap>(
  routePath: string,
) {
  return function TypedForm<ResourceName extends keyof Resources>({
    as: FormComponent = Form,
    resource,
    data,
    children,
    ...formProps
  }: TypedFormProps<Resources, ResourceName>) {
    const location = useLocation()
    return (
      <FormComponent action={routePath} method="post" replace {...formProps}>
        <input type="hidden" name="resourceName" value={resource} />
        <input type="hidden" name="data" value={JSON.stringify(data)} />
        <input
          type="hidden"
          name="redirectTo"
          value={location.pathname + location.search}
        />
        {children}
      </FormComponent>
    )
  }
}
