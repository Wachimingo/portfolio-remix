import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import appStyle from './styles/app.css';
import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
// import { Partytown } from '@builder.io/partytown/react';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Portfolio",
  viewport: "width=device-width,initial-scale=1",
});


export function links() {
  return [
    { rel: "stylesheet", href: appStyle },
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" },
    { rel: "stylesheet", href: toastStyle }
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        {/* <Partytown debug={true} forward={['dataLayer.push']} /> */}
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ToastContainer />
        <script
          // type="text/partytown"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
          async={true}
        ></script>
      </body>
    </html>
  );
}
