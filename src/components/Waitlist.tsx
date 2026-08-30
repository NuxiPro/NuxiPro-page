import { type FormEvent, useState } from "react";
import { useTranslation } from "../i18n";

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

const LS_KEY = "newsletter-ts";
const RATE_MS = 60_000;

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function Waitlist() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<{
    endpoint: string;
    payload: { email: string; userGroup: string } | null;
    status: number | null;
    ok: boolean | null;
    body: string;
  }>({ endpoint: "", payload: null, status: null, ok: null, body: "" });

  const getEndpoint = (): string => {
    const env = import.meta.env as Record<string, string | undefined>;
    const baseUrl = (env.PUBLIC_API_URL ?? env.VITE_PUBLIC_API_URL ?? env.VITE_API_URL ?? "")
      .trim()
      .replace(/\/+$/, "");
    return baseUrl ? `${baseUrl}/api/subscribe` : "/api/subscribe";
  };

  const handleReset = (): void => {
    setSuccess(false);
    setSubmittedEmail("");
    setErrorText("");
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (loading) return;

    const form: HTMLFormElement = e.currentTarget;
    const fd = new FormData(form);
    const website: string = String(fd.get("website") ?? "").trim();
    if (website) return;

    const prev = localStorage.getItem(LS_KEY);
    if (prev && Date.now() - Number(prev) < RATE_MS) {
      setErrorText(t("waitlist.errors.rateLimit"));
      return;
    }

    const email: string = String(fd.get("email") ?? "")
      .trim()
      .toLowerCase();
    if (!email || !isValidEmail(email)) {
      setErrorText(t("waitlist.errors.invalidEmail"));
      return;
    }

    const endpoint = getEndpoint();
    const payload: { email: string; userGroup: "Landing" } = { email, userGroup: "Landing" };
    setLoading(true);
    setErrorText("");
    setDebugInfo({ endpoint, payload, status: null, ok: null, body: "" });

    try {
      localStorage.setItem(LS_KEY, Date.now().toString());
    } catch {
      // ignore
    }

    // Optimistic-like : on masque le form et on prépare le succès, rollback si erreur
    setSuccess(true);
    setSubmittedEmail(email);

    const autoResetTimer: number = window.setTimeout(() => {
      handleReset();
      form.reset();
    }, 3000);

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
        const data = JSON.parse(raw) as ApiErrorResponse;
        backendMessage = data.error ?? data.message;
      } catch {
        // non-JSON
      }

      const isHtml =
        res.headers.get("content-type")?.includes("text/html") || bodyText.trim().startsWith("<");

      setDebugInfo({
        endpoint,
        payload,
        status: res.status,
        ok: res.ok && !isHtml,
        body: bodyText || (res.ok ? "OK" : ""),
      });

      if (!res.ok || isHtml) {
        const fallback =
          backendMessage ||
          (isHtml ? `Service temporairement indisponible (${res.status})` : "") ||
          (bodyText ? bodyText.slice(0, 160) : "") ||
          `Erreur ${res.status}` ||
          t("waitlist.errors.unknown");
        throw new Error(fallback);
      }

      form.reset();
    } catch (err: unknown) {
      window.clearTimeout(autoResetTimer);
      setSuccess(false);
      const msg: string = err instanceof Error ? err.message : t("waitlist.errors.network");
      setErrorText(msg);
      setDebugInfo((prev) => (prev.status === null ? { ...prev, body: msg, ok: false } : prev));
    } finally {
      setLoading(false);
    }
  };

  const renderSuccess = () => (
    <div
      className="mx-auto flex max-w-[420px] flex-col items-center gap-3 rounded-2xl border border-[#e6dfd8] bg-white px-6 py-8 text-center shadow-[0_4px_16px_rgba(20,20,19,0.04)] animate-[fadeIn_0.35s_ease]"
      role="status"
      aria-live="polite"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white text-xl shadow-[0_2px_8px_rgba(16,185,129,0.3)] ring-4 ring-emerald-500/10">
        ✓
      </span>
      <h3 className="font-heading text-[1.05rem] font-medium text-[#141413]">
        {t("waitlist.success.title")}
      </h3>
      <p className="max-w-[32ch] text-sm leading-relaxed text-[#6c6a64]">
        {t("waitlist.success.detail")}{" "}
        <span className="font-medium text-[#141413] break-all">{submittedEmail}</span>
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="mt-1 text-xs font-medium text-[#9a9590] underline underline-offset-4 hover:text-[#57534e] transition-colors"
      >
        {t("waitlist.success.retry")}
      </button>
    </div>
  );

  const showForm = !success && !errorText;

  return (
    <div className="newsletter newsletter--centered">
      <h3 className="newsletter-title">{t("waitlist.title")}</h3>
      <p className="newsletter-desc">{t("waitlist.desc")}</p>

      {success ? (
        renderSuccess()
      ) : (
        <form
          className="newsletter-form"
          id="newsletter-form"
          onSubmit={handleSubmit}
          noValidate
          style={{ display: showForm || errorText ? "" : "none" }}
        >
          {!errorText ? (
            <>
              <div className="newsletter-row">
                <input
                  type="email"
                  name="email"
                  placeholder={t("waitlist.placeholder")}
                  required
                  className="newsletter-input"
                  aria-label={t("waitlist.placeholder")}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="newsletter-btn"
                  id="newsletter-btn"
                  disabled={loading}
                >
                  {loading ? t("waitlist.buttonLoading") : t("waitlist.button")}
                </button>
              </div>
              <p className="newsletter-disclaimer">{t("waitlist.microCopy")}</p>
            </>
          ) : null}

          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
        </form>
      )}

      <div
        className="newsletter-error"
        id="newsletter-error"
        style={{ display: errorText ? "flex" : "none" }}
      >
        <p className="error-text" id="error-text">
          {errorText}
        </p>
        <button type="button" className="error-retry" id="error-retry" onClick={handleReset}>
          {t("waitlist.errorRetry")}
        </button>
      </div>

      {!success && !errorText && (
        <div className="newsletter-actions">
          <a href="https://demo.nuxipro.com" className="newsletter-demo-btn">
            {t("waitlist.demo")}{" "}
            <span aria-hidden className="arrow">
              →
            </span>
          </a>
        </div>
      )}
      {errorText && !success && (
        <div className="newsletter-actions">
          <a href="https://demo.nuxipro.com" className="newsletter-demo-btn">
            {t("waitlist.demo")}{" "}
            <span aria-hidden className="arrow">
              →
            </span>
          </a>
        </div>
      )}

      {import.meta.env.DEV && (
        <details className="newsletter-debug">
          <summary>{t("waitlist.debug.title")}</summary>
          <div className="debug-body">
            <div>
              <strong>{t("waitlist.debug.endpoint")}</strong> {debugInfo.endpoint || "—"}
            </div>
            <div>
              <strong>{t("waitlist.debug.payload")}</strong>{" "}
              {debugInfo.payload ? JSON.stringify(debugInfo.payload) : "—"}
            </div>
            <div>
              <strong>{t("waitlist.debug.status")}</strong> {debugInfo.status ?? "—"}{" "}
              {debugInfo.ok ? "(OK)" : debugInfo.ok === false ? "(ERR)" : ""}
            </div>
            <div>
              <strong>{t("waitlist.debug.response")}</strong>{" "}
              <span className="break-all whitespace-pre-wrap">{debugInfo.body || "—"}</span>
            </div>
            <div className="debug-actions">
              <button
                type="button"
                onClick={() => {
                  setSubmittedEmail("contact@nuxipro.com");
                  setSuccess(true);
                  setErrorText("");
                  setDebugInfo({
                    endpoint: getEndpoint(),
                    payload: { email: "demo@nuxipro.com", userGroup: "Landing" },
                    status: 200,
                    ok: true,
                    body: JSON.stringify({ ok: true, simulated: true }),
                  });
                }}
              >
                {t("waitlist.debug.simulateSuccess")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setErrorText(t("waitlist.errors.simulated"));
                  setDebugInfo({
                    endpoint: getEndpoint(),
                    payload: { email: "error@nuxipro.com", userGroup: "Landing" },
                    status: 500,
                    ok: false,
                    body: JSON.stringify({ error: "Simulated" }),
                  });
                }}
              >
                {t("waitlist.debug.simulateError")}
              </button>
            </div>
          </div>
        </details>
      )}

      <style>{css}</style>
    </div>
  );
}

const css = `
  .newsletter {
    position: relative;
    margin: 0 auto;
    max-width: 640px;
    padding: 2.5rem 2rem;
    border-radius: 24px;
    background: var(--sl-color-bg-nav, var(--color-surface-card, #efe9de));
    border: 1px solid var(--sl-color-gray-5, var(--color-hairline, #e6dfd8));
    text-align: center;
  }
  .newsletter-title {
    margin: 0;
    font-family: var(--font-heading, Fraunces, serif);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--sl-color-white, var(--color-ink, #141413));
    line-height: 1.2;
  }
  .newsletter-desc {
    margin: 0.5rem auto 1.5rem;
    max-width: 42ch;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--sl-color-gray-3, var(--color-muted, #6c6a64));
  }
  .newsletter-form { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
  .newsletter-row {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 440px;
    justify-content: center;
    margin: 0 auto;
  }
  .newsletter-input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: var(--sl-color-white, var(--color-ink, #141413));
    background: var(--sl-color-bg, #fff);
    border: 1px solid var(--sl-color-gray-5, var(--color-hairline, #e6dfd8));
    border-radius: 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .newsletter-input::placeholder { color: var(--sl-color-gray-4, #b0aaa3); }
  .newsletter-input:focus { border-color: var(--sl-color-accent, var(--color-teal, #0f766e)); box-shadow: 0 0 0 1px var(--sl-color-accent, var(--color-teal, #0f766e)); }
  .newsletter-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--sl-color-bg, #fff);
    background: var(--sl-color-accent, var(--color-teal, #0f766e));
    border: none;
    border-radius: 12px;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s, transform 0.15s;
  }
  .newsletter-btn:hover { opacity: 0.95; }
  .newsletter-btn:active { transform: scale(0.98); }
  .newsletter-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .newsletter-disclaimer {
    margin: 0.4rem 0 0;
    font-size: 0.75rem;
    color: var(--sl-color-gray-4, #a8a29c);
  }
  .newsletter-actions { display: flex; justify-content: center; margin-top: 1.1rem; }
  .newsletter-demo-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.7rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--sl-color-gray-2, #57534e);
    background: #fff;
    border: 1px solid var(--sl-color-gray-5, #e6dfd8);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.15s;
  }
  .newsletter-demo-btn:hover { background: #fff; border-color: #d6cec3; color: var(--sl-color-white, #141413); }
  .newsletter-demo-btn .arrow { transition: transform 0.15s; }
  .newsletter-demo-btn:hover .arrow { transform: translateX(4px); }
  .newsletter-success {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .success-check { font-size: 1.25rem; color: rgb(34, 197, 94); }
  .success-text { margin: 0; font-weight: 600; color: var(--sl-color-white, var(--color-ink, #141413)); }
  .newsletter-error {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .error-text { margin: 0; font-size: 0.85rem; color: rgb(239, 68, 68); }
  .error-retry {
    padding: 0;
    font-size: 0.85rem;
    color: var(--sl-color-accent, var(--color-teal, #0f766e));
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }
  .newsletter-debug { margin-top: 1.5rem; text-align: left; border: 1px dashed rgba(0,0,0,0.1); border-radius: 12px; padding: 0.75rem; background: rgba(255,255,255,0.6); }
  .newsletter-debug summary { cursor: pointer; font-size: 0.75rem; font-weight: 600; color: #57534e; }
  .debug-body { margin-top: 0.6rem; font-family: ui-monospace, monospace; font-size: 11px; line-height: 1.5; word-break: break-all; }
  .debug-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
  .debug-actions button { padding: 0.25rem 0.6rem; font-size: 11px; border-radius: 8px; border: 1px solid #e6dfd8; background: #fff; cursor: pointer; }
  @media (max-width: 640px) {
    .newsletter { padding: 1.75rem 1.25rem; }
    .newsletter-row { flex-direction: column; max-width: 100%; }
    .newsletter-btn { width: 100%; }
    .newsletter-title { font-size: 1.35rem; }
  }
  @keyframes fadeIn { from { opacity:0; transform: translateY(6px)} to { opacity:1; transform: translateY(0)} }
`;
