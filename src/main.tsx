import { useActionData, useFetcher, useLoaderData } from "@remix-run/react"
import type { DataFunctionArgs } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"

export type ResponseTyped<Data> = Omit<Response, "json"> & {
  json(): Promise<Data>
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue | undefined }
  | JsonValue[]

export function jsonTyped<Input extends JsonValue>(
  data: Input,
  init?: ResponseInit | number,
) {
  return json(data, init) as ResponseTyped<Input>
}

export function redirectTyped(url: string, init?: ResponseInit | number) {
  return redirect(url, init) as ResponseTyped<never>
}

export type DataFunctionTyped<Result extends JsonValue> = (
  args: DataFunctionArgs,
) => MaybePromise<ResponseTyped<Result>>

export type DefaultDataFunction = DataFunctionTyped<JsonValue>

export function useLoaderDataTyped<DataFunction extends DefaultDataFunction>() {
  return useLoaderData<InferDataFunctionResult<DataFunction>>()
}

export function useActionDataTyped<DataFunction extends DefaultDataFunction>() {
  return useActionData<InferDataFunctionResult<DataFunction>>()
}

export function useFetcherTyped<DataFunction extends DefaultDataFunction>() {
  return useFetcher<InferDataFunctionResult<DataFunction>>()
}

export type InferDataFunctionResult<DataFunction> =
  DataFunction extends DataFunctionTyped<infer Data> ? Data : unknown

export type MaybePromise<Value> = Value | PromiseLike<Value>
