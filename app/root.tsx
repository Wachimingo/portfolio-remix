import {
  Links,
  Meta,
  Outlet,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import type { FC } from "react";
import appStyle from '~/styles/min/app.css';
import navBarStyle from '~/styles/min/navbar.css';
import footerStyle from '~/styles/min/footer.css';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Portfolio",
  viewport: "width=device-width,initial-scale=1",
});


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: appStyle, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: navBarStyle, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: footerStyle, media: process.env.MEDIA_CSS },
  ]
}

export const App: FC = () => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
      </body>
    </html >
  );
}
export default App;