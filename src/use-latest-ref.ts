import * as React from "react"

export function useLatestRef<T>(value: T): { readonly current: T } {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  })
  return ref
}
