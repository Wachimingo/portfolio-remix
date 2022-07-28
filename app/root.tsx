import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useMatches,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import appStyle from '~/styles/app.css';
import navBarStyle from '~/styles/navbar.css';
import footerStyle from '~/styles/footer.css';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Portfolio",
  viewport: "width=device-width,initial-scale=1",
});


export function links() {
  return [
    { rel: "stylesheet", href: appStyle, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: navBarStyle, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: footerStyle, media: process.env.MEDIA_CSS },
  ]
}

export default function App() {
  const matches = useMatches();

  const includesScripts = matches.some(
    (match) => match.handle?.hydrate
  )

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {includesScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === "development" ? <ScrollRestoration /> : undefined}
        {/* <Scripts /> */}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : undefined}
      </body>
    </html >
  );
}
