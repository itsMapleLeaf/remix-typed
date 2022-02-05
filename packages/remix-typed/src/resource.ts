import type { DataFunctionArgs } from "@remix-run/server-runtime"
import type { ZodType } from "zod"
import type { ResponseTyped } from "./data"
import { redirectTyped } from "./data"
import type { MaybePromise } from "./types"

export type ResourceOutput<Data> = MaybePromise<Data | ResponseTyped<Data>>

export type ResourceFunctionArgs<Data> = DataFunctionArgs & { data: Data }

export type ResourceConfig<Input, Output> = {
  schema: ZodType<Input>
  action: (args: ResourceFunctionArgs<Input>) => ResourceOutput<Output>
}

export type ResourceMap = {
  [key: string]: ResourceConfig<any, any>
}

export type InferResourceInput<Resource> =
  // prettier-ignore
  Resource extends ResourceConfig<infer Input, any>
    ? Input
    : never

export type InferResourceOutput<Resource> =
  // prettier-ignore
  Resource extends ResourceConfig<any, infer Output>
    ? Output
    : never

export function defineResource<Input, Output>(
  config: ResourceConfig<Input, Output>,
) {
  return config
}

export function createResourceHandlers(resources: ResourceMap) {
  async function action(args: DataFunctionArgs) {
    const body = Object.fromEntries(await args.request.formData())
    const resourceName = body.resourceName as string

    const resource = resources[resourceName]
    if (!resource) {
      throw new Error(`Unknown resource ${resourceName}`)
    }

    if (!("action" in resource)) {
      throw new Error(`Resource ${resourceName} is not an action`)
    }

    const data = resource.schema.parse(JSON.parse(body.data as string))
    const result = await resource.action({ ...args, data })
    return result ?? redirectTyped(body.redirectTo as string)
  }

  return { action }
}
