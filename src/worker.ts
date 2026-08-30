/// <reference types="@cloudflare/workers-types" />

const POSTHOG_HOST = "eu.i.posthog.com";
const POSTHOG_ASSETS_HOST = "eu-assets.i.posthog.com";

export default {
  async fetch(request: Request, env: Record<string, string> & { ASSETS: Fetcher }): Promise<Response> {
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

    // Zero trust — /api/subscribe : validation stricte, pas de stub aveugle
    if (url.pathname === "/api/subscribe") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
      }

      // Validation serveur zero trust
      let data: { email?: string; website?: string; notes?: string; userGroup?: string };
      try {
        data = (await request.clone().json()) as typeof data;
      } catch {
        return Response.json({ error: "Payload invalide." }, { status: 400 });
      }

      // Honeypot
      if (data.website) {
        return Response.json({ error: "Bot detected." }, { status: 400 });
      }

      const email = String(data.email ?? "")
        .trim()
        .toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        return Response.json({ error: "Email invalide." }, { status: 400 });
      }

      if (data.userGroup !== "Landing") {
        return Response.json({ error: "Groupe invalide." }, { status: 400 });
      }

      // Proxy vers backend réel si configuré, sinon 503 explicite (pas de faux 200)
      const backend = (env.PUBLIC_API_URL ?? env.VITE_PUBLIC_API_URL ?? "").trim().replace(/\/+$/, "");
      if (backend) {
        const target = `${backend}/api/subscribe`;
        const res = await fetch(target, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, notes: data.notes, userGroup: "Landing" }),
        });
        const body = await res.text();
        return new Response(body, {
          status: res.status,
          headers: {
            "Content-Type": res.headers.get("content-type") ?? "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      return Response.json(
        { error: "Service temporairement indisponible. Backend non configuré." },
        { status: 503, headers: { "Access-Control-Allow-Origin": "*" } },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
