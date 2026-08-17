/// <reference types="@cloudflare/workers-types" />

const POSTHOG_HOST = "eu.i.posthog.com";
const POSTHOG_ASSETS_HOST = "eu-assets.i.posthog.com";

export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/nuxi-data/x/")) {
      const path = url.pathname.replace("/nuxi-data/x/", "");
      const host = path.startsWith("static/") ? POSTHOG_ASSETS_HOST : POSTHOG_HOST;
      const target = `https://${host}/${path}${url.search}`;

      const headers = new Headers(request.headers);
      headers.delete("host");
      headers.set("origin", `https://${host}`);
      headers.set("referer", `https://${host}/`);

      const response = await fetch(target, {
        method: request.method,
        headers,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
      });

      const responseHeaders = new Headers(response.headers);
      responseHeaders.delete("content-security-policy");
      responseHeaders.delete("content-security-policy-report-only");
      responseHeaders.delete("x-frame-options");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
