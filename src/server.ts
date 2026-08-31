import handler from "@tanstack/react-start/server-entry";

type Env = Record<string, unknown>;

const POSTHOG_HOST = "eu.i.posthog.com";
const POSTHOG_ASSETS_HOST = "eu-assets.i.posthog.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, init?: ResponseInit): Response {
  return Response.json(body, init);
}

async function handlePostHogProxy(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace("/nuxi-data/x/", "");
  const host = path.startsWith("static/") ? POSTHOG_ASSETS_HOST : POSTHOG_HOST;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("origin", `https://${host}`);
  headers.set("referer", `https://${host}/`);

  const response = await fetch(`https://${host}/${path}${url.search}`, {
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

async function handleSubscribe(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  let data: { email?: string; website?: string; notes?: string; userGroup?: string };
  try {
    data = (await request.clone().json()) as typeof data;
  } catch {
    return json({ error: "Payload invalide." }, { status: 400 });
  }

  if (data.website) {
    return json({ error: "Bot detected." }, { status: 400 });
  }

  const email = String(data.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json({ error: "Email invalide." }, { status: 400 });
  }

  if (data.userGroup !== "Landing") {
    return json({ error: "Groupe invalide." }, { status: 400 });
  }

  const backend = (import.meta.env.PUBLIC_API_URL ?? import.meta.env.VITE_PUBLIC_API_URL ?? "")
    .trim()
    .replace(/\/+$/, "");

  if (!backend) {
    return json(
      { error: "Service temporairement indisponible. Backend non configuré." },
      { status: 503, headers: CORS_HEADERS },
    );
  }

  const res = await fetch(`${backend}/api/subscribe`, {
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/nuxi-data/x/")) {
      return handlePostHogProxy(request);
    }

    if (url.pathname === "/api/subscribe") {
      return handleSubscribe(request);
    }

    return handler.fetch(request, env);
  },
};
