import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
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
    { rel: "stylesheet", href: appStyle },
    { rel: "stylesheet", href: navBarStyle },
    { rel: "stylesheet", href: footerStyle },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html >
  );
}
