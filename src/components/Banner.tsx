import { usePostHog } from "@posthog/react";
import { useEffect, useState } from "react";
import { useTranslation } from "../i18n";

const COOKIE_KEY = "nuxipro_cookie_consent";
const COOKIE_RECORDING_KEY = "nuxipro_cookie_recording";

export function CookieBanner() {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);
  const [previousChoice, setPreviousChoice] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    } else {
      setHasDecided(true);
      setPreviousChoice(consent as "accepted" | "declined");
      const recording = localStorage.getItem(COOKIE_RECORDING_KEY);
      setRecordingEnabled(recording === "true");
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    localStorage.setItem(COOKIE_RECORDING_KEY, "false");
    posthog?.opt_in_capturing();
    posthog?.stopSessionRecording();
    setRecordingEnabled(false);
    setPreviousChoice("accepted");
    setVisible(false);
    setHasDecided(true);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    localStorage.setItem(COOKIE_RECORDING_KEY, "false");
    posthog?.opt_out_capturing();
    posthog?.stopSessionRecording();
    setRecordingEnabled(false);
    setPreviousChoice("declined");
    setVisible(false);
    setHasDecided(true);
  };

  const toggleRecording = () => {
    if (recordingEnabled) {
      posthog?.stopSessionRecording();
      localStorage.setItem(COOKIE_RECORDING_KEY, "false");
      setRecordingEnabled(false);
    } else {
      posthog?.startSessionRecording();
      localStorage.setItem(COOKIE_RECORDING_KEY, "true");
      setRecordingEnabled(true);
    }
  };

  const reopenBanner = () => {
    setShowModal(false);
    setVisible(true);
  };

  return (
    <>
      {hasDecided && !visible && (
        <button
          type="button"
          className="cookie-settings-fab"
          onClick={reopenBanner}
          aria-label={t("banner.manageCookies")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      )}

      {visible && (
        <div className="cookie-panel">
          <div className="cookie-panel-header">
            <div className="cookie-panel-brand">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
              </svg>
              <span>{t("banner.title")}</span>
            </div>
            <button
              type="button"
              className="cookie-panel-close"
              onClick={handleDecline}
              aria-label={t("banner.close")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="cookie-panel-body">
            <p className="cookie-panel-text">{t("banner.text")}</p>

            <div className="cookie-option">
              <div className="cookie-option-info">
                <span className="cookie-option-name">{t("banner.analytics")}</span>
                <span className="cookie-option-desc">{t("banner.analyticsDesc")}</span>
              </div>
              <div className="cookie-option-badge">{t("banner.analyticsBadge")}</div>
            </div>

            <div className="cookie-option">
              <div className="cookie-option-info">
                <span className="cookie-option-name">{t("banner.recording")}</span>
                <span className="cookie-option-desc">{t("banner.recordingDesc")}</span>
              </div>
              <button
                type="button"
                className={`cookie-toggle ${recordingEnabled ? "active" : ""}`}
                onClick={toggleRecording}
                aria-label={recordingEnabled ? t("banner.recording") : t("banner.recording")}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>

            <button type="button" className="cookie-learn-more" onClick={() => setShowModal(true)}>
              {t("banner.learnMore")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="cookie-panel-footer">
            <button
              type="button"
              className={`cookie-btn cookie-btn-secondary ${previousChoice === "declined" ? "chosen" : ""}`}
              onClick={handleDecline}
            >
              {t("banner.decline")}
            </button>
            <button
              type="button"
              className={`cookie-btn cookie-btn-primary ${previousChoice === "accepted" ? "chosen" : ""}`}
              onClick={handleAccept}
            >
              {t("banner.accept")}
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="cookie-modal-overlay"
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowModal(false);
          }}
        >
          <div
            role="document"
            className="cookie-modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowModal(false);
            }}
          >
            <div className="cookie-modal-header">
              <h2>{t("banner.modalTitle")}</h2>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setShowModal(false)}
                aria-label={t("banner.close")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="cookie-modal-body">
              <section>
                <h3>{t("banner.whatIs")}</h3>
                <p>{t("banner.whatIsText")}</p>
              </section>

              <section>
                <h3>{t("banner.cookiesUsed")}</h3>
                <div className="cookie-modal-table">
                  <div className="cookie-modal-table-header">
                    <span>{t("banner.cookieCol")}</span>
                    <span>{t("banner.purposeCol")}</span>
                    <span>{t("banner.durationCol")}</span>
                  </div>
                  <div className="cookie-modal-table-row">
                    <span className="cookie-modal-table-name">{t("banner.posthog")}</span>
                    <span>{t("banner.posthogPurpose")}</span>
                    <span>{t("banner.posthogDuration")}</span>
                  </div>
                  <div className="cookie-modal-table-row">
                    <span className="cookie-modal-table-name">{t("banner.sessionRec")}</span>
                    <span>{t("banner.sessionRecPurpose")}</span>
                    <span>{t("banner.sessionRecDuration")}</span>
                  </div>
                  <div className="cookie-modal-table-row">
                    <span className="cookie-modal-table-name">{t("banner.consent")}</span>
                    <span>{t("banner.consentPurpose")}</span>
                    <span>{t("banner.consentDuration")}</span>
                  </div>
                </div>
              </section>

              <section>
                <h3>{t("banner.dataCollected")}</h3>
                <p>{t("banner.dataCollectedText")}</p>
              </section>

              <section>
                <h3>{t("banner.preferences")}</h3>
                <p>{t("banner.preferencesText")}</p>
              </section>

              <section>
                <h3>{t("banner.rights")}</h3>
                <p>{t("banner.rightsText")}</p>
              </section>
              <a href="/legal-center/privacy" className="cookie-explanation-link">
                {t("banner.legalLink")}
              </a>
              <p className="cookie-modal-updated">{t("banner.lastUpdated")}</p>
            </div>
            <div className="cookie-modal-footer">
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={() => setShowModal(false)}
              >
                {t("banner.understood")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
