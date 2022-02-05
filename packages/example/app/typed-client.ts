import { createTypedFetcher, createTypedForm } from "remix-typed"
import type { resources } from "./routes/resources"

const resourceRoutePath = "/resources"
export const TypedForm = createTypedForm<typeof resources>(resourceRoutePath)
export const useFetcherTyped =
  createTypedFetcher<typeof resources>(resourceRoutePath)
