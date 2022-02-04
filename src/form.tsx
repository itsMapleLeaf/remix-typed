import type { FormProps } from "@remix-run/react"
import { Form } from "@remix-run/react"
import * as React from "react"
import type { InferTypedActionData, TypedActionMap } from "./action"
import type { OnlyString } from "./types"

export type TypedFormProps<
  ActionMap extends TypedActionMap,
  ActionName extends OnlyString<keyof ActionMap>,
> = Omit<React.ComponentPropsWithoutRef<"form"> & FormProps, "action"> & {
  as?: React.ComponentType<React.ComponentPropsWithoutRef<"form"> & FormProps>
  action: ActionName
  data: InferTypedActionData<ActionMap[ActionName]>
  children: React.ReactNode
}

export function createTypedForm<ActionMap extends TypedActionMap>(
  route: string,
) {
  return function TypedForm<ActionName extends OnlyString<keyof ActionMap>>({
    as: FormComponent = Form,
    action,
    data,
    children,
    ...formProps
  }: TypedFormProps<ActionMap, ActionName>) {
    return (
      <FormComponent action={route} method="post" {...formProps}>
        <input type="hidden" name="actionName" value={action} />
        <input type="hidden" name="data" value={JSON.stringify(data)} />
        {children}
      </FormComponent>
    )
  }
}
