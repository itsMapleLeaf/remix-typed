import { redirect } from "@remix-run/server-runtime"
import type { RouteMap } from "./route-map"
import type { StringKeys } from "./types"

export function createTypedServer<Routes extends RouteMap>() {
  function redirectTyped(
    url: StringKeys<Routes>,
    init?: number | ResponseInit,
  ) {
    return redirect(url, init)
  }

  return {
    redirect: redirectTyped,
  }
}
