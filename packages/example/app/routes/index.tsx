import { redirectTyped } from "remix-typed"

export function loader() {
  return redirectTyped("/data-functions")
}
