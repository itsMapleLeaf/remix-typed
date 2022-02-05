import type { MetaFunction } from "remix"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix"
import { useLoaderDataTyped } from "remix-typed"
import { loadColors } from "./colors.server"
import { TypedForm } from "./typed-client"

export function loader() {
  return loadColors()
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" }
}

export default function App() {
  const data = useLoaderDataTyped<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <h1>color manager</h1>
          {data.colors.length > 0 ? (
            <ul>
              {data.colors.map((color) => (
                <li key={color.id}>
                  <a href={`/colors/${color.id}`}>{color.hex}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              You have no colors yet.{" "}
              <TypedForm
                resource="createColor"
                data={{}}
                style={{ display: "inline" }}
              >
                <button type="submit">Create one?</button>
              </TypedForm>
            </p>
          )}
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
