import { useActionData, useLoaderData } from "@remix-run/react"
import type { DataFunctionArgs } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import type { JsonValue, MaybePromise } from "./types"

export type ResponseTyped<Data> = Omit<Response, "json"> & {
  json(): Promise<Data>
}

// prettier-ignore
export type LoaderFunctionTyped<Data> = (args: DataFunctionArgs) =>
  MaybePromise<Data | ResponseTyped<Data>>

export type InferLoaderData<LoaderFunction> =
  LoaderFunction extends LoaderFunctionTyped<infer Data> ? Data : never

export function responseTyped(
  body?: BodyInit | null,
  init?: ResponseInit | number,
) {
  return new Response(
    body,
    typeof init === "number" ? { status: init } : init,
  ) as ResponseTyped<unknown>
}

export function jsonTyped<Data extends JsonValue>(
  data: Data,
  init?: ResponseInit | number,
) {
  return json(JSON.stringify(data), init) as ResponseTyped<Data>
}

export function redirectTyped(url: string, init?: ResponseInit | number) {
  return redirect(url, init) as ResponseTyped<never>
}

export function useLoaderDataTyped<
  LoaderFunction extends LoaderFunctionTyped<JsonValue>,
>() {
  return useLoaderData<InferLoaderData<LoaderFunction>>()
}

export function useActionDataTyped<
  LoaderFunction extends LoaderFunctionTyped<JsonValue>,
>() {
  return useActionData<InferLoaderData<LoaderFunction>>()
}
