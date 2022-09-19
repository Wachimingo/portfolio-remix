import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set('Cache-Control', 'fresh shared Cache-Control: max-age=31536000, immutable');

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
