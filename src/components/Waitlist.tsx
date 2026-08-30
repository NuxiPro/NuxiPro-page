import { type FormEvent, useState } from "react";
import { useTranslation } from "../i18n";

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

interface WaitlistProps {
  variant?: "card" | "inline";
}

interface DebugInfo {
  endpoint: string;
  payload: { email: string; userGroup: string } | null;
  status: number | null;
  ok: boolean | null;
  body: string;
}

const LS_KEY = "newsletter-ts";
const RATE_MS = 60_000;

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function Waitlist({ variant = "card" }: WaitlistProps) {
  const { t } = useTranslation();
  const [success, setSuccess] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    endpoint: "",
    payload: null,
    status: null,
    ok: null,
    body: "",
  });

  const getEndpoint = (): string => {
    const baseUrl = ((import.meta.env as Record<string, string | undefined>).PUBLIC_API_URL ?? "")
      .trim()
      .replace(/\/+$/, "");
    return `${baseUrl}/api/subscribe`;
  };

  const handleReset = (): void => {
    setSuccess(false);
    setSubmittedEmail("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");

    const form: HTMLFormElement = e.currentTarget;
    const fd = new FormData(form);
    const email: string = String(fd.get("email") ?? "")
      .trim()
      .toLowerCase();
    const website: string = String(fd.get("website") ?? "").trim();

    if (website) return; // honeypot
    if (!email || !isValidEmail(email)) {
      setErrorMsg(t("waitlist.errors.invalidEmail"));
      return;
    }

    try {
      const last = Number(localStorage.getItem(LS_KEY) ?? "0");
      if (Date.now() - last < RATE_MS) {
        setErrorMsg(t("waitlist.errors.rateLimit"));
        return;
      }
    } catch {
      // localStorage indisponible
    }

    const endpoint = getEndpoint();
    const payload: { email: string; userGroup: "Landing" } = {
      email,
      userGroup: "Landing",
    };

    setLoading(true);
    setDebugInfo({ endpoint, payload, status: null, ok: null, body: "" });

    try {
      localStorage.setItem(LS_KEY, String(Date.now()));
    } catch {
      // ignore
    }

    try {
      const res: Response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let bodyText = "";
      let backendMessage: string | undefined;
      try {
        const raw = await res.clone().text();
        bodyText = raw;
        const payloadJson = JSON.parse(raw) as ApiErrorResponse;
        backendMessage = payloadJson.error ?? payloadJson.message;
      } catch {
        // non-JSON ou vide
      }

      setDebugInfo({
        endpoint,
        payload,
        status: res.status,
        ok: res.ok,
        body: bodyText || (res.ok ? "OK" : ""),
      });

      if (!res.ok) {
        throw new Error(backendMessage ?? t("waitlist.errors.unknown"));
      }

      setSubmittedEmail(email);
      setSuccess(true);
      form.reset();
    } catch (err: unknown) {
      const message: string = err instanceof Error ? err.message : t("waitlist.errors.network");
      setErrorMsg(message);
      setDebugInfo((prev) => (prev.status === null ? { ...prev, body: message, ok: false } : prev));
    } finally {
      setLoading(false);
    }
  };

  const simulateSuccess = (): void => {
    const fakeEmail = "demo@nuxipro.com";
    setSubmittedEmail(fakeEmail);
    setSuccess(true);
    setErrorMsg("");
    setDebugInfo({
      endpoint: getEndpoint(),
      payload: { email: fakeEmail, userGroup: "Landing" },
      status: 200,
      ok: true,
      body: JSON.stringify({ ok: true, simulated: true }),
    });
  };

  const simulateError = (): void => {
    setSuccess(false);
    setErrorMsg(t("waitlist.errors.simulated"));
    setDebugInfo({
      endpoint: getEndpoint(),
      payload: { email: "error@nuxipro.com", userGroup: "Landing" },
      status: 500,
      ok: false,
      body: JSON.stringify({ error: "Simulated server error" }),
    });
  };

  const renderSuccessCard = (email: string) => (
    <div
      className="mx-auto max-w-[480px] animate-[fadeIn_0.35s_ease] rounded-2xl border border-[#e6dfd8] bg-white px-6 py-8 text-center shadow-[0_4px_16px_rgba(20,20,19,0.04)]"
      role="status"
      aria-live="polite"
    >
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white text-xl shadow-[0_2px_8px_rgba(16,185,129,0.3)] ring-4 ring-emerald-500/10">
        ✓
      </span>
      <h3 className="font-heading mt-4 text-[1.05rem] font-medium text-[#141413]">
        {t("waitlist.success.title")}
      </h3>
      <p className="mx-auto mt-1.5 max-w-[36ch] text-sm leading-relaxed text-[#6c6a64]">
        {t("waitlist.success.detail")}{" "}
        <span className="font-medium text-[#141413] break-all">{email}</span>
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="mt-5 text-xs font-medium text-[#9a9590] hover:text-[#57534e] underline underline-offset-4 transition-colors"
      >
        {t("waitlist.success.retry")}
      </button>
    </div>
  );

  const renderDebug = () => {
    if (!import.meta.env.DEV) return null;
    return (
      <details className="mx-auto mt-6 max-w-[480px] rounded-xl border border-dashed border-black/10 bg-white/60 p-3 text-left">
        <summary className="cursor-pointer text-xs font-medium text-[#57534e]">
          {t("waitlist.debug.title")}
        </summary>
        <div className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed break-all">
          <div>
            <span className="font-semibold text-[#141413]">{t("waitlist.debug.endpoint")}</span>{" "}
            <span className="text-[#57534e]">{debugInfo.endpoint || "—"}</span>
          </div>
          <div>
            <span className="font-semibold text-[#141413]">{t("waitlist.debug.payload")}</span>{" "}
            <span className="text-[#57534e]">
              {debugInfo.payload ? JSON.stringify(debugInfo.payload) : "—"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-[#141413]">{t("waitlist.debug.status")}</span>{" "}
            <span
              className={
                debugInfo.ok
                  ? "text-emerald-600"
                  : debugInfo.status
                    ? "text-red-600"
                    : "text-[#57534e]"
              }
            >
              {debugInfo.status ?? "—"}{" "}
              {debugInfo.ok === true ? "(OK)" : debugInfo.ok === false ? "(ERR)" : ""}
            </span>
          </div>
          <div>
            <span className="font-semibold text-[#141413]">{t("waitlist.debug.response")}</span>{" "}
            <span className="whitespace-pre-wrap text-[#57534e]">{debugInfo.body || "—"}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={simulateSuccess}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100 transition"
            >
              {t("waitlist.debug.simulateSuccess")}
            </button>
            <button
              type="button"
              onClick={simulateError}
              className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700 hover:bg-red-100 transition"
            >
              {t("waitlist.debug.simulateError")}
            </button>
          </div>
        </div>
      </details>
    );
  };

  // Variante inline = intégrée dans la carte beige du CTA (premium)
  if (variant === "inline") {
    return (
      <div className="w-full">
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {success ? (
          renderSuccessCard(submittedEmail)
        ) : (
          <div className="mx-auto max-w-[480px]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 text-left"
              noValidate
            >
              <label htmlFor="waitlist-email-inline" className="sr-only">
                Email
              </label>
              <input
                id="waitlist-email-inline"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                placeholder={t("waitlist.placeholder")}
                className="flex-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#141413] placeholder:text-[#b0aaa3] outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all duration-150"
                disabled={loading}
                aria-label={t("waitlist.placeholder")}
              />
              {/* Honeypot anti-bot */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-xl bg-teal px-7 py-3 text-sm font-medium text-white hover:opacity-95 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
              >
                {loading ? t("waitlist.buttonLoading") : t("waitlist.button")}
              </button>
            </form>
            <p className="mt-2.5 text-center text-[11px] leading-none text-[#a8a29c]">
              {t("waitlist.microCopy")}
            </p>
            {errorMsg && (
              <p className="mt-3 text-sm text-red-600 text-center" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        )}

        {!success && (
          <>
            <div className="mx-auto flex max-w-[480px] items-center gap-4 py-7" aria-hidden>
              <div className="h-px flex-1 bg-[#e6dfd8]/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#9a9590]/60">
                {t("waitlist.or")}
              </span>
              <div className="h-px flex-1 bg-[#e6dfd8]/40" />
            </div>

            <a
              href="https://demo.nuxipro.com"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#e6dfd8] bg-white/70 px-6 py-3 text-sm font-medium text-[#57534e] hover:bg-white hover:border-[#d6cec3] hover:text-[#141413] transition-all duration-150"
            >
              {t("waitlist.demo")}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </>
        )}

        {renderDebug()}
      </div>
    );
  }

  // Variante card = autonome (ex: page dédiée) — même premium, même succès
  return (
    <section className="newsletter" aria-labelledby="waitlist-title">
      <style>{`${css} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {success ? (
        <div className="animate-[fadeIn_0.35s_ease] rounded-2xl border border-[#e6dfd8] bg-white px-6 py-8 text-center shadow-[0_4px_16px_rgba(20,20,19,0.04)]">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white text-xl shadow-[0_2px_8px_rgba(16,185,129,0.3)] ring-4 ring-emerald-500/10">
            ✓
          </span>
          <h3 className="font-heading mt-4 text-[1.05rem] font-medium text-[#141413]">
            {t("waitlist.success.title")}
          </h3>
          <p className="mx-auto mt-1.5 max-w-[36ch] text-sm leading-relaxed text-[#6c6a64]">
            {t("waitlist.success.detail")}{" "}
            <span className="font-medium text-[#141413] break-all">{submittedEmail}</span>
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 text-xs font-medium text-[#9a9590] hover:text-[#57534e] underline underline-offset-4 transition-colors"
          >
            {t("waitlist.success.retry")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <h2 id="waitlist-title" className="newsletter-title">
            {t("waitlist.title")}
          </h2>

          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder={t("waitlist.placeholder")}
            className="newsletter-input"
            disabled={loading}
            aria-label={t("waitlist.placeholder")}
          />

          <div className="newsletter-hp" aria-hidden="true">
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <p className="text-center text-[11px] text-[#a8a29c]">{t("waitlist.microCopy")}</p>

          {errorMsg && (
            <p className="newsletter-error" role="alert">
              {errorMsg}
            </p>
          )}

          <button type="submit" className="newsletter-btn" disabled={loading}>
            {loading ? t("waitlist.buttonLoading") : t("waitlist.button")}
          </button>
        </form>
      )}

      {!success && (
        <>
          <div className="newsletter-divider" aria-hidden>
            <span>{t("waitlist.or")}</span>
          </div>
          <a href="https://demo.nuxipro.com" className="newsletter-demo-link">
            {t("waitlist.demo")} →
          </a>
        </>
      )}

      {import.meta.env.DEV && (
        <details className="mt-4 rounded-xl border border-dashed border-black/10 bg-white/60 p-3 text-left">
          <summary className="cursor-pointer text-xs font-medium text-[#57534e]">
            {t("waitlist.debug.title")}
          </summary>
          <div className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed break-all">
            <div>
              <span className="font-semibold">{t("waitlist.debug.endpoint")}</span>{" "}
              {debugInfo.endpoint || "—"}
            </div>
            <div>
              <span className="font-semibold">{t("waitlist.debug.payload")}</span>{" "}
              {debugInfo.payload ? JSON.stringify(debugInfo.payload) : "—"}
            </div>
            <div>
              <span className="font-semibold">{t("waitlist.debug.status")}</span>{" "}
              {debugInfo.status ?? "—"}{" "}
              {debugInfo.ok ? "(OK)" : debugInfo.ok === false ? "(ERR)" : ""}
            </div>
            <div>
              <span className="font-semibold">{t("waitlist.debug.response")}</span>{" "}
              <span className="whitespace-pre-wrap">{debugInfo.body || "—"}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={simulateSuccess}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100 transition"
              >
                {t("waitlist.debug.simulateSuccess")}
              </button>
              <button
                type="button"
                onClick={simulateError}
                className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700 hover:bg-red-100 transition"
              >
                {t("waitlist.debug.simulateError")}
              </button>
            </div>
          </div>
        </details>
      )}
    </section>
  );
}

const css = `
.newsletter{
  --sl-color-accent: var(--color-teal, #0f766e);
  --sl-color-accent-hover: #115e59;
  --sl-color-bg: var(--color-surface-card, #efe9de);
  --sl-color-border: var(--color-hairline, #e6dfd8);
  --sl-color-text: var(--color-ink, #141413);
  --sl-color-muted: var(--color-muted, #6c6a64);
  max-width: 420px; margin: 0 auto; padding: 1.5rem;
  background: var(--sl-color-bg); border: 1px solid var(--sl-color-border);
  border-radius: 24px; font-family: var(--font-body, Inter, sans-serif);
  border-color: color-mix(in srgb, #000 4%, var(--sl-color-border));
  box-shadow: 0 20px 60px rgba(20,20,19,0.06), 0 4px 16px rgba(20,20,19,0.04);
}
.newsletter-title{ font-family: var(--font-heading, serif); font-size: 1.1rem; color: var(--sl-color-text); margin: 0 0 1rem; font-weight: 500; }
.newsletter-form{ display:flex; flex-direction:column; gap:.75rem; }
.newsletter-input{
  width:100%; padding:.75rem .85rem; border-radius: 12px;
  border: 1px solid color-mix(in srgb, #000 10%, var(--sl-color-border));
  background:#fff; color: var(--sl-color-text); font-size:.9rem; outline:none; transition: all .15s;
}
.newsletter-input:focus{ border-color: #0f766e; box-shadow: 0 0 0 1px #0f766e; }
.newsletter-input::placeholder{ color: #b0aaa3; }
.newsletter-btn{
  margin-top:.25rem; padding:.75rem; border-radius:12px; border:none;
  background: var(--sl-color-accent); color:#fff; font-weight:500; font-size:.9rem;
  cursor:pointer; transition: all .15s;
}
.newsletter-btn:hover{ opacity:.95; }
.newsletter-btn:disabled{ opacity:.5; cursor:not-allowed; }
.newsletter-btn:active{ transform: scale(.98); }
.newsletter-hp{ position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden; }
.newsletter-error{ color:#dc2626; font-size:.8rem; text-align:center; margin:0; }
.newsletter-divider{ display:flex; align-items:center; gap: .75rem; margin: 1.1rem 0 .9rem; opacity:.4; }
.newsletter-divider::before, .newsletter-divider::after{ content:""; flex:1; height:1px; background: var(--sl-color-border); }
.newsletter-divider span{ font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #9a9590; background: color-mix(in srgb, #fff 60%, transparent); border: 1px solid var(--sl-color-border); border-radius: 9999px; padding: 2px 10px; }
.newsletter-demo-link{ display:inline-flex; align-items:center; gap:6px; margin: 0 auto; font-size:.85rem; font-weight:500; color: #57534e; text-decoration:none; transition: color .15s; border: 1px solid var(--sl-color-border); background: rgba(255,255,255,.7); padding: 8px 16px; border-radius: 12px; }
.newsletter-demo-link:hover{ background:#fff; border-color:#d6cec3; color: var(--sl-color-text); }
@media(max-width:480px){ .newsletter{ padding:1.25rem; } }
`;
